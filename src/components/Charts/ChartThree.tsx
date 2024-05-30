import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#4A9D58', '#2f753b', '#8FD0EF'],
  labels: ['Employee', 'Employer', 'Mixed'],
  legend: {
    show: true,
    position: 'bottom',
  },
  plotOptions: {  
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [50, 20, 30], // Updated series to reflect new stats
  });


  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            User Bifercation
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            {/* SVG icon here */}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="legend mx-auto flex justify-center gap-4">
        <div className="legend-item cursor-pointer hover:text-green-600">
          <span className="legend-color bg-green-500"></span>
          <span className="ml-2">Employee</span>
          <span className="ml-2">(50%)</span>
        </div>
        <div className="legend-item cursor-pointer hover:text-orange-600">
          <span className="legend-color bg-orange-500"></span>
          <span className="ml-2">Employer</span>
          <span className="ml-2">(20%)</span>
        </div>
        <div className="legend-item cursor-pointer hover:text-gray-500">
          <span className="legend-color bg-gray-400"></span>
          <span className="ml-2">Mixed</span>
          <span className="ml-2">(30%)</span>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
