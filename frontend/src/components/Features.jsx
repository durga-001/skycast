import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";

const features = [
  {
    title: "Real-Time Weather",
    desc: "Get live weather updates from the OpenWeather API.",
    icon: <WiDaySunny size={50} />,
  },
  {
    title: "Humidity",
    desc: "Check the current humidity level of any location.",
    icon: <WiHumidity size={50} />,
  },
  {
    title: "Wind Speed",
    desc: "View accurate wind speed and wind direction.",
    icon: <WiStrongWind size={50} />,
  },
  {
    title: "Air Pressure",
    desc: "Monitor atmospheric pressure in real time.",
    icon: <WiBarometer size={50} />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Features</h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            SkyCast provides accurate weather information using the OpenWeather
            API with a clean and interactive interface.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700 hover:border-orange-400 transition duration-300"
            >
              <div className="flex justify-center text-orange-400 mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-gray-400 text-sm leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
