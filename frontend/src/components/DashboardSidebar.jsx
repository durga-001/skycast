import { FiMapPin, FiTrash2, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import WeatherMap from "./WeatherMap";

function DashboardSidebar({
  weather,
  savedCities,
  loggedIn,
  setCurrentCity,
  setCity,
  fetchWeather,
  fetchForecast,
  handleDeleteLocation,
}) {
  const navigate = useNavigate();
  const [showSavedCities, setShowSavedCities] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (!mobile) {
        setShowSavedCities(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="left-panel">
      <div className="map-card glass-card">
        {weather && (
          <>
            <div className="section-header">
              <div>
                <p className="map-label">Current Location</p>
                <h3 className="map-city">{weather.city}</h3>
              </div>

              <FiMapPin className="map-pin-icon" />
            </div>

            <div
              className="desktop-map-preview"
              onClick={() =>
                navigate("/weather-map", {
                  state: { weather },
                })
              }
            >
              <WeatherMap
                latitude={weather.latitude}
                longitude={weather.longitude}
                city={weather.city}
                className="desktop-mini-map"
              />
            </div>
          </>
        )}
      </div>

      <div className="saved-cities glass-card">
        <div
          className="section-header saved-header"
          onClick={() => isMobile && setShowSavedCities((prev) => !prev)}
        >
          <h2 className="section-title">Saved Cities ({savedCities.length})</h2>

          {isMobile && (showSavedCities ? <FiChevronUp /> : <FiChevronDown />)}
        </div>

        {showSavedCities &&
          (loggedIn ? (
            savedCities.map((savedCity) => (
              <div
                className="city-item"
                key={savedCity._id}
                onClick={() => {
                  setCurrentCity(savedCity.city_name);
                  setCity(savedCity.city_name);

                  fetchWeather(savedCity.city_name);
                  fetchForecast(savedCity.city_name);
                }}
              >
                <div className="city-left">
                  <FiMapPin className="city-item-icon" />

                  <span className="city-item-name">
                    {savedCity.city_name.charAt(0).toUpperCase() +
                      savedCity.city_name.slice(1).toLowerCase()}
                  </span>
                </div>

                <button
                  className="delete-city-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLocation(savedCity._id);
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          ) : (
            <div className="login-required-card">
              <FiLock className="login-lock" />

              <h3>Save Your Favourite Cities</h3>

              <p>
                Login or create an account to save cities and access them
                instantly.
              </p>

              <div className="login-required-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DashboardSidebar;
