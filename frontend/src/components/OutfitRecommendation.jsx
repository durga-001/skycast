import { GiBilledCap, GiRunningShoe, GiShirt } from "react-icons/gi";
import { IoShirt } from "react-icons/io5";
import { FaLightbulb, FaShoePrints } from "react-icons/fa";
import { MdPalette } from "react-icons/md";
import { PiBaseballCapDuotone } from "react-icons/pi";
import { HiLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import WardrobeManager from "./WardrobeManager";

export default function OutfitRecommendation({
  recommendation,
  weather,
  loggedIn,
}) {
  if (!recommendation) return null;

  return (
    <>
      <section className="outfit-grid">
        <div className="outfit-card glass-card">
          <h2 className="outfit-card-title">
            <IoShirt />
            Clothing
          </h2>

          <ul className="outfit-list">
            {(recommendation.clothing || []).map((item) => (
              <li key={item} className="outfit-item">
                <GiShirt className="outfit-item-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="outfit-card-footer">
            Best for{" "}
            {weather?.temperature !== undefined && weather?.temperature !== null
              ? `${Math.round(weather.temperature)}°C`
              : "--°C"}
          </div>
        </div>

        <div className="outfit-card glass-card">
          <h2 className="outfit-card-title">
            <GiRunningShoe /> Footwear
          </h2>

          <ul className="outfit-list">
            {(recommendation.footwear || []).map((item) => (
              <li key={item} className="outfit-item">
                <FaShoePrints className="outfit-item-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="outfit-card-footer">
            Comfortable throughout the day
          </div>
        </div>

        <div className="outfit-card glass-card">
          <h2 className="outfit-card-title">
            <GiBilledCap /> Accessories
          </h2>

          <ul className="outfit-list">
            {(recommendation.accessories || []).map((item) => (
              <li key={item} className="outfit-item">
                <PiBaseballCapDuotone className="outfit-item-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="outfit-card-footer">
            Selected for today's conditions
          </div>
        </div>

        <div className="outfit-card glass-card">
          <h2 className="outfit-card-title">
            <MdPalette />
            Best Colors
          </h2>

          <ul className="outfit-list">
            {(recommendation.colors || []).map((color) => (
              <li key={color} className="outfit-item outfit-color-item">
                <span
                  className="color-dot"
                  style={{
                    backgroundColor: color.toLowerCase().replace(/\s+/g, ""),
                  }}
                ></span>

                {color}
              </li>
            ))}
          </ul>

          <div className="outfit-card-footer">
            Matches today's weather palette
          </div>
        </div>

        <div className="outfit-card glass-card outfit-card-full">
          <h2 className="outfit-card-title">
            <FaLightbulb /> Tips
          </h2>

          <ul className="outfit-list">
            {(recommendation.tips || []).map((item) => (
              <li key={item} className="outfit-item">
                <HiLightBulb className="outfit-item-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {loggedIn ? (
        <div className="outfit-card-full">
          <WardrobeManager weatherType={recommendation.weatherType} />
        </div>
      ) : (
        <div className="glass-card wardrobe-lock-card">
          <FiLock className="wardrobe-lock-icon" />

          <h2>Unlock Personalized Outfit Recommendations</h2>

          <p>
            Add your wardrobe and we'll recommend exactly what to wear from your
            own clothes based on today's weather.
          </p>

          <div className="wardrobe-lock-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>

            <Link to="/signup" className="btn btn-outline">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
