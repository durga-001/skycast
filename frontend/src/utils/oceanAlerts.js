export const generateOceanAlerts = (hourly = []) => {
  const alerts = [];

  hourly.slice(0, 8).forEach((item) => {
    const waveHeight = item.waveHeight;
    if (waveHeight == null) return;

    const time = item.time
      ? new Date(item.time).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      : "";

    if (waveHeight >= 6) {
      alerts.push({
        type: "storm",
        severity: "danger",
        message: `Very high waves (${waveHeight.toFixed(1)}m) expected around ${time}. Avoid sailing.`,
      });
    } else if (waveHeight >= 2.5) {
      alerts.push({
        type: "wind",
        severity: "warning",
        message: `Rough seas (${waveHeight.toFixed(1)}m waves) expected around ${time}.`,
      });
    }
  });

  return [...new Map(alerts.map((a) => [a.message, a])).values()];
};
