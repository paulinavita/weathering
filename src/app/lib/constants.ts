export const API_KEY = process.env.OPEN_WEATHER_API_KEY;
export const BASE_URL = "https://api.openweathermap.org";

const ERROR_STATUS_MAP = {
  CITY_NOT_FOUND: 400,
  INVALID_API_KEY: 401,
  MISSING_PARAM: 400,
} as const;

export { ERROR_STATUS_MAP };
