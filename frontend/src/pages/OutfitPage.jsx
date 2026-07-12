import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWeather } from "../services/weatherService";
import { getOutfitRecommendation } from "../services/outfitService";
import OutfitHero from "../components/OutfitHero";
import OutfitRecommendation from "../components/OutfitRecommendation";
import { getCurrentUser } from "../services/authService";
import "../styles/OutfitRecommendation.css";
import WeatherLayout from "../components/WeatherLayout";
import { useWeatherContext } from "../context/WeatherContext";
import { toast } from "react-toastify";

export default function OutfitPage() {
  const [weather, setWeather] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  const passedWeather = location.state?.weather;
  const { currentCity } = useWeatherContext();

  useEffect(() => {
    if (passedWeather) {
      setWeather(passedWeather);
      setRecommendation(getOutfitRecommendation(passedWeather));
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getWeather(currentCity);

        setWeather(data);
        setRecommendation(getOutfitRecommendation(data));
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch weather details.");
      }
    };

    fetchData();
  }, [passedWeather, currentCity]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <WeatherLayout weather={weather}>
      <div className="outfit-container">
        <OutfitHero weather={weather} />

        {recommendation && (
          <>
            <OutfitRecommendation
              recommendation={recommendation}
              weather={weather}
              loggedIn={loggedIn}
            />
          </>
        )}
      </div>
    </WeatherLayout>
  );
}
