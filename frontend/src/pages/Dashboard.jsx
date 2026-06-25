import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { FiMapPin } from "react-icons/fi";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdOutlineVisibility } from "react-icons/md";
import { GiPressureCooker } from "react-icons/gi";
import getBackgroundImage from "../utils/getBackgroundImage";
import WeatherMap from "../components/WeatherMap";
import WeatherNews from "../components/WeatherNews";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [savedCities, setSavedCities] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const navigate = useNavigate();

  const fetchWeather = async (cityName = city) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/weather/${cityName}`,
      );

      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSavedCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");

      setSavedCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const saveLocation = async () => {
    try {
      await axios.post("http://localhost:5000/locations", {
        city_name: city,
        country: "Unknown",
      });

      toast.success("City Saved!");
      fetchSavedCities();
    } catch (error) {
      toast.error("Failed to save city");
      console.error(error);
    }
  };
  const fetchForecast = async (cityName = city) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/forecast/${cityName}`,
      );
      const dailyData = [];

      const uniqueDays = new Set();

      response.data.list.forEach((item) => {
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
      setForecast(response.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchForecast();
    fetchSavedCities();
  }, []);

  const getWeatherIcon = () => {
    switch (weather?.weather?.toLowerCase()) {
      case "clear":
        return <WiDaySunny size={80} color="#FDB813" />;

      case "clouds":
        return <WiCloud size={80} color="#7f8c8d" />;

      case "rain":
        return <WiRain size={80} color="#3498db" />;

      case "thunderstorm":
        return <WiThunderstorm size={80} color="#f1c40f" />;

      default:
        return <WiDaySunny size={80} color="#FDB813" />;
    }
  };

  const getForecastIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <WiDaySunny size={35} color="#FDB813" />;

      case "clouds":
        return <WiCloud size={35} color="#7f8c8d" />;

      case "rain":
        return <WiRain size={35} color="#3498db" />;

      case "thunderstorm":
        return <WiThunderstorm size={35} color="#f1c40f" />;

      default:
        return <WiDaySunny size={35} color="#FDB813" />;
    }
  };

  const getForecastIconDays = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <WiDaySunny size={70} color="#FDB813" />;

      case "clouds":
        return <WiCloud size={70} color="#7f8c8d" />;

      case "rain":
        return <WiRain size={70} color="#3498db" />;

      case "thunderstorm":
        return <WiThunderstorm size={70} color="#f1c40f" />;

      default:
        return <WiDaySunny size={70} color="#FDB813" />;
    }
  };

  const backgroundImage = getBackgroundImage(weather?.weather, weather?.icon);

  useEffect(() => {
    if (!backgroundImage) return;

    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);

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
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1>SkyCast</h1>

      <div className="dashboard-layout">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="map-card">
            {weather && (
              <>
                <div className="map-header">
                  <FiMapPin /> Current Location
                </div>

                <div className="map-city">{weather.city}</div>

                <div
                  className="map-section"
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
                  />
                </div>
              </>
            )}
          </div>

          <div className="saved-cities">
            <h2>Saved Cities</h2>

            {savedCities.map((savedCity) => (
              <div
                className="city-item"
                key={savedCity.id}
                onClick={() => {
                  setCity(savedCity.city_name);
                  fetchWeather(savedCity.city_name);
                  fetchForecast(savedCity.city_name);
                }}
              >
                {savedCity.city_name.charAt(0).toUpperCase() +
                  savedCity.city_name.slice(1).toLowerCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}

        <div className="right-panel">
          <div className="search-section">
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button
              onClick={() => {
                fetchWeather();
                fetchForecast();
              }}
            >
              Search
            </button>

            <button onClick={saveLocation}>Save City</button>
          </div>
          {weather && (
            <>
              <div className="city-header">
                <div className="city-info">
                  <h1 className="city-name">{weather.city}</h1>

                  <p className="country-name">{weather.country}</p>
                </div>

                <button className="change-location-btn">
                  <FiMapPin />
                  Change Location
                </button>
              </div>
              <div className="weather-row">
                <div className="local-weather-card">
                  <h3>LOCAL WEATHER REPORT</h3>

                  <div className="local-weather-content">
                    <div className="weather-icon">{getWeatherIcon()}</div>

                    <div className="weather-info">
                      <h2 className="day-name">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </h2>

                      <p className="condition-text">{weather.weather}</p>

                      <div className="wind-info">
                        <FaWind />
                        <span>{weather.wind_speed} m/s</span>
                      </div>
                    </div>

                    <div className="temp-info">
                      <div className="celsius">
                        {Math.round(weather.temperature)}°C
                      </div>

                      <div className="fahrenheit">
                        {Math.round(weather.temperature * 1.8 + 32)}°F
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hourly-forecast">
                  <h3>Today's Forecast</h3>

                  <div className="forecast-scroll">
                    {forecast.slice(0, 6).map((item, index) => (
                      <div className="forecast-card" key={index}>
                        <p className="forecast-time">
                          {new Date(item.dt_txt).toLocaleTimeString([], {
                            hour: "numeric",
                          })}
                        </p>

                        <div className="forecast-icon">
                          {getForecastIcon(item.weather[0].main)}
                        </div>

                        <p className="forecast-temp">
                          {Math.round(item.main.temp)}°
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="weekly-forecast">
                <h3>Weather Outlook</h3>

                <div className="weekly-grid">
                  {dailyForecast.map((day, index) => (
                    <div key={index} className="weekly-card">
                      <p className="forecast-day">{day.day}</p>

                      <span className="forecast-date">{day.date}</span>

                      {getForecastIconDays(day.weather)}

                      <h4>{day.temp}°C</h4>
                    </div>
                  ))}
                </div>
              </div>

              {weather && (
                <div className="weather-card">
                  <h2>{weather.city}</h2>
                  <h5>{weather.country}</h5>

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
            </>
          )}
        </div>
      </div>
      <WeatherNews />
      <Footer />

      <ToastContainer />
    </div>
    
  );
}
export default Dashboard;
