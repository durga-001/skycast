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
  const chartData = {
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
  };

  const options = {
    responsive: true,

    interaction: {
      mode: "index",
      intersect: false, // hover anywhere on chart
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
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
  };

  return (
    <div className="analytics-card">
      <h3>{title}</h3>

      <Line data={chartData} options={options} />
    </div>
  );
}

export default AnalyticsChart;
