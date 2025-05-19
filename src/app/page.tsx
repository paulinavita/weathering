"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/app/components/SearchBar";
import fetcher from "@/app/lib/fetch";
import { WeatherData, ForecastResponse } from "@/app/types/common";

import { Skeleton } from "@/components/ui/skeleton";
import WeatherBaseInfo from "@/app/components/WeatherBaseInfo";
import ForecastData from "@/app/components/ForecastData";
import WeatherDetail from "@/app/components/WeatherDetail";

import { AlertCircle, SunMoonIcon } from "lucide-react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const city = searchParams.get("city");
  const {
    data: weatherData,
    error: weatherDataByCityError,
    isLoading: weatherDataLoading,
  } = useSWR<WeatherData>(city ? `/api/city?city=${city}` : null, fetcher);

  const {
    data: forecastData,
    error: forecastDataError,
    isLoading: forecastDataLoading,
  } = useSWR<ForecastResponse>(
    weatherData?.coord.lat ? `/api/weather` : null,
    (url: string) =>
      fetcher<ForecastResponse>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: weatherData?.coord.lat,
          lon: weatherData?.coord.lon,
        }),
      })
  );

  useEffect(() => {
    if (!city) {
      router.replace("/?city=Bali");
    }
  }, [city, router]);

  const handleInputSearch = (city: string) => {
    router.replace(`/?city=${city}`);
  };

  const renderForecastSkeleton = () => {
    if (forecastDataError || weatherDataByCityError) {
      return (
        <div className="w-full h-[18vh] rounded-lg bg-gray-200">
          <div className="text-grey-500 flex text-sm items-center h-full justify-center gap-2 px-8">
            <AlertCircle className="W-8 h-8" />
            {forecastDataError?.message || weatherDataByCityError?.message}
          </div>
        </div>
      );
    }
    return (
      <div className="w-full py-4 flex flex-col gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            data-testid="skeleton"
            className="w-full h-20 bg-gray-200 rounded-lg"
          />
        ))}
      </div>
    );
  };

  const renderWeatherSkeleton = () => {
    if (weatherDataByCityError) {
      return (
        <div className="w-full h-[34vh] rounded-lg bg-gray-200">
          <div className="text-grey-500 flex text-sm items-center h-full justify-center gap-2 px-8">
            <AlertCircle className="W-8 h-8" />
            {weatherDataByCityError.message}
          </div>
        </div>
      );
    }
    return (
      <Skeleton
        data-testid="skeleton"
        className="w-full h-[34vh] rounded-lg bg-gray-200"
      />
    );
  };
  return (
    <main className="min-h-[calc(100dvh)] flex flex-col items-center justify-start">
      <div className="lg:w-[60%] md:w-[80%] w-[90%] px-4 py-4 flex flex-col items-start gap-4 border border-gray-300 my-4 rounded-lg">
        <div className="text-xl font-bold py-4 flex items-center gap-2">
          <SunMoonIcon className="w-6 h-6" />
          <span>Get the weather in your city</span>
        </div>
        <div className="w-full flex items-center justify-center space-x-4">
          <SearchBar
            searchValue={city || ""}
            onSearch={handleInputSearch}
            isLoading={weatherDataLoading || forecastDataLoading}
          />
        </div>
        <div className="text-md font-semibold mt-4">Today&apos;s weather</div>
        <div className="w-full flex flex-col items-center justify-center bg-stone-200 rounded-lg ">
          {weatherDataLoading || !weatherData ? (
            renderWeatherSkeleton()
          ) : (
            <div className="w-full p-4">
              <WeatherBaseInfo weatherData={weatherData} />
              <WeatherDetail weatherData={weatherData} />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="text-md font-semibold my-4">
            Current week forecast
          </div>

          {forecastDataLoading || !forecastData ? (
            renderForecastSkeleton()
          ) : (
            <ForecastData forecastResponse={forecastData} />
          )}
        </div>
      </div>
    </main>
  );
}
