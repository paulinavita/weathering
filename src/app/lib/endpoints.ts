// import { Coord } from "@/types";
// todo: update any to the correct type
import { Coordinate } from "../types/common";
import { API_KEY, BASE_URL } from "./constants";

const ENDPOINTS = {
  forecastByCoords: ({ lat, lon }: Coordinate) =>
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  currentWeatherByCity: ({ city }: { city: string }) =>
    `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
};

export default ENDPOINTS;
