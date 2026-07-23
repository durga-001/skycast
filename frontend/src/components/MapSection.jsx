import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

import {
  FaCloud,
  FaTemperatureHalf,
  FaWind,
  FaArrowRight,
} from "react-icons/fa6";

import markerIconPng from "leaflet/dist/images/marker-icon.png";

import { useTheme } from "../context/ThemeContext";
import { getWeatherByCoords } from "../services/weatherService";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    window.addEventListener("resize", map.invalidateSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", map.invalidateSize);
    };
  }, [map]);

  return null;
}

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return null;
}

export default function MapSection() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const data = await getWeatherByCoords(lat, lon);
      if (data) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error(err);
      setWeather(null);
    }
  };

  const handleSelect = (latlng) => {
    setPosition(latlng);
    fetchWeather(latlng.lat, latlng.lng);
  };

  const tileUrl =
    theme === "light"
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const fetchWeather = async (lat, lon) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/coords?lat=${lat}&lon=${lon}`,
      );

      const data = await res.json();

      console.log(data);

      setWeather(data);

      if (!data.city || data.city === "Unknown" || data.city === "Ocean") {
        setIsOcean(true);
      } else {
        setIsOcean(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = ({ lat, lng }) => {
    setPosition([lat, lng]);
    fetchWeather(lat, lng);
  };

  return (
    <section className="map-section-container">
      <div className="map-header">
        <h2>Explore Weather Map</h2>
        <p>Click anywhere to view live weather.</p>
      </div>

      <div className="home-map-wrapper glass-card">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={4}
          scrollWheelZoom={true}
        >
          <MapResizeFix />

          <TileLayer
            key={theme}
            url={tileUrl}
            attribution="© OpenStreetMap © CARTO"
          />

          <LocationSelector onSelect={handleSelect} />

          {position && (
            <Marker position={position} icon={markerIcon}>
              <Popup>
                {loading && <p>Loading...</p>}

                {!loading && weather && (
                  <>
                    <h3>{isOcean ? "Ocean Location" : weather.city}</h3>

                    {!isOcean ? (
                      <>
                        <p>🌡 {Math.round(weather.temperature)}°C</p>

                        <p>{weather.description}</p>

                        <button
                          className="explore-btn"
                          onClick={() =>
                            navigate(
                              `/dashboard?city=${encodeURIComponent(weather.city)}`,
                            )
                          }
                        >
                          Explore More
                          <FaArrowRight />
                        </button>
                      </>
                    ) : (
                      <>
                        <p>Latitude :{position[0].toFixed(2)}</p>

                        <p>Longitude :{position[1].toFixed(2)}</p>

                        <button className="map-dashboard-btn" disabled>
                          Ocean Dashboard
                          <br />
                          Coming Soon
                        </button>
                      </>
                    )}
                  </>
                )}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {weather && !loading && (
        <div className="map-weather-card glass-card">
          <div className="preview-header">
            <div>
              <span className="preview-label">LIVE WEATHER</span>

              <h3>{isOcean ? "Ocean" : weather.city}</h3>
            </div>

            {!isOcean && (
              <span className="preview-badge">{weather.description}</span>
            )}
          </div>

          {!isOcean ? (
            <>
              <div className="preview-grid">
                <div className="preview-stat">
                  <div className="preview-icon">
                    <FaTemperatureHalf />
                  </div>

                  <h2>{Math.round(weather.temperature)}°C</h2>

                  <p>Temperature</p>
                </div>

                <div className="preview-stat">
                  <div className="preview-icon">
                    <FaCloud />
                  </div>

                  <h2>{weather.description}</h2>

                  <p>Condition</p>
                </div>

                <div className="preview-stat">
                  <div className="preview-icon">
                    <FaWind />
                  </div>

                  <h2>{weather.wind_speed} m/s</h2>

                  <p>Wind Speed</p>
                </div>
              </div>

              <h2>{Math.round(weather.temperature ?? 0)}°C</h2>

              <p>
                <strong>Longitude:</strong> {position[1].toFixed(2)}
              </p>

            <div className="preview-stat">
              <div className="preview-icon">
                <FaCloud />
              </div>

              <h2 className="preview-value">{weather.description || "--"}</h2>

              <p>Condition</p>
            </div>

            <div className="preview-stat">
              <div className="preview-icon">
                <FaWind />
              </div>

              <h2>{weather.wind_speed ?? "--"} m/s</h2>

              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
