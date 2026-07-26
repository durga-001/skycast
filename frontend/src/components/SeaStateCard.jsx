function SeaStateCard({ seaState }) {
  if (!seaState) return null;

  const degree = Math.min((seaState.level / 10) * 180, 180);

  return (
    <div className="aqi-card glass-card">
      <div className="section-header">
        <h2 className="section-title">Sea State</h2>
      </div>

      <div className="aqi-content">
        <div
          className="aqi-gauge"
          style={{ "--degree": `${degree}deg`, "--aqi-color": seaState.color }}
        >
          <div className="aqi-needle"></div>

          <div className="aqi-center">
            <h1>{seaState.level}</h1>
            <span>{seaState.label}</span>
          </div>
        </div>

        <div className="aqi-info">
          <h3 style={{ color: seaState.color }}>
            {seaState.label} ({seaState.level}/10)
          </h3>
          <p>Sea state scale ranges from 1 (Calm) to 10 (Extreme).</p>
        </div>
      </div>
    </div>
  );
}

export default SeaStateCard;
