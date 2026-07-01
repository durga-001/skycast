import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";

const features = [
  {
    title: "Real-Time Weather",
    desc: "Live weather updates from OpenWeather API.",
    icon: <WiDaySunny size={45} />,
  },
  {
    title: "Humidity",
    desc: "Current humidity information.",
    icon: <WiHumidity size={45} />,
  },
  {
    title: "Wind Speed",
    desc: "Wind speed and direction.",
    icon: <WiStrongWind size={45} />,
  },
  {
    title: "Pressure",
    desc: "Atmospheric pressure details.",
    icon: <WiBarometer size={45} />,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-slate-800 rounded-xl p-6 text-center shadow-lg"
            >
              <div className="text-orange-400 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
