const getBackgroundImage = (weatherMain, icon) => {
  const isNight = icon?.includes("n");

  switch (weatherMain?.toLowerCase()) {
    case "clear":
      return isNight
        ? "/backgrounds/night-clear.jpg"
        : "/backgrounds/day-clear.jpg";

    case "clouds":
      return isNight
        ? "/backgrounds/night-cloudy.png"
        : "/backgrounds/day-cloudy.jpg";

    case "rain":
    case "drizzle":
      return isNight
        ? "/backgrounds/night-rain.jpg"
        : "/backgrounds/day-rain.jpg";

    case "thunderstorm":
      return isNight
        ? "/backgrounds/night-thunderstorm.jpg"
        : "/backgrounds/day-thunderstorm.jpg";

    case "snow":
      return isNight
        ? "/backgrounds/night-snow.jpg"
        : "/backgrounds/day-snow.jpg";

    case "mist":
    case "fog":
      return isNight
        ? "/backgrounds/night-fog.jpg"
        : "/backgrounds/day-fog.jpg";

    case "haze":
    case "smoke":
    case "dust":
    case "sand":
    case "ash":
      return isNight
        ? "/backgrounds/night-haze.jpg"
        : "/backgrounds/day-haze.jpg";

    case "squall":
    case "tornado":
      return isNight
        ? "/backgrounds/night-storm.jpg"
        : "/backgrounds/day-storm.png";

    default:
      return isNight
        ? "/backgrounds/night-clear.jpg"
        : "/backgrounds/day-clear.jpg";
  }
};

export default getBackgroundImage;
