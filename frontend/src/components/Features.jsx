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
    icon: <WiDaySunny size={60} />,
  },
  {
    title: "Humidity",
    desc: "Check the current humidity level of any location.",
    icon: <WiHumidity size={60} />,
  },
  {
    title: "Wind Speed",
    desc: "View accurate wind speed and wind direction.",
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
    <section id="features" className="bg-gray-50 py-2">
      <div className="container mx-auto px-8 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900">Features</h2>

          <p className="mt-3 max-w-3xl text-xl leading-9 text-gray-600">
            SkyCast provides accurate weather information using the OpenWeather
            API with a clean and user-friendly interface.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
          {features.map((item) => (
            <div
              key={item.title}
              className="w-full max-w-xs bg-white rounded-xl border border-gray-200 p-10 text-center shadow"
            >
              <div className="flex justify-center mb-8 text-blue-600">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
