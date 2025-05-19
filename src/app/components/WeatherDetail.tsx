import React from "react";
import { WeatherData } from "@/app/types/common";
interface WeatherDetailProps {
  weatherData: WeatherData;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ weatherData }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-sm font-semibold">Feels like</p>
        <p className="text-sm">{weatherData.main.feels_like}°C</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-sm font-semibold">Humidity</p>
        <p className="text-sm">{weatherData.main.humidity}</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-sm font-semibold">Wind</p>
        <p className="text-sm">{weatherData.wind.speed} km/h</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-sm font-semibold">Visibility</p>
        <p className="text-sm">{weatherData.visibility} m</p>
      </div>
    </div>
  );
};

export default WeatherDetail;
