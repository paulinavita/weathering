"use client";
import React, { useMemo } from "react";
import { ForecastResponse } from "@/app/types/common";
import Image from "next/image";
import { formatDate } from "@/app/lib/common";

interface ForecastDataProps {
  forecastResponse: ForecastResponse;
}

interface ForecastDisplaySummary {
  min: number;
  max: number;
  day: string;
  date: number;
  year: number;
  desc: string;
  icon: string;
}

interface AbsoluteMinMaxPerDay {
  min: number;
  max: number;
}

const ForecastData: React.FC<ForecastDataProps> = ({ forecastResponse }) => {
  const groupByDay = useMemo(() => {
    const grouped: Record<string, ForecastDisplaySummary[]> = {};
    forecastResponse.list.forEach((forecast) => {
      const date = formatDate(forecast.dt);
      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push({
        min: forecast.main.temp_min,
        max: forecast.main.temp_max,
        day: new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: new Date(forecast.dt * 1000).getDate(),
        year: new Date(forecast.dt * 1000).getFullYear(),
        desc: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      });
    });
    return grouped;
  }, [forecastResponse]);

  const absoluteMinMaxPerDay = useMemo(() => {
    const minMax: Record<string, AbsoluteMinMaxPerDay> = {};
    Object.entries(groupByDay).forEach(([date, forecasts]) => {
      let absMin = forecasts[0].min;
      let absMax = forecasts[0].max;
      forecasts.forEach((forecast) => {
        if (forecast.min < absMin) {
          absMin = forecast.min;
        }
        if (forecast.max > absMax) {
          absMax = forecast.max;
        }
      });
      minMax[date] = { min: Math.round(absMin), max: Math.round(absMax) };
    });
    return minMax;
  }, [groupByDay]);

  const renderDay = (
    date: string,
    index: number,
    forecasts: ForecastDisplaySummary[]
  ) => {
    let res = "";

    if (index === 0) {
      res = "Today";
    } else {
      res = date;
    }
    return (
      <div className="w-2/10">
        <div className="text-sm text-gray-400">{res}</div>
        <div className="text-xs">
          {forecasts[0].desc.charAt(0).toUpperCase() +
            forecasts[0].desc.slice(1)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 py-4">
        {Object.entries(groupByDay).map(([date, forecasts], index) => (
          <div
            key={date}
            className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-gray-200 bg-gray-50 "
          >
            {renderDay(forecasts[0].day, index, forecasts)}
            <div className="w-2/10">
              <Image
                src={`http://openweathermap.org/img/wn/${forecasts[0].icon}@2x.png`}
                alt={forecasts[0].desc}
                width={50}
                height={50}
              />
            </div>

            <div className="flex gap-2">
              <span className="text-sm">
                <strong>L:</strong> {absoluteMinMaxPerDay[date].min}°
              </span>
              <span className="text-sm">
                <strong>H:</strong> {absoluteMinMaxPerDay[date].max}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastData;
