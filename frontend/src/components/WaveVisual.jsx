import "../styles/OceanDashboard.css";

function WaveVisual({ waveHeight = 0 }) {
  const scale = Math.min((waveHeight || 0) / 8, 1);

  return (
    <div className="wave-visual">
      <svg viewBox="0 0 400 160" preserveAspectRatio="none">
        <path
          className="wave-layer wave-layer-1"
          d={`M0 100 Q 50 ${100 - 35 * scale} 100 100 T 200 100 T 300 100 T 400 100 V160 H0 Z`}
        />
        <path
          className="wave-layer wave-layer-2"
          d={`M0 115 Q 50 ${115 - 22 * scale} 100 115 T 200 115 T 300 115 T 400 115 V160 H0 Z`}
        />
        <path
          className="wave-layer wave-layer-3"
          d={`M0 130 Q 50 ${130 - 12 * scale} 100 130 T 200 130 T 300 130 T 400 130 V160 H0 Z`}
        />
      </svg>
    </div>
  );
}

export default WaveVisual;
