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
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeatherContext must be used within WeatherProvider");
  }

  return context;
}
