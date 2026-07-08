import "../styles/AQICard.css";

function AQICard({ aqi }) {
  if (!aqi) return null;

  const getAQIData = (value) => {
    if (value <= 50)
      return {
        label: "Good",
        color: "#22c55e",
      };

    if (value <= 100)
      return {
        label: "Moderate",
        color: "#facc15",
      };

    if (value <= 150)
      return {
        label: "Unhealthy",
        color: "#f97316",
      };

    if (value <= 200)
      return {
        label: "Very Unhealthy",
        color: "#ef4444",
      };

    return {
      label: "Hazardous",
      color: "#991b1b",
    };
  };

  const data = getAQIData(aqi);

  const degree = (aqi / 300) * 180;

  return (
    <div className="aqi-card glass-card">
      <div className="section-header">
        <h2 className="section-title">Air Quality Index</h2>
      </div>

      <div className="aqi-content">
        <div
          className="aqi-gauge"
          style={{
            "--degree": `${degree}deg`,
            "--aqi-color": data.color,
          }}
        >
          <div className="aqi-needle"></div>

          <div className="aqi-center">
            <h1>{aqi}</h1>
            <span>{data.label}</span>
          </div>
        </div>

        <div className="aqi-info">
          <h3
            style={{
              color: data.color,
            }}
          >
            {data.label}
          </h3>

          <p>
            {aqi <= 100
              ? "Air quality is safe for most people."
              : "Sensitive groups should limit prolonged outdoor activities."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AQICard;
