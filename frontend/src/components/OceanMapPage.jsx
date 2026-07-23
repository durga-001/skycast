import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import LargeOceanMap from "../components/LargeOceanMap";
import OceanAnalytics from "../components/OceanAnalytics";
import { getOceanWeather } from "../services/oceanService";
import { WiStrongWind } from "react-icons/wi";
import { FiMaximize, FiMinimize } from "react-icons/fi";

import "../styles/WeatherMap.css";
import WeatherLayout from "../components/WeatherLayout";

function OceanMapPage() {
  const location = useLocation();
  const passedData = location.state?.data;

  const [data, setData] = useState(passedData || null);
  const [selectedLayer, setSelectedLayer] = useState("wave");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(!passedData);

  useEffect(() => {
    if (passedData) {
      setData(passedData);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");

    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    const loadOcean = async () => {
      try {
        const result = await getOceanWeather(lat, lon);
        setData(result);
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadOcean();
  }, [passedData, location.search]);

  useEffect(() => {
    if (!data?.marine?.hourly) {
      setForecastData([]);
      return;
    }

    const formattedData = data.marine.hourly.slice(0, 12).map((item) => ({
      time: item.time
        ? new Date(item.time).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
          })
        : "",
      waveHeight: item.waveHeight,
      wavePeriod: item.wavePeriod,
      swellHeight: item.swellHeight,
      waveDirection: item.waveDirection,
    }));

    setForecastData(formattedData);
  }, [data]);

  if (loading) {
    return (
      <WeatherLayout weather={null}>
        <div className="weather-map-page">
          <h2>Loading...</h2>
        </div>
      </WeatherLayout>
    );
  }

  if (!data) {
    return (
      <WeatherLayout weather={null}>
        <div className="weather-map-page">
          <h2>No ocean data available.</h2>
        </div>
      </WeatherLayout>
    );
  }

  const { weather, marine, seaState } = data;

  return (
    <WeatherLayout weather={weather}>
      <div className="weather-map-page">
        <div className="top-section">
          <div className="map-area">
            <button
              className="fullscreen-btn"
              onClick={() => setIsFullscreen(true)}
              aria-label="Open fullscreen map"
            >
              <FiMaximize />
            </button>

            <LargeOceanMap data={data} selectedLayer={selectedLayer} />
          </div>

          <div className="info-sidebar">
            <p className="layer-instruction">Click cards to change map layer</p>

            <div
              className={`weather-stat-card ${selectedLayer === "wave" ? "active-layer" : ""}`}
              onClick={() => setSelectedLayer("wave")}
            >
              <h3>🌊 Wave Height</h3>
              <p>
                {marine?.current?.waveHeight != null
                  ? `${marine.current.waveHeight.toFixed(1)} m`
                  : "--"}
              </p>
            </div>

            <div
              className={`weather-stat-card ${selectedLayer === "period" ? "active-layer" : ""}`}
              onClick={() => setSelectedLayer("period")}
            >
              <h3>Wave Period</h3>
              <p>
                {marine?.current?.wavePeriod != null
                  ? `${marine.current.wavePeriod.toFixed(1)} s`
                  : "--"}
              </p>
            </div>

            <div
              className={`weather-stat-card ${selectedLayer === "swell" ? "active-layer" : ""}`}
              onClick={() => setSelectedLayer("swell")}
            >
              <h3>Swell Height</h3>
              <p>
                {marine?.current?.swellHeight != null
                  ? `${marine.current.swellHeight.toFixed(1)} m`
                  : "--"}
              </p>
            </div>

            <div
              className={`weather-stat-card ${selectedLayer === "wind" ? "active-layer" : ""}`}
              onClick={() => setSelectedLayer("wind")}
            >
              <h3>
                <WiStrongWind /> Wind Speed
              </h3>
              <p>{weather?.wind_speed ?? "--"} m/s</p>
            </div>

            <div className="weather-stat-card">
              <h3>Sea State</h3>
              <p>
                {seaState?.level ?? "--"}/10 ({seaState?.label})
              </p>
            </div>

            <div className="weather-stat-card">
              <h3>Active Map Layer</h3>
              <p>{selectedLayer.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <OceanAnalytics forecastData={forecastData} />
        </div>
      </div>

      {isFullscreen && (
        <div className="fullscreen-map-overlay">
          <button
            className="close-fullscreen-btn"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen map"
          >
            <FiMinimize />
          </button>

          <LargeOceanMap data={data} selectedLayer={selectedLayer} />
        </div>
      )}
    </WeatherLayout>
  );
}

export default OceanMapPage;
