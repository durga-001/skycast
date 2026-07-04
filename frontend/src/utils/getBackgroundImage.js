const getBackgroundImage = (weatherMain) => {
  switch (weatherMain?.toLowerCase()) {
    case "clear":
      return "sunny";

    case "clouds":
      return "clouds";

    case "rain":
    case "drizzle":
      return "rain";

    case "thunderstorm":
      return "thunderstorm";

    case "snow":
      return "snow";

    case "mist":
    case "fog":
      return "clouds";

    case "haze":
    case "smoke":
    case "dust":
    case "sand":
    case "ash":
      return "clouds";

    case "squall":
    case "tornado":
      return "thunderstorm";

    default:
      return "sunny";
  }
};

export default getBackgroundImage;
