import { useLocation } from "react-router-dom";
import LargeWeatherMap from "../src/components/LargeWeatherMap";
function WeatherMapPage() {
  const { state } = useLocation();

  const weather = state?.weather;

  return (
    <div className="weather-map-page">
      <div className="map-area">
        <LargeWeatherMap
          latitude={weather.latitude}
          longitude={weather.longitude}
          city={weather.city}
        />
      </div>

      <div className="info-sidebar">
        <div className="weather-stat-card">
          <h3>Temperature</h3>
          <p>{Math.round(weather?.temperature)}°C</p>
        </div>

        <div className="weather-stat-card">
          <h3>Feels Like</h3>
          <p>{Math.round(weather?.feels_like)}°C</p>
        </div>

        <div className="weather-stat-card">
          <h3>Humidity</h3>
          <p>{weather?.humidity}%</p>
        </div>

        <div className="weather-stat-card">
          <h3>Pressure</h3>
          <p>{weather?.pressure} hPa</p>
        </div>

        <div className="weather-stat-card">
          <h3>Visibility</h3>
          <p>{weather?.visibility / 1000} km</p>
        </div>

        <div className="weather-stat-card">
          <h3>Wind Speed</h3>
          <p>{weather?.wind_speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherMapPage;
