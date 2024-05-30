import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { primaryBGColor } from '../../common/colors';
const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface RegistrationProgressionChartState {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const RegistrationProgressionChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Day' | 'Week' | 'Month'>('Month');
  const [state, setState] = useState<RegistrationProgressionChartState>({
    series: [
      {
        name: 'User Registration',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },
    ],
    categories: [
      'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'
    ],
  });

  const handleTimeframeChange = (newTimeframe: 'Day' | 'Week' | 'Month') => {
    let newSeriesData: number[] = [];
    let newCategories: string[] = [];

    switch (newTimeframe) {
      case 'Day':
        newSeriesData = [3, 5, 2, 8, 1, 4, 7, 6, 5, 4, 3, 2];
        newCategories = [
          '01 May', '02 May', '03 May', '04 May', '05 May', '06 May', 
          '07 May', '08 May', '09 May', '10 May', '11 May', '12 May'
        ];
        break;
      case 'Week':
        newSeriesData = [23, 21, 25, 27, 22, 28, 24, 23, 26, 25, 27, 28];
        newCategories = [
          'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 
          'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'
        ];
        break;
      case 'Month':
        newSeriesData = [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45];
        newCategories = [
          'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'
        ];
        break;
    }

    setTimeframe(newTimeframe);
    setState({
      series: [
        {
          name: 'User Registration',
          data: newSeriesData,
        },
      ],
      categories: newCategories,
    });
  };

  return (
    <div className="col-span-12 xl:col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-semibold text-black dark:text-white">Total User Registration</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
        <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 space-x-2">
  <button
    className="rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
    style={{ backgroundColor: timeframe === 'Day' ? primaryBGColor : 'white', color: timeframe === 'Day' ? 'white' : 'black' }}
    onClick={() => handleTimeframeChange('Day')}
  >
    Day
  </button>
  <button
    className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
    style={{ backgroundColor: timeframe === 'Week' ? primaryBGColor : 'white', color: timeframe === 'Week' ? 'white' : 'black' }}
    onClick={() => handleTimeframeChange('Week')}
  >
    Week
  </button>
  <button
    className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
    style={{ backgroundColor: timeframe === 'Month' ? primaryBGColor : 'white', color: timeframe === 'Month' ? 'white' : 'black' }}
    onClick={() => handleTimeframeChange('Month')}
  >
    Month
  </button>
</div>

</div>

      </div>

      <div>
        <div id="RegistrationProgressionChart" className="-ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { ...options.xaxis, categories: state.categories } }}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationProgressionChart;
