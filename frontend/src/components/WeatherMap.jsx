import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
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
        height: "220px",
        width: "100%",
        borderRadius: "12px",
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

export default WeatherMap;
