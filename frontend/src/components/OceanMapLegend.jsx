const legends = {
  wave: {
    title: "Wave Height",
    items: [
      { color: "#22c55e", label: "Calm (< 1.25m)" },
      { color: "#facc15", label: "Moderate (1.25-2.5m)" },
      { color: "#f97316", label: "Rough (2.5-4m)" },
      { color: "#ef4444", label: "Very Rough (4-6m)" },
      { color: "#7f1d1d", label: "High (6m+)" },
    ],
  },
  wind: {
    title: "Wind Speed",
    items: [
      { color: "#86efac", label: "Light (< 5 m/s)" },
      { color: "#22c55e", label: "Moderate (5-10 m/s)" },
      { color: "#15803d", label: "Strong (10 m/s+)" },
    ],
  },
  period: {
    title: "Wave Period",
    items: [
      { color: "#38bdf8", label: "Short (< 6s)" },
      { color: "#0ea5e9", label: "Medium (6-10s)" },
      { color: "#0369a1", label: "Long (10s+)" },
    ],
  },
  swell: {
    title: "Swell Height",
    items: [
      { color: "#a78bfa", label: "Low (< 1m)" },
      { color: "#7c3aed", label: "Medium (1-2.5m)" },
      { color: "#4c1d95", label: "High (2.5m+)" },
    ],
  },
};

function OceanMapLegend({ selectedLayer }) {
  const legend = legends[selectedLayer];

  if (!legend) return null;

  return (
    <div className="map-legend">
      <h4>🌊 {legend.title}</h4>

      {legend.items.map((item) => (
        <div className="legend-item" key={item.label}>
          <span
            className="legend-color"
            style={{ background: item.color }}
          ></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default OceanMapLegend;
