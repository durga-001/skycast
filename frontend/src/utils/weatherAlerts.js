export const generateWeatherAlerts = (forecast) => {
  if (!forecast || forecast.length === 0) return [];

  const alerts = [];
  const today = new Date().toDateString();


  forecast
    .filter((item) => new Date(item.dt_txt).toDateString() === today)
    .forEach((item) => {
      const weather = item.weather?.[0]?.main?.toLowerCase() || "";
      const temp = item.main.temp;
      const wind = item.wind.speed;
      const humidity = item.main.humidity;

      const time = new Date(item.dt_txt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      if (weather.includes("rain")) {
        alerts.push({
          type: "rain",
          severity: "warning",
          message: `Rain expected around ${time}. Carry an umbrella.`,
        });
      }

      if (weather.includes("thunderstorm")) {
        alerts.push({
          type: "storm",
          severity: "danger",
          message: `Thunderstorm expected around ${time}. Avoid outdoor travel.`,
        });
      }

      if (temp >= 38) {
        alerts.push({
          type: "heat",
          severity: "warning",
          message: `Extreme heat around ${time}. Stay hydrated.`,
        });
      }

      if (temp <= 5) {
        alerts.push({
          type: "cold",
          severity: "warning",
          message: `Very cold weather around ${time}. Wear warm clothing.`,
        });
      }

      if (wind >= 10) {
        alerts.push({
          type: "wind",
          severity: "info",
          message: `Strong winds expected around ${time}.`,
        });
      }

      if (humidity >= 90) {
        alerts.push({
          type: "humidity",
          severity: "info",
          message: `High humidity around ${time}.`,
        });
      }
    });

  return [...new Map(alerts.map((a) => [a.message, a])).values()];
};
