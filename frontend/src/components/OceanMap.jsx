import {
  MapContainer,
  TileLayer,
  Marker,
  Rectangle,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { useTheme } from "../context/ThemeContext";

const oceanMarker = new L.DivIcon({
  className: "weather-marker",
  html: "<div class='marker-dot'></div>",
  iconSize: [18, 18],
});

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 7);
    map.invalidateSize();
  }, [latitude, longitude, map]);

  return null;
}

function OceanMap({ latitude, longitude, bounds, className = "weather-map" }) {
  const { theme } = useTheme();

  const tileUrl =
    theme === "light"
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer center={[latitude, longitude]} zoom={7} className={className}>
      <RecenterMap latitude={latitude} longitude={longitude} />
      <TileLayer key={theme} attribution="&copy; CARTO" url={tileUrl} />
      <Marker position={[latitude, longitude]} icon={oceanMarker}>
        <Popup>
          {latitude.toFixed(2)}, {longitude.toFixed(2)}
        </Popup>
      </Marker>
      {bounds && (
        <Rectangle
          bounds={[
            [bounds.south, bounds.west],
            [bounds.north, bounds.east],
          ]}
          pathOptions={{ color: "#0ea5e9", weight: 1 }}
        />
      )}
    </MapContainer>
  );
}

export default OceanMap;
