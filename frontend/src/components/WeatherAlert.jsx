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
  if (!alerts?.length) return null;

  return (
    <div className="weather-alert-wrapper">
      <h3 className="weather-alert-title">Today's Alerts</h3>

      {alerts.slice(0, 3).map((alert, index) => (
        <div
          key={index}
          className={`weather-alert ${
            alert.severity === "danger" ? "danger" : ""
          }`}
        >
          <div className="alert-icon">{iconMap[alert.type] || <FiInfo />}</div>

          <div className="alert-content">
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherAlert;
