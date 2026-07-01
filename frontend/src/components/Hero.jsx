import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
  const scrollToGlobe = () => {
    const globeSection = document.getElementById("globe");
    if (globeSection) {
      globeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
            Real-Time Weather Dashboard
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight max-w-4xl">
            Explore Weather
            <span className="text-orange-500"> Anywhere </span>
            in the World
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-8">
            SkyCast lets you explore weather conditions across the globe. Click
            anywhere on the interactive globe to instantly view temperature,
            humidity, wind speed, pressure, and much more using live OpenWeather
            API data.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-3 text-white font-semibold hover:bg-orange-600 transition"
            >
              Get Started
              <HiArrowRight />
            </Link>

            <button
              onClick={scrollToGlobe}
              className="rounded-lg border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Explore Globe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
