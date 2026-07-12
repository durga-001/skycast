import outfitRules from "../utils/outfitRules";

export const getOutfitRecommendation = (weather) => {
  if (!weather) return null;

  const temp = weather.temperature;
  const condition = weather.weather?.toLowerCase() ?? "";

  if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("thunderstorm")
  ) {
    return {
      weatherType: "Rainy",
      ...outfitRules.rainy,
    };
  }

  if (condition.includes("snow")) {
    return {
      weatherType: "Snowy",
      ...outfitRules.snowy,
    };
  }

  if (temp >= 32) {
    return {
      weatherType: "Hot",
      ...outfitRules.hot,
    };
  }

  if (temp >= 22) {
    return {
      weatherType: "Warm",
      ...outfitRules.warm,
    };
  }

  return {
    weatherType: "Cold",
    ...outfitRules.cold,
  };
};
