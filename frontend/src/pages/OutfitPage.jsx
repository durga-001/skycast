import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWeather } from "../services/weatherService";
import { getOutfitRecommendation } from "../services/outfitService";

import OutfitHero from "../components/OutfitHero";
import OutfitRecommendation from "../components/OutfitRecommendation";

import "../styles/OutfitRecommendation.css";
import WeatherLayout from "../components/WeatherLayout";

export default function OutfitPage() {
  const [weather, setWeather] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const location = useLocation();

  const passedWeather = location.state?.weather;
  useEffect(() => {
    if (passedWeather) {
      setWeather(passedWeather);
      setRecommendation(getOutfitRecommendation(passedWeather));
      return;
    }

    const fetchData = async () => {
      const data = await getWeather("Delhi");

      setWeather(data);
      setRecommendation(getOutfitRecommendation(data));
    };

    fetchData();
  }, [passedWeather]);<WeatherLayout weather={weather}></WeatherLayout>

  return (
    <WeatherLayout weather={weather}>
      <div className="outfit-container">
        <OutfitHero weather={weather} />

        {recommendation && (
          <OutfitRecommendation
            recommendation={recommendation}
            weather={weather}
          />
        )}
      </div>
    </WeatherLayout>
  );
}
