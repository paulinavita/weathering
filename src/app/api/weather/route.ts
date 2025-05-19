import WeatherService from "@/app/services/weatherService";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/services/errorHandler";
import { ERROR_STATUS_MAP } from "@/app/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lon } = body;
    const appid = process.env.OPEN_WEATHER_API_KEY;

    if (!appid) {
      return NextResponse.json(
        { code: "INVALID_API_KEY", message: "Invalid API key" },
        { status: 401 }
      );
    }

    if (!lat || !lon) {
      return NextResponse.json(
        { code: "MISSING_PARAM", message: "Missing parameters" },
        { status: 400 }
      );
    }

    const weatherData = await WeatherService.getForecastByCoords(lat, lon);
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
