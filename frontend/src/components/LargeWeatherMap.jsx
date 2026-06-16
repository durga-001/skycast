import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 10);
  }, [latitude, longitude, map]);

  return null;
}

function LargeWeatherMap({ latitude, longitude, city }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={7}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <RecenterMap latitude={latitude} longitude={longitude} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[latitude, longitude]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default LargeWeatherMap;
