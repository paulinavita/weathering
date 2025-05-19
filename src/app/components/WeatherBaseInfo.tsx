import React from "react";
import { WeatherData } from "@/app/types/common";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface WeatherBaseInfoProps {
  weatherData: WeatherData;
}
const WeatherBaseInfo: React.FC<WeatherBaseInfoProps> = ({ weatherData }) => {
  const BaseInfoSkeleton = () => {
    return (
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
      </div>
    );
  };

  const formatTitle = (title: string) => {
    return title?.charAt(0).toUpperCase() + title?.slice(1);
  };

  if (!weatherData) {
    return <BaseInfoSkeleton />;
  } else
    return (
      <div className="w-full  flex flex-col  justify-center items-center ">
        <p className="text-2xl font-bold">{weatherData.name}</p>
        <p className="text-sm font-semibold">
          {formatTitle(weatherData?.weather?.[0]?.description)}
        </p>
        {weatherData.weather?.[0].icon && (
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
            alt="Weather icon"
            width={86}
            height={86}
          />
        )}
        <p className="text-2xl font-bold">{weatherData.main.temp}°C</p>
        <p className="text-sm">
          H: {weatherData.main.temp_max}°C L: {weatherData.main.temp_min}°C
        </p>
      </div>
    );
};

export default WeatherBaseInfo;
