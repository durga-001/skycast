import getBackgroundImage from "../utils/getBackgroundImage";

export default function WeatherLayout({ weather, children }) {
  const theme = getBackgroundImage(weather?.weather);

  return <div className={`app ${theme || "sunny"}`}>{children}</div>;
}
