import { useEffect, useState } from "react";
import {
  getWeather,
  getForecast,
  getAirQuality,
} from "../services/weatherService";
import {
  getSavedLocations,
  saveLocation,
  deleteLocation,
} from "../services/locationService";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import { getCurrentUser } from "../services/authService";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSunrise,
  WiSunset,
  WiHumidity,
} from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdOutlineVisibility } from "react-icons/md";
import { GiPressureCooker } from "react-icons/gi";
import { useWeatherContext } from "../context/WeatherContext";
import WeatherNews from "../components/WeatherNews";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FiArrowRight } from "react-icons/fi";
import WeatherLayout from "../components/WeatherLayout";
import AQICard from "../components/AQICard";
import WeatherAlert from "../components/WeatherAlert";
import { generateWeatherAlerts } from "../utils/weatherAlerts";
import DashboardSidebar from "../components/DashboardSidebar";

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const { currentCity, setCurrentCity } = useWeatherContext();
  const [city, setCity] = useState(currentCity);
  const [savedCities, setSavedCities] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [aqi, setAqi] = useState(null);
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const fetchWeather = async (cityName = city) => {
    try {
      

      const data = await getWeather(cityName);

      

      setWeather(data);
      fetchAQI(data.latitude, data.longitude);
    } catch (error) {
      console.log(error.response?.data);

      toast.error("City not found");
    }
  };

  const fetchSavedCities = async () => {
    try {
      const locations = await getSavedLocations();

      const uniqueCities = [
        ...new Map(
          locations.map((city) => [city.city_name.toLowerCase(), city]),
        ).values(),
      ];
      setSavedCities(uniqueCities);
    } catch (error) {
      console.error(error);

      toast.error("City not found");
    }
  };

  const handleSaveLocation = async () => {
    try {
      await saveLocation(city);

      toast.success("City saved successfully!");

      fetchSavedCities();
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("City already exists in your saved list.");
      } else {
        toast.error("Failed to save city.");
        console.error(error);
      }
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await deleteLocation(id);

      toast.success("City removed successfully!");

      fetchSavedCities();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete city.");
    }
  };

  const fetchForecast = async (cityName = city) => {
    try {
      const data = await getForecast(cityName);
      const dailyData = [];

      const uniqueDays = new Set();

      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!uniqueDays.has(date) && item.dt_txt.includes("12:00:00")) {
          uniqueDays.add(date);

          dailyData.push({
            day: new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            date: new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            temp: Math.round(item.main.temp),
            weather: item.weather[0].main,
          });
        }
      });

      setDailyForecast(dailyData);
      setForecast(data.list);
      const generatedAlerts = generateWeatherAlerts(data.list);

      setAlerts(generatedAlerts);

      // Toast only for severe weather
      const severeAlert = generatedAlerts.find(
        (alert) => alert.severity === "danger",
      );

      if (severeAlert) {
        toast.warning(severeAlert.message, {
          toastId: severeAlert.message, // prevents duplicate toasts
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("City not found");
    }
  };

  const fetchAQI = async (lat, lon) => {
    try {
      const data = await getAirQuality(lat, lon);

      // OpenWeather returns AQI from 1–5
      const aqiLevels = {
        1: 30,
        2: 75,
        3: 125,
        4: 175,
        5: 250,
      };

      setAqi(aqiLevels[data.list[0].main.aqi]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCity(currentCity);

    const init = async () => {
      fetchWeather(currentCity);
      fetchForecast(currentCity);

      try {
        await getCurrentUser();

        setLoggedIn(true);

        fetchSavedCities();
      } catch {
        setLoggedIn(false);
      }
    };

    init();
  }, [currentCity]);

  const getWeatherIcon = (condition, size) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return <WiDaySunny size={size} color="#FDB813" />;

      case "clouds":
        return <WiCloud size={size} color="#7f8c8d" />;

      case "rain":
        return <WiRain size={size} color="#3498db" />;

      case "thunderstorm":
        return <WiThunderstorm size={size} color="#f1c40f" />;

      default:
        return <WiDaySunny size={size} color="#FDB813" />;
    }
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatVisibility = (visibility) => {
    return (visibility / 1000).toFixed(1);
  };

  return (
    <WeatherLayout weather={weather}>
      <div className="dashboard-layout">
        {/* Left Panel */}
        <div className="left-panel desktop-sidebar">
          <DashboardSidebar
            weather={weather}
            savedCities={savedCities}
            loggedIn={loggedIn}
            setCurrentCity={setCurrentCity}
            setCity={setCity}
            fetchWeather={fetchWeather}
            fetchForecast={fetchForecast}
            handleDeleteLocation={handleDeleteLocation}
          />
        </div>

        {/* Right Panel */}

        <div className="right-panel">
          <div className="search-wrapper glass-card">
            <div className="search-section">
              <div className="search-box">
                <FiSearch className="search-icon" />

                <input
                  type="text"
                  placeholder="Search city..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!city.trim()) {
                    toast.error("Please enter a city.");
                    return;
                  }

                  setCurrentCity(city);
                }}
              >
                Search
              </button>
            </div>

            {loggedIn && (
              <button
                className="btn btn-secondary save-city-btn"
                onClick={handleSaveLocation}
              >
                Save City
              </button>
            )}
          </div>
          {weather && (
            <>
              <WeatherAlert alerts={alerts} />
              <div className="city-header">
                <div className="city-info">
                  <div className="hero-chip">
                    <FiMapPin />
                    <span>{weather.country}</span>
                  </div>

                  <h1 className="city-name">{weather.city}</h1>

                  <p className="city-meta">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                    {" • "}
                    {weather.weather}
                  </p>
                </div>

                <button
                  className="change-location-btn"
                  onClick={() =>
                    navigate("/weather-map", {
                      state: { weather },
                    })
                  }
                >
                  <FiMapPin />
                  Explore Map
                </button>
              </div>
              <div className="weather-row">
                <div className="local-weather-card glass-card">
                  <div className="section-header">
                    <h3 className="section-title">Local Weather</h3>
                  </div>

                  <div className="local-weather-content">
                    <div className="weather-icon">
                      {getWeatherIcon(weather.weather, 80)}
                    </div>

                    <div className="temp-info">
                      <div className="celsius">
                        {Math.round(weather.temperature)}°C
                      </div>

                      <div className="fahrenheit">
                        {Math.round(weather.temperature * 1.8 + 32)}°F
                      </div>
                    </div>

                    <div className="weather-info">
                      <p className="condition-text">{weather.weather}</p>

                      <h2 className="day-name">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </h2>

                      <div className="wind-info">
                        <FaWind />
                        <span>{weather.wind_speed} m/s</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hourly-forecast glass-card">
                  <div className="section-header">
                    <h3 className="section-title">Today</h3>
                  </div>

                  <div className="forecast-scroll">
                    {forecast.slice(0, 6).map((item, index) => (
                      <div className="forecast-card" key={index}>
                        <p className="forecast-time">
                          {new Date(item.dt_txt).toLocaleTimeString([], {
                            hour: "numeric",
                          })}
                        </p>

                        <div className="forecast-icon">
                          {getWeatherIcon(item.weather[0].main, 35)}
                        </div>

                        <p className="forecast-temp">
                          {Math.round(item.main.temp)}°
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="dashboard-row">
                <div className="weekly-forecast glass-card">
                  <div className="section-header">
                    <h3 className="section-title">Weather Outlook</h3>
                  </div>

                  <div className="weekly-grid">
                    {dailyForecast.map((day, index) => (
                      <div key={index} className="weekly-card">
                        <p className="forecast-day">{day.day}</p>

                        <span className="forecast-date">{day.date}</span>

                        <div className="weekly-icon">
                          {getWeatherIcon(day.weather, 70)}
                        </div>

                        <h4>{day.temp}°</h4>
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
                          <MdOutlineVisibility />
                          Visibility
                        </h3>
                        <p>{formatVisibility(weather.visibility)} km</p>
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
                          <WiSunset />
                          Sunset
                        </h3>
                        <p>{formatTime(weather.sunset)}</p>
                      </div>
                    </div>
                  </div>
                )}
                {aqi != null && <AQICard aqi={aqi} />}
                {weather && (
                  <div className="outfit-preview glass-card">
                    <div className="outfit-preview-content">
                      <div>
                        <p className="outfit-preview-label">
                          Smart Outfit Assistant
                        </p>

                        <h2 className="outfit-preview-title">
                          Dress according to today's weather
                        </h2>

                        <p className="outfit-preview-text">
                          Get personalized clothing, footwear, accessories and
                          weather tips based on the current conditions.
                        </p>
                      </div>

                      <button
                        className="outfit-preview-btn"
                        onClick={() =>
                          navigate("/outfit", {
                            state: { weather },
                          })
                        }
                      >
                        Explore
                        <FiArrowRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mobile-sidebar">
        <DashboardSidebar
          weather={weather}
          savedCities={savedCities}
          loggedIn={loggedIn}
          setCurrentCity={setCurrentCity}
          setCity={setCity}
          fetchWeather={fetchWeather}
          fetchForecast={fetchForecast}
          handleDeleteLocation={handleDeleteLocation}
        />
      </div>
      <WeatherNews />
    </WeatherLayout>
  );
}
export default Dashboard;
