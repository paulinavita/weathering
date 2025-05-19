import ENDPOINTS from "@/app/lib/endpoints";
import { Forecast } from "@/app/types/common";
import { ApiError } from "@/app/services/errorHandler";

class WeatherService {
  static async getForecastByCoords(
    lat: number,
    lon: number
  ): Promise<Forecast> {
    const url = ENDPOINTS.forecastByCoords({ lat, lon });

    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new ApiError(
          `Weather service error. Please try again later.`,
          "API_ERROR"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }

  static async getWeatherByCity(city: string) {
    const url = ENDPOINTS.currentWeatherByCity({ city });
    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new ApiError(
          `City ${city} not found. Please check the spelling and try again.`,
          "CITY_NOT_FOUND"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
}

export default WeatherService;
