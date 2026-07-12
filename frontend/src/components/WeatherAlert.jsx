import { useState } from "react";
import {
  FiAlertTriangle,
  FiInfo,
  FiCloudRain,
  FiWind,
  FiSun,
} from "react-icons/fi";

const iconMap = {
  rain: <FiCloudRain />,
  storm: <FiAlertTriangle />,
  wind: <FiWind />,
  heat: <FiSun />,
  cold: <FiInfo />,
  humidity: <FiInfo />,
};

function WeatherAlert({ alerts }) {
  const [open, setOpen] = useState(false);

  if (!alerts?.length) return null;

  return (
    <div className="weather-alert-dropdown">
      <div className="weather-alert-header" onClick={() => setOpen(!open)}>
        <h3>⚠ Today's Alerts ({alerts.length})</h3>

        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="weather-alert-wrapper">
          {alerts.slice(0, 3).map((alert, index) => (
            <div
              key={index}
              className={`weather-alert ${
                alert.severity === "danger" ? "danger" : ""
              }`}
            >
              <div className="alert-icon">
                {iconMap[alert.type] || <FiInfo />}
              </div>

              <div className="alert-content">
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherAlert;
