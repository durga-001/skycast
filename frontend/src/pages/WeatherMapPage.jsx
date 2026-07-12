import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import LargeWeatherMap from "../components/LargeWeatherMap";
import WeatherAnalytics from "../components/WeatherAnalytics";
import { getWeather, getForecast } from "../services/weatherService";
import { useWeatherContext } from "../context/WeatherContext";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";
import { FiMaximize, FiMinimize } from "react-icons/fi";

import "../styles/WeatherMap.css";
import WeatherLayout from "../components/WeatherLayout";

function WeatherMapPage() {
  const location = useLocation();

  const passedWeather = location.state?.weather;

  const { currentCity } = useWeatherContext();

  const [weather, setWeather] = useState(passedWeather || null);

  const [selectedLayer, setSelectedLayer] = useState("temp");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (passedWeather) {
      setWeather(passedWeather);
      setLoading(false);
      return;
    }

    const loadWeather = async () => {
      try {
        const data = await getWeather(currentCity);
        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [passedWeather, currentCity]);
  
  useEffect(() => {
    if (!weather?.city) return;

    const fetchForecast = async () => {
      try {
        const data = await getForecast(weather.city);

        const formattedData = data.list.slice(0, 12).map((item) => ({
          time: new Date(item.dt_txt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
          }),
          temperature: item.main.temp,
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          wind: item.wind.speed,
        }));

        setForecastData(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchForecast();
  }, [weather]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!weather) {
    return <h2>No weather data available.</h2>;
  }
  return (
    <WeatherLayout weather={weather}>
      <div className="weather-map-page">
        {/* ================= TOP SECTION ================= */}

        <div className="top-section">
          {/* MAP */}

          <div className="map-area">
            <button
              className="fullscreen-btn"
              onClick={() => setIsFullscreen(true)}
            >
              <FiMaximize />
            </button>

            <LargeWeatherMap weather={weather} selectedLayer={selectedLayer} />
          </div>

          {/* SIDEBAR */}

          <div className="info-sidebar">
            <p className="layer-instruction">
              Click cards to change weather layer
            </p>

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

              <p>{Math.round(weather.temperature)}°C</p>
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

              <p>{weather.humidity}%</p>
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

              <p>{weather.pressure} hPa</p>
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

              <p>{weather.wind_speed} m/s</p>
            </div>

            <div className="weather-stat-card">
              <h3>Feels Like</h3>

              <p>{Math.round(weather.feels_like)}°C</p>
            </div>

            <div className="weather-stat-card">
              <h3>Visibility</h3>

              <p>{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>

            <div className="weather-stat-card">
              <h3>Active Map Layer</h3>

              <p>{selectedLayer.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* ================= CHARTS ================= */}

        <div className="charts-grid">
          <WeatherAnalytics forecastData={forecastData} />
        </div>
      </div>

      {/* ================= FULLSCREEN MAP ================= */}

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
    </WeatherLayout>
  );
}

export default WeatherMapPage;