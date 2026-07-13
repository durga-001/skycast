import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function AnalyticsChart({ title, data, dataKey, strokeColor, unit }) {
  const chartData = useMemo(
    () => ({
      labels: data.map((item) => item.time),

      datasets: [
        {
          label: title,
          data: data.map((item) => item[dataKey]),
          borderColor: strokeColor,
          backgroundColor: strokeColor,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
      ],
    }),
    [title, data, dataKey, strokeColor],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: "index",
        intersect: false,
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label(context) {
              return `${context.parsed.y}${unit}`;
            },
          },
        },
      },

      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
          },
        },

        y: {
          title: {
            display: true,
            text: unit,
          },
          beginAtZero: false,
        },
      },
    }),
    [unit],
  );

  return (
    <div className="analytics-card">
      <h3>{title}</h3>

      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default AnalyticsChart;
