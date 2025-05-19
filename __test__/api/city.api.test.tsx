import { testApiHandler } from "next-test-api-route-handler";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as cityRouteAppHandler from "@/app/api/city/route";
import WeatherService from "@/app/services/weatherService";
import { ApiError } from "@/app/services/errorHandler";

vi.mock("@/app/services/weatherService", () => ({
  default: {
    getWeatherByCity: vi.fn(),
  },
}));

describe("API route, GET /api/city", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPEN_WEATHER_API_KEY = "test-api-key";
  });

  it("GET returns 200", async () => {
    const mockWeatherData = {
      main: {
        temp: 20,
        feels_like: 22,
        temp_min: 18,
        temp_max: 24,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
        },
      ],
    };

    vi.mocked(WeatherService.getWeatherByCity).mockResolvedValue(
      mockWeatherData
    );

    await testApiHandler({
      url: "/api/city?city=Bali",
      appHandler: cityRouteAppHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
        });
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toStrictEqual(mockWeatherData);
      },
    });
  });

  it("GET returns 400 when city is not found", async () => {
    vi.mocked(WeatherService.getWeatherByCity).mockRejectedValue(
      new ApiError("City not found", "CITY_NOT_FOUND")
    );

    await testApiHandler({
      url: "/api/city?city=xyz",
      appHandler: cityRouteAppHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
        });
        const json = await response.json();
        expect(response.status).toBe(400);
        expect(json).toStrictEqual({
          code: "CITY_NOT_FOUND",
          message: "City not found",
        });
      },
    });
  });
});
