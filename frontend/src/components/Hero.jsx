import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
  const scrollToGlobe = () => {
    const globe = document.getElementById("globe");

    if (globe) {
      globe.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white w-full pt-10 pb-10 mb-10 ">
      {/* mx-auto handles the horizontal center-alignment of the text container */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="max-w-5xl text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Explore Weather
            <span className="text-blue-600"> Anywhere </span>
            in the World
          </h1>

          {/* Description */}
          <p className="mt-12 max-w-3xl text-xl leading-9 text-gray-600">
            SkyCast allows you to explore live weather information from anywhere
            in the world. Click on the interactive globe to view temperature,
            humidity, wind speed, pressure, and weather forecast using the
            OpenWeather API.
          </p>

          {/* Buttons */}
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center h-14 min-w-[190px] rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
              <HiArrowRight className="ml-2" />
            </Link>

            {/* <button
              onClick={scrollToGlobe}
              className="inline-flex items-center justify-center h-14 min-w-[190px] rounded-lg border border-blue-600 text-blue-600 text-lg font-semibold hover:bg-blue-50 transition"
            >
              Explore Globe
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
