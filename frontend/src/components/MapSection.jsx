import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { FaCloud, FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function MapSection() {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/coords?lat=${lat}&lon=${lon}`,
      );

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (latlng) => {
    setPosition(latlng);
    fetchWeather(latlng.lat, latlng.lng);
  };

  return (
    <section className="map-section-container">
      <div className="map-header">
        <h2>Explore Weather Map</h2>
        <p>Click anywhere to get live weather details</p>
      </div>

      <div className="map-wrapper glass-card">
        <MapContainer
          center={[20.5937, 78.9629]} // India center
          zoom={4}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />

          <LocationSelector onSelect={handleSelect} />

          {position && <Marker position={position} icon={markerIcon} />}
        </MapContainer>
      </div>

      {weather && (
        <div className="map-weather-card glass-card">
          <div className="preview-header">
            <div>
              <span className="preview-label">LIVE WEATHER</span>
              <h3>{weather.city}</h3>
            </div>

            <span className="preview-badge">{weather.description}</span>
          </div>

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

              <h2 className="preview-value">{weather.description}</h2>

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
        </div>
      )}
    </section>
  );
}
