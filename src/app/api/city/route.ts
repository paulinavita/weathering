import WeatherService from "@/app/services/weatherService";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/services/errorHandler";
import { WeatherData } from "@/app/types/common";
import { sanitise } from "@/app/lib/common";

const ERROR_STATUS_MAP = {
  CITY_NOT_FOUND: 400,
  INVALID_API_KEY: 401,
  MISSING_PARAM: 400,
  INVALID_CITY: 400,
} as const;

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const city = searchParams.get("city");
    const appid = process.env.OPEN_WEATHER_API_KEY;

    if (!appid) {
      return NextResponse.json(
        { code: "INVALID_API_KEY", message: "Invalid API key" },
        { status: ERROR_STATUS_MAP.INVALID_API_KEY }
      );
    }

    const sanitizedCity = sanitise(city || "");
    const weatherData: WeatherData = await WeatherService.getWeatherByCity(
      sanitizedCity
    );
    return NextResponse.json(weatherData);
  } catch (error) {
    if (error instanceof ApiError) {
      const statusCode =
        ERROR_STATUS_MAP[error.code as keyof typeof ERROR_STATUS_MAP] || 500;
      return NextResponse.json(
        { code: error.code, message: error.message },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { code: "UNKNOWN_ERROR", message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
