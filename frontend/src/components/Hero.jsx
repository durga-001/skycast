import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1>
          Explore Weather <span>Anywhere</span> in the World
        </h1>

        <p>
          SkyCast allows you to explore live weather information from anywhere
          in the world. Click on the interactive globe to view temperature,
          humidity, wind speed, pressure, and weather forecast using the
          OpenWeather API.
        </p>

        <div className="hero-buttons">
          <Link to="/signup" className="hero-btn hero-btn-primary">
            Get Started <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
