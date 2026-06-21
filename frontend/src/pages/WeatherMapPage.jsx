import { useLocation } from "react-router-dom";
import LargeWeatherMap from "../components/LargeWeatherMap";
import { useState } from "react";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";
import { FiMaximize, FiMinimize } from "react-icons/fi";

function WeatherMapPage() {
  const { state } = useLocation();
  const [selectedLayer, setSelectedLayer] = useState("temp");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const weather = state?.weather;

  if (!weather) {
    return <h2>No weather data available.</h2>;
  }

  return (
    <div className="weather-map-page">
      <div className="map-area">
        <button
          className="fullscreen-btn"
          onClick={() => setIsFullscreen(true)}
        >
          <FiMaximize />
        </button>
        <LargeWeatherMap weather={weather} selectedLayer={selectedLayer} />
      </div>

      {isFullscreen && (
        <div className="fullscreen-map-overlay">
          <button
            className="close-fullscreen-btn"
            onClick={() => setIsFullscreen(false)}
          >
            <FiMinimize />
          </button>

          <LargeWeatherMap weather={weather} selectedLayer={selectedLayer} />
        </div>
      )}

      <div className="info-sidebar">
        <p className="layer-instruction">Click cards to change weather layer</p>
        <div
          className={`weather-stat-card ${
            selectedLayer === "temp" ? "active-layer" : ""
          }`}
          onClick={() => setSelectedLayer("temp")}
        >
          <h3>
            <WiThermometer />
            Temperature
          </h3>
          <p>{Math.round(weather?.temperature)}°C</p>
        </div>

        <div
          className={`weather-stat-card ${
            selectedLayer === "clouds" ? "active-layer" : ""
          }`}
          onClick={() => setSelectedLayer("clouds")}
        >
          <h3>
            <WiHumidity />
            Humidity
          </h3>
          <p>{weather?.humidity}%</p>
        </div>

        <div
          className={`weather-stat-card ${
            selectedLayer === "pressure" ? "active-layer" : ""
          }`}
          onClick={() => setSelectedLayer("pressure")}
        >
          <h3>
            <WiBarometer />
            Pressure
          </h3>
          <p>{weather?.pressure} hPa</p>
        </div>

        <div
          className={`weather-stat-card ${
            selectedLayer === "wind" ? "active-layer" : ""
          }`}
          onClick={() => setSelectedLayer("wind")}
        >
          <h3>
            <WiStrongWind />
            Wind Speed
          </h3>
          <p>{weather?.wind_speed} m/s</p>
        </div>

        <div className="weather-stat-card">
          <h3>Feels Like</h3>
          <p>{Math.round(weather?.feels_like)}°C</p>
        </div>

        <div className="weather-stat-card">
          <h3>Visibility</h3>
          <p>{weather?.visibility / 1000} km</p>
        </div>

        <div className="weather-stat-card">
          <h3>Active Map Layer</h3>
          <p>{selectedLayer.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherMapPage;
