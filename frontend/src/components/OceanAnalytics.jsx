import AnalyticsChart from "./AnalyticsChart";

function OceanAnalytics({ forecastData = [] }) {
  return (
    <>
      <AnalyticsChart
        title="Wave Height Trend"
        data={forecastData}
        dataKey="waveHeight"
        strokeColor="#0369a1"
        unit="m"
      />

      <AnalyticsChart
        title="Wave Period Trend"
        data={forecastData}
        dataKey="wavePeriod"
        strokeColor="#0ea5e9"
        unit="s"
      />

      <AnalyticsChart
        title="Swell Height Trend"
        data={forecastData}
        dataKey="swellHeight"
        strokeColor="#7c3aed"
        unit="m"
      />

      <AnalyticsChart
        title="Wave Direction Trend"
        data={forecastData}
        dataKey="waveDirection"
        strokeColor="#059669"
        unit="°"
      />
    </>
  );
}

export default OceanAnalytics;
