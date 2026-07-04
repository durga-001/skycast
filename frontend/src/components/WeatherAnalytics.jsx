import AnalyticsChart from "./AnalyticsChart";

function WeatherAnalytics({ forecastData }) {
  return (
    <>
      <AnalyticsChart
        title="Temperature Trend"
        data={forecastData}
        dataKey="temperature"
        strokeColor="#d97706"
        unit="°C"
      />

      <AnalyticsChart
        title="Humidity Trend"
        data={forecastData}
        dataKey="humidity"
        strokeColor="#0891b2"
        unit="%"
      />

      <AnalyticsChart
        title="Wind Speed Trend"
        data={forecastData}
        dataKey="wind"
        strokeColor="#059669"
        unit=" m/s"
      />

      <AnalyticsChart
        title="Pressure Trend"
        data={forecastData}
        dataKey="pressure"
        strokeColor="#7c3aed"
        unit=" hPa"
      />
    </>
  );
}

export default WeatherAnalytics;
