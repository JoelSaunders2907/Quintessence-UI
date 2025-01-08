import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ProcessPerformanceData } from '../../../types/performance';
import { ScaleUnit } from '../ScaleControl';
import { tailwindToRgb } from './utils/colors';
import { PROCESS_COLORS } from './ProcessBars';
import { getUniqueDates } from '../../../utils/performanceData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceViewProps {
  data: ProcessPerformanceData;
  scaleUnit: ScaleUnit;
  maxScale: number;
}

export function PerformanceView({
  data,
  scaleUnit,
  maxScale
}: PerformanceViewProps) {
  const dates = getUniqueDates(data);
  
  const chartData = {
    labels: dates,
    datasets: Object.entries(data).map(([process, dateData], index) => ({
      label: process,
      data: dates.map(date => dateData[date]?.duration || null),
      borderColor: tailwindToRgb(PROCESS_COLORS[index % PROCESS_COLORS.length]),
      backgroundColor: 'transparent',
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8
    }))
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: maxScale,
        title: {
          display: true,
          text: scaleUnit === 'minutes' ? 'Duration (minutes)' : 'Duration (hours)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  return (
    <div className="h-[500px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}