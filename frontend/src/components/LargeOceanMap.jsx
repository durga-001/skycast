import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  Circle,
  useMap,
} from "react-leaflet";
import { useEffect, useMemo } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import OceanLocationInfo from "./OceanLocationInfo";
import OceanMapLegend from "./OceanMapLegend";
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

function getLayerValue(data, selectedLayer) {
  if (selectedLayer === "wave") return data.marine?.current?.waveHeight;
  if (selectedLayer === "period") return data.marine?.current?.wavePeriod;
  if (selectedLayer === "swell") return data.marine?.current?.swellHeight;
  if (selectedLayer === "wind") return data.weather?.wind_speed;
  return null;
}

function getLayerColor(selectedLayer, value) {
  if (value == null) return "#0ea5e9";

  if (selectedLayer === "wave") {
    if (value < 1.25) return "#22c55e";
    if (value < 2.5) return "#facc15";
    if (value < 4) return "#f97316";
    if (value < 6) return "#ef4444";
    return "#7f1d1d";
  }

  if (selectedLayer === "wind") {
    if (value < 4) return "#22c55e";
    if (value < 8) return "#facc15";
    if (value < 12) return "#f97316";
    return "#ef4444";
  }

  if (selectedLayer === "period") {
    if (value < 5) return "#22c55e";
    if (value < 9) return "#facc15";
    if (value < 12) return "#f97316";
    return "#ef4444";
  }

  if (selectedLayer === "swell") {
    if (value < 1) return "#22c55e";
    if (value < 2) return "#facc15";
    if (value < 3) return "#f97316";
    return "#ef4444";
  }

  return "#0ea5e9";
}

function noise(lat, lon, seed) {
  const n = Math.sin(lat * 12.9898 + lon * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

const maxRanges = { wave: 8, wind: 16, period: 14, swell: 4 };

function generateGridPoints() {
  const points = [];

  for (let lat = -60; lat <= 60; lat += 25) {
    for (let lon = -180; lon <= 160; lon += 25) {
      points.push({ lat, lon });
    }
  }

  return points;
}

function LargeOceanMap({ data, selectedLayer }) {
  const { theme } = useTheme();

  const gridPoints = useMemo(() => generateGridPoints(), []);

  if (!data) return null;

  const { lat, lon, marine, weather, seaState, area } = data;

  const tileUrl =
    theme === "light"
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const value = getLayerValue(data, selectedLayer);
  const overlayColor = getLayerColor(selectedLayer, value);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const maxRange = maxRanges[selectedLayer] || 8;

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
          gridPoints.map((point) => {
            const synthetic =
              noise(point.lat, point.lon, selectedLayer.length) * maxRange;
            const color = getLayerColor(selectedLayer, synthetic);

            return (
              <Circle
                key={`${point.lat}-${point.lon}`}
                center={[point.lat, point.lon]}
                radius={1800000}
                pathOptions={{
                  stroke: false,
                  fillColor: color,
                  fillOpacity: 0.35,
                }}
              />
            );
          })
        )}

        <Circle
          center={[lat, lon]}
          radius={250000}
          pathOptions={{
            stroke: false,
            fillColor: overlayColor,
            fillOpacity: 0.55,
          }}
        />

        {area?.bounds && (
          <Rectangle
            bounds={[
              [area.bounds.south, area.bounds.west],
              [area.bounds.north, area.bounds.east],
            ]}
            pathOptions={{ color: overlayColor, weight: 2, fillOpacity: 0 }}
          />
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
