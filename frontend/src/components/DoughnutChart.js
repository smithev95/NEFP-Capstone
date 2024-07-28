import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DoughnutChart = ({ chartData }) => {
  const data = {
    labels: Object.keys(chartData),
    datasets: [{
      data: Object.values(chartData),
      backgroundColor: [
        'rgba(255, 50, 150, 0.75)',
        'rgba(50, 150, 230, 0.75)',
        'rgba(255, 205, 90, 0.75)',
        'rgba(75, 200, 200, 0.75)',
        'rgba(150, 50, 200, 0.75)',
        'rgba(255, 170, 60, 0.75)',
      ],
      borderColor: [
        'rgba(255, 255, 255, 1.2)',
        'rgba(50, 150, 230, 1.2)',
        'rgba(255, 205, 90, 1.2)',
        'rgba(75, 200, 200, 1.2)',
        'rgba(150, 50, 200, 1.2)',
        'rgba(255, 170, 60, 1.2)',
      ],
      borderWidth: 1
    }]
  };

  return (
    <div>
      <Doughnut data={data}/>
    </div>
  );
};

export default DoughnutChart;