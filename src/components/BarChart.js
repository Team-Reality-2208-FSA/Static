import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 5 years",
      },
    },
  };

  const labels = ["2017", "2018", "2019", "2020", "2021"];

  const data = {
    labels,
    datasets: [
      {
        label: "Category goes here",
        data: [30, 20, 40, 13, 50, 35],
        backgroundColor: "#333333",
      },
    ],
  };

  return (
    <>
      <div className="barChart">
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default BarChart;
