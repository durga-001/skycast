import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";

const features = [
  {
    title: "Real-Time Weather",
    desc: "Get live weather updates from OpenWeather API.",
    icon: <WiDaySunny size={60} />,
  },
  {
    title: "Humidity",
    desc: "Check humidity level of any location.",
    icon: <WiHumidity size={60} />,
  },
  {
    title: "Wind Speed",
    desc: "View accurate wind speed and direction.",
    icon: <WiStrongWind size={60} />,
  },
  {
    title: "Air Pressure",
    desc: "Monitor atmospheric pressure in real time.",
    icon: <WiBarometer size={60} />,
  },
];

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Features</h2>

          <p className="features-subtitle">
            SkyCast provides accurate weather information using OpenWeather API
            with a clean and modern interface.
          </p>
        </div>
        <div className="features-grid">
          {features.map((item) => (
            <div key={item.title} className="feature-card glass-card">
              <div className="feature-icon">{item.icon}</div>

              <h3 className="feature-title">{item.title}</h3>

              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
