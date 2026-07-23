import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getOceanWeather,
  getSavedOceanLocations,
  saveOceanLocation,
  deleteOceanLocation,
} from "../services/oceanService";
import { getCurrentUser } from "../services/authService";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdOutlineVisibility } from "react-icons/md";
import { GiPressureCooker } from "react-icons/gi";
import WeatherNews from "../components/WeatherNews";
import WeatherLayout from "../components/WeatherLayout";
import WeatherAlert from "../components/WeatherAlert";
import OceanDashboardSidebar from "../components/OceanDashboardSidebar";
import SeaStateCard from "../components/SeaStateCard";
import WaveVisual from "../components/WaveVisual";
import { generateOceanAlerts } from "../utils/oceanAlerts";
import "../styles/Dashboard.css";
import "../styles/OceanDashboard.css";

function OceanDashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [lat, setLat] = useState(searchParams.get("lat") || "");
  const [lon, setLon] = useState(searchParams.get("lon") || "");
  const [data, setData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const fetchOcean = async (la = lat, lo = lon) => {
    if (!la || !lo) return;

    try {
      const result = await getOceanWeather(la, lo);
      setData(result);

      const generatedAlerts = generateOceanAlerts(result.marine?.hourly);
      setAlerts(generatedAlerts);

      const severeAlert = generatedAlerts.find((a) => a.severity === "danger");
      if (severeAlert) {
        toast.warning(severeAlert.message, { toastId: severeAlert.message });
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch ocean weather data.");
    }
  };

  const fetchSaved = async () => {
    try {
      const locations = await getSavedOceanLocations();
      setSavedLocations(locations);
    } catch (error) {
      if (error.response?.status !== 401) console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      await saveOceanLocation(
        data.lat,
        data.lon,
        `${data.lat.toFixed(2)}, ${data.lon.toFixed(2)}`,
      );
      toast.success("Ocean point saved successfully!");
      fetchSaved();
    } catch (error) {
      if (error.response?.status === 409)
        toast.info("This point is already saved.");
      else toast.error("Failed to save point.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOceanLocation(id);
      toast.success("Point removed successfully!");
      fetchSaved();
    } catch (error) {
      toast.error("Failed to delete point.");
    }
  };

  const handleSelectLocation = (la, lo) => {
    setLat(la);
    setLon(lo);
    fetchOcean(la, lo);
  };

  useEffect(() => {
    const init = async () => {
      if (lat && lon) await fetchOcean(lat, lon);

      const user = await getCurrentUser();
      if (user) {
        setLoggedIn(true);
        fetchSaved();
      } else {
        setLoggedIn(false);
        setSavedLocations([]);
      }
    };

    init();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "--";
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatVisibility = (visibility) =>
    visibility ? (visibility / 1000).toFixed(1) : "--";

  const weather = data?.weather;
  const marine = data?.marine;

  return (
    <WeatherLayout weather={weather}>
      <div className="dashboard-layout">
        <div className="left-panel desktop-sidebar">
          <OceanDashboardSidebar
            data={data}
            savedLocations={savedLocations}
            loggedIn={loggedIn}
            onSelectLocation={handleSelectLocation}
            handleDeleteLocation={handleDelete}
          />
        </div>

        <div className="right-panel">
          <div className="search-wrapper glass-card">
            <div className="search-section">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>

              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!lat || !lon) {
                    toast.error("Please enter latitude and longitude.");
                    return;
                  }
                  fetchOcean(lat, lon);
                }}
              >
                Search
              </button>

              {loggedIn && data && (
                <button className="btn btn-secondary" onClick={handleSave}>
                  Save Point
                </button>
              )}
            </div>
          </div>

          {data && (
            <>
              <WeatherAlert alerts={alerts} />

              <div className="city-header">
                <div className="city-info">
                  <div className="hero-chip">
                    <FiMapPin />
                    <span>Ocean Point</span>
                  </div>

                  <h1 className="city-name">
                    {data.lat.toFixed(2)}, {data.lon.toFixed(2)}
                  </h1>

                  <p className="city-meta">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                    {" • "}
                    {marine?.current?.waveHeight != null
                      ? `${marine.current.waveHeight.toFixed(1)}m waves`
                      : "Ocean"}
                  </p>
                </div>

                <button
                  className="change-location-btn"
                  onClick={() => navigate("/")}
                >
                  <FiMapPin />
                  Explore Map
                </button>
              </div>

              <div className="weather-row">
                <div className="local-weather-card glass-card">
                  <div className="section-header">
                    <h3 className="section-title">Wave Conditions</h3>
                  </div>

                  <WaveVisual waveHeight={marine?.current?.waveHeight} />

                  <div className="ocean-current-stats">
                    <div>
                      <p className="ocean-stat-value">
                        {marine?.current?.waveHeight != null
                          ? `${marine.current.waveHeight.toFixed(1)}m`
                          : "--"}
                      </p>
                      <p className="ocean-stat-label">Wave Height</p>
                    </div>

                    <div>
                      <p className="ocean-stat-value">
                        {marine?.current?.wavePeriod != null
                          ? `${marine.current.wavePeriod.toFixed(1)}s`
                          : "--"}
                      </p>
                      <p className="ocean-stat-label">Wave Period</p>
                    </div>

                    <div>
                      <p className="ocean-stat-value">
                        {marine?.current?.swellHeight != null
                          ? `${marine.current.swellHeight.toFixed(1)}m`
                          : "--"}
                      </p>
                      <p className="ocean-stat-label">Swell Height</p>
                    </div>
                  </div>
                </div>

                <div className="hourly-forecast glass-card">
                  <div className="section-header">
                    <h3 className="section-title">Today</h3>
                  </div>

                  <div className="forecast-scroll">
                    {(marine?.hourly || []).slice(0, 6).map((item, i) => (
                      <div className="forecast-card" key={item.time || i}>
                        <p className="forecast-time">
                          {item.time
                            ? new Date(item.time).toLocaleTimeString([], {
                                hour: "numeric",
                              })
                            : "--"}
                        </p>
                        <div className="forecast-icon wave-emoji">🌊</div>
                        <p className="forecast-temp">
                          {item.waveHeight != null
                            ? `${item.waveHeight.toFixed(1)}m`
                            : "--"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="dashboard-row">
                <div className="weekly-forecast glass-card">
                  <div className="section-header">
                    <h3 className="section-title">Wave Outlook</h3>
                  </div>

                  <div className="weekly-grid">
                    {(marine?.daily || []).map((day) => (
                      <div key={day.date} className="weekly-card">
                        <p className="forecast-day">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </p>
                        <span className="forecast-date">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="weekly-icon wave-emoji">🌊</div>
                        <h4>
                          {day.waveHeightMax != null
                            ? `${day.waveHeightMax.toFixed(1)}m`
                            : "--"}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

                {weather && (
                  <div className="weather-card glass-card">
                    <div className="section-header">
                      <h2 className="section-title">Today's Highlights</h2>
                    </div>

                    <div className="stats-grid">
                      <div className="stat-card">
                        <h3>
                          <FaTemperatureHalf /> Feels Like
                        </h3>
                        <p>{Math.round(weather.feels_like)}°C</p>
                      </div>

                      <div className="stat-card">
                        <h3>
                          <WiHumidity /> Humidity
                        </h3>
                        <p>{weather.humidity}%</p>
                      </div>

                      <div className="stat-card">
                        <h3>
                          <MdOutlineVisibility /> Visibility
                        </h3>
                        <p>{formatVisibility(weather.visibility)} km</p>
                      </div>

                      <div className="stat-card">
                        <h3>
                          <FaWind /> Wind Speed
                        </h3>
                        <p>{weather.wind_speed} m/s</p>
                      </div>

                      <div className="stat-card">
                        <h3>
                          <GiPressureCooker /> Pressure
                        </h3>
                        <p>{weather.pressure} hPa</p>
                      </div>

                      <div className="stat-card">
                        <h3>
                          <WiSunrise /> Sunrise
                        </h3>
                        <p>{formatTime(weather.sunrise)}</p>
                      </div>

                      <div className="stat-card">
                        <h3>
                          <WiSunset /> Sunset
                        </h3>
                        <p>{formatTime(weather.sunset)}</p>
                      </div>
                    </div>
                  </div>
                )}

                <SeaStateCard seaState={data.seaState} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mobile-sidebar">
        <OceanDashboardSidebar
          data={data}
          savedLocations={savedLocations}
          loggedIn={loggedIn}
          onSelectLocation={handleSelectLocation}
          handleDeleteLocation={handleDelete}
        />
      </div>

      <WeatherNews />
    </WeatherLayout>
  );
}

export default OceanDashboard;
