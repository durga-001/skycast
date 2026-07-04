import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
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
function WeatherMap({ latitude, longitude, city }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={10}
      style={{
        height: "240px",
        width: "100%",
      }}
    >
      <RecenterMap latitude={latitude} longitude={longitude} />

      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <Marker position={[latitude, longitude]} icon={weatherMarker}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default WeatherMap;
