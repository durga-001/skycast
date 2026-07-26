import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import OceanLocationInfo from "./OceanLocationInfo";
import OceanMapLegend from "./OceanMapLegend";
import OceanColorOverlay from "./OceanColorOverlay";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 7);
    map.invalidateSize();
  }, [latitude, longitude, map]);

  return null;
}

function LargeOceanMap({ data, selectedLayer }) {
  const { theme } = useTheme();

  if (!data) return null;

  const { lat, lon, marine, weather, seaState } = data;

  const tileUrl =
    theme === "light"
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  return (
    <div className="map-wrapper map-container">
      <MapContainer
        center={[lat, lon]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <RecenterMap latitude={lat} longitude={lon} />

        <TileLayer
          key={theme}
          url={tileUrl}
          attribution="&copy; OpenStreetMap & CARTO"
        />

        {selectedLayer === "wind" && apiKey ? (
          <TileLayer
            opacity={0.7}
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          />
        ) : (
          <OceanColorOverlay selectedLayer={selectedLayer} opacity={0.6} />
        )}

        <Marker position={[lat, lon]} icon={markerIcon}>
          <Popup>
            <div className="weather-popup">
              <h3 className="popup-city">
                <FaMapMarkerAlt />
                {lat.toFixed(2)}, {lon.toFixed(2)}
              </h3>

              <div className="popup-row">
                <span>🌊</span>
                <span>
                  {marine?.current?.waveHeight != null
                    ? `${marine.current.waveHeight.toFixed(1)}m waves`
                    : "--"}
                </span>
              </div>

              <div className="popup-row">
                <WiHumidity />
                <span>
                  Sea State: {seaState?.level ?? "--"}/10 ({seaState?.label})
                </span>
              </div>

              <div className="popup-row">
                <WiStrongWind />
                <span>{weather?.wind_speed ?? "--"} m/s wind</span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <OceanLocationInfo lat={lat} lon={lon} selectedLayer={selectedLayer} />
      <OceanMapLegend selectedLayer={selectedLayer} />
    </div>
  );
}

export default LargeOceanMap;
