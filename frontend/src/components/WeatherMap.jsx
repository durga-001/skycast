import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { useTheme } from "../context/ThemeContext";

const weatherMarker = new L.DivIcon({
  className: "weather-marker",
  html: "<div class='marker-dot'></div>",
  iconSize: [18, 18],
});

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 10);
  }, [latitude, longitude, map]);

  return null;
}

function WeatherMap({ latitude, longitude, city, className = "weather-map" }) {
  const { theme } = useTheme();

  const tileUrl =
    theme === "light"
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={10}
      className={className}
    >
      <RecenterMap latitude={latitude} longitude={longitude} />

      <TileLayer
        key={theme}
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url={tileUrl}
      />

      <Marker position={[latitude, longitude]} icon={weatherMarker}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default WeatherMap;
