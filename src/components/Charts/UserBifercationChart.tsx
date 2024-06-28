import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useDashboardStore from '../../store/Dashboard.store';
import { ApexOptions } from 'apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#615EFC', '#9B4444', '#124076'],
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
  const { userBifercation, getUserBifercationStats } = useDashboardStore();
  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0, 0],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUserBifercationStats();
      setIsLoaded(true); // Set the loading flag to true after data is fetched
    };
    fetchData();
  }, [getUserBifercationStats]);

  useEffect(() => {
    if (isLoaded) { // Update state only after data is loaded
      setState({
        series: [
          userBifercation?.employee || 0,
          userBifercation?.employer || 0,
          userBifercation?.mixed || 0,
        ],
      });
    }
  }, [isLoaded, userBifercation]);

  console.log("userBifercation", userBifercation);
  console.log("state", state);

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
          <span className="ml-2">{userBifercation?.employee || 0}%</span>
        </div>
        <div className="legend-item cursor-pointer hover:text-orange-600">
          <span className="legend-color bg-orange-500"></span>
          <span className="ml-2">Employer</span>
          <span className="ml-2">{userBifercation?.employer || 0}%</span>
        </div>
        <div className="legend-item cursor-pointer hover:text-gray-500">
          <span className="legend-color bg-gray-400"></span>
          <span className="ml-2">Mixed</span>
          <span className="ml-2">{userBifercation?.mixed || 0}%</span>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
