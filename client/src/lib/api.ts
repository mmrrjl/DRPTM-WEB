import { apiRequest } from "./queryClient";

export async function exportData(format: 'json' | 'csv' = 'json', startTime?: string, endTime?: string) {
  const params = new URLSearchParams();
  params.append('format', format);
  if (startTime) params.append('startTime', startTime);
  if (endTime) params.append('endTime', endTime);

  const response = await apiRequest("GET", `/api/export-data?${params}`);

  if (format === 'csv') {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sensor-data.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sensor-data.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export async function updateAlertSettings(settings: {
  temperatureAlerts: boolean;
  phAlerts: boolean;
  waterLevelAlerts: boolean;
}): Promise<{
  temperatureAlerts: boolean;
  phAlerts: boolean;
  waterLevelAlerts: boolean;
}> {
  const response = await fetch("/api/alert-settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error("Failed to update alert settings");
  }

  return response.json();
}

export async function syncAntaresData(): Promise<{ success: boolean; message: string; latestReading: any; connectionStatus: string }> {
  const response = await fetch("/api/sync-antares", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sync data from Antares");
  }

  return response.json();
}