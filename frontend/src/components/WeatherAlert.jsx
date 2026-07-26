import { useState } from "react";
import {
  FiAlertTriangle,
  FiInfo,
  FiCloudRain,
  FiWind,
  FiSun,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const iconMap = {
  rain: <FiCloudRain />,
  storm: <FiAlertTriangle />,
  wind: <FiWind />,
  heat: <FiSun />,
  cold: <FiInfo />,
  humidity: <FiInfo />,
};

function WeatherAlert({ alerts = [] }) {
  const [open, setOpen] = useState(false);

  if (alerts.length === 0) return null;

  return (
    <div className="weather-alert-dropdown">
      <button
        type="button"
        className="weather-alert-header"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <h3>Today's Alerts ({alerts.length})</h3>

        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {open && (
        <div className="weather-alert-wrapper">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.message}
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
