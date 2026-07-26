import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export default function OutfitHero({ weather }) {
  if (!weather) return null;

  const weatherType = weather?.weather?.toLowerCase() || "";

  const getIcon = () => {
    switch (weatherType) {
      case "clear":
        return <WiDaySunny size={90} />;

      case "clouds":
        return <WiCloud size={90} />;

      case "rain":
      case "drizzle":
        return <WiRain size={90} />;

      case "snow":
        return <WiSnow size={90} />;

      case "thunderstorm":
        return <WiThunderstorm size={90} />;

      default:
        return <WiDaySunny size={90} />;
    }
  };

  return (
    <section className="outfit-hero glass-card">
      <div className="outfit-hero-content">
        <div className="outfit-hero-left">
          <span className="outfit-badge">Smart Outfit Assistant</span>

          <h1 className="outfit-title">
            Dress Smarter.
            <br />
            Every Weather.
          </h1>

          <p className="outfit-subtitle">
            Personalized outfit recommendations generated from the current
            weather conditions.
          </p>

          <div className="outfit-weather-info">
            <span>{weather.city || "Unknown Location"}</span>

            <span>•</span>

            <span>
              {weather.temperature !== undefined && weather.temperature !== null
                ? `${Math.round(weather.temperature)}°C`
                : "--°C"}
            </span>

            <span>•</span>

            <span>{weather.weather || "Unknown"}</span>
          </div>
        </div>

        <div className="outfit-hero-right">
          <div className="outfit-weather-icon">{getIcon()}</div>
        </div>
      </div>
    </section>
  );
}
