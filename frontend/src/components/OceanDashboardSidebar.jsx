import {
  FiMapPin,
  FiTrash2,
  FiLock,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OceanMap from "./OceanMap";

function OceanDashboardSidebar({
  data,
  savedLocations,
  loggedIn,
  onSelectLocation,
  handleDeleteLocation,
}) {
  const navigate = useNavigate();
  const [showSaved, setShowSaved] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setShowSaved(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="left-panel">
      <div className="map-card glass-card">
        {data && (
          <>
            <div className="section-header">
              <div>
                <p className="map-label">Current Point</p>
                <h3 className="map-city">
                  {data.lat.toFixed(2)}, {data.lon.toFixed(2)}
                </h3>
              </div>
              <FiMapPin className="map-pin-icon" />
            </div>

            <div className="desktop-map-preview">
              <OceanMap
                latitude={data.lat}
                longitude={data.lon}
                bounds={data.area?.bounds}
                className="desktop-mini-map"
              />
            </div>
          </>
        )}
      </div>

      <div className="saved-cities glass-card">
        <div
          className="section-header saved-header"
          onClick={() => isMobile && setShowSaved((prev) => !prev)}
        >
          <h2 className="section-title">
            Saved Points ({savedLocations?.length || 0})
          </h2>
          {isMobile && (showSaved ? <FiChevronUp /> : <FiChevronDown />)}
        </div>

        {showSaved &&
          (loggedIn ? (
            (savedLocations || []).map((loc) => (
              <div
                className="city-item"
                key={loc._id}
                onClick={() => onSelectLocation(loc.lat, loc.lon)}
              >
                <div className="city-left">
                  <FiMapPin className="city-item-icon" />
                  <span className="city-item-name">{loc.label}</span>
                </div>

                <button
                  className="delete-city-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLocation(loc._id);
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          ) : (
            <div className="login-required-card">
              <FiLock className="login-lock" />
              <h3>Save Your Favourite Ocean Points</h3>
              <p>
                Login or create an account to save ocean points and access them
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

export default OceanDashboardSidebar;
