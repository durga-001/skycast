import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [currentCity, setCurrentCity] = useState("Delhi");

  return (
    <WeatherContext.Provider
      value={{
        currentCity,
        setCurrentCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  return useContext(WeatherContext);
}
