export interface AntaresConfig {
  apiKey: string;
  deviceId: string;
  applicationId: string;
  baseUrl?: string;
}

export interface AntaresData {
  temperature: number;
  ph: number;
  tdsLevel: number;
  moisture?: number;
  ec?: number;
  humidity?: number;
  light?: number;
}

export class AntaresService {
  private config: AntaresConfig;

  constructor(config: AntaresConfig) {
    this.config = {
      ...config,
      baseUrl:
        config.baseUrl ||
        `https://platform.antares.id:8443/~/antares-cse/antares-id/${config.applicationId}/${config.deviceId}`,
    };
  }

  async fetchLatestData(): Promise<AntaresData | null> {
    try {
      const url = `${this.config.baseUrl}/la`;
      console.log("Fetching Antares data:", { url });

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-M2M-Origin": this.config.apiKey,
          "Content-Type": "application/json;ty=4",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Antares API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const content = data["m2m:cin"]?.con;

      if (!content) {
        throw new Error("Invalid response format from Antares API");
      }

      if (typeof content === "string") {
        try {
          const parsed = JSON.parse(content);
          return {
            temperature: parseFloat(parsed.temperature) || 0,
            ph: parseFloat(parsed.ph) || 0,
            tdsLevel: parseFloat(parsed.tdsLevel) || 0,
          };
        } catch {
          return null;
        }
      }

      return {
        temperature: parseFloat(content.temperature) || 0,
        ph: parseFloat(content.ph) || 0,
        tdsLevel: parseFloat(content.tdsLevel) || 0,
      };
    } catch (err) {
      console.error("Error fetching data from Antares:", err);
      throw err;
    }
  }
}

export const antaresService = new AntaresService({
  apiKey: process.env.ANTARES_API_KEY!,
  applicationId: process.env.ANTARES_APPLICATION_ID!,
  deviceId: process.env.ANTARES_DEVICE_ID!,
  baseUrl: process.env.ANTARES_BASE_URL,
});
