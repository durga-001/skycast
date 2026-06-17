import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MapLegend from "./MapLegend";
import { useEffect } from "react";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiCloud,
} from "react-icons/wi";
import LocationInfo from "./LocationInfo";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 10);
  }, [latitude, longitude, map]);

  return null;
}

function LargeWeatherMap({ weather, selectedLayer }) {
  if (!weather) {
    return null;
  }
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const {
    latitude,
    longitude,
    city,
    country,
    temperature,
    humidity,
    wind_speed,
    description,
    icon,
  } = weather;
  const weatherLayers = {
    temp: "temp_new",
    wind: "wind_new",
    clouds: "clouds_new",
    pressure: "pressure_new",
  };
  const weatherIcon = L.icon({
    iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,

    iconSize: [60, 60],

    iconAnchor: [30, 60],

    popupAnchor: [0, -50],
  });
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[latitude, longitude]}
        zoom={7}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <RecenterMap latitude={latitude} longitude={longitude} />

        {/* Base Map */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Temperature Overlay */}
        <TileLayer
          opacity={1}
          url={`https://tile.openweathermap.org/map/${
            weatherLayers[selectedLayer]
          }/{z}/{x}/{y}.png?appid=${apiKey}`}
        />

        <Marker position={[latitude, longitude]} icon={weatherIcon}>
          <Popup>
            <div className="weather-popup">
              <h3 className="popup-city">
                <FaMapMarkerAlt />
                {city}, {country}
              </h3>

              <div className="popup-row">
                <WiThermometer />
                <span>{Math.round(temperature)}°C</span>
              </div>

              <div className="popup-row">
                <WiHumidity />
                <span>{humidity}%</span>
              </div>

              <div className="popup-row">
                <WiStrongWind />
                <span>{wind_speed} m/s</span>
              </div>

              <div className="popup-row">
                <WiCloud />
                <span>{description}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <MapLegend selectedLayer={selectedLayer} />

      <LocationInfo
        city={city}
        latitude={latitude}
        longitude={longitude}
        selectedLayer={selectedLayer}
      />
    </div>
  );
}

export default LargeWeatherMap;
