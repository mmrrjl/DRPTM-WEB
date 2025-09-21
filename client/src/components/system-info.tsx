
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type { SystemStatus } from "@shared/schema";

interface SystemInfoProps {
  systemStatus?: SystemStatus;
}

export default function SystemInfo({ systemStatus }: SystemInfoProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          System Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Last Update</span>
            <span className="text-sm text-slate-900">
              {systemStatus?.lastUpdate
                ? formatDistanceToNow(new Date(systemStatus.lastUpdate), {
                    addSuffix: true,
                  })
                : "Unknown"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Data Points</span>
            <span className="text-sm text-slate-900">
              {systemStatus?.dataPoints?.toLocaleString() ?? "0"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">CPU Usage</span>
            <span className="text-sm text-slate-900">
              {systemStatus?.cpuUsage ?? 0}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Memory Usage</span>
            <span className="text-sm text-slate-900">
              {systemStatus?.memoryUsage ?? 0}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Storage Usage</span>
            <span className="text-sm text-slate-900">
              {systemStatus?.storageUsage ?? 0}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Uptime</span>
            <span className="text-sm text-slate-900">
              {systemStatus?.uptime ?? "Unknown"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
