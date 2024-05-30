import React, { useState } from 'react';
import { primaryBGColor } from '../../common/colors';
interface CountData {
  name: string;
  count: number;
}

const useCountData: { [key: string]: CountData[] } = {
  State: [
    { name: 'Google', count: 3.5 },
    { name: 'Twitter', count: 2.2 },
    { name: 'Github', count: 2.1 },
    { name: 'Vimeo', count: 1.5 },
    { name: 'Facebook', count: 3.5 },
  ],
  District: [
    { name: 'District A', count: 1.2 },
    { name: 'District B', count: 2.8 },
    { name: 'District C', count: 1.7 },
    { name: 'District D', count: 3.3 },
    { name: 'District E', count: 2.5 },
  ],
  City: [
    { name: 'City X', count: 0.9 },
    { name: 'City Y', count: 1.5 },
    { name: 'City Z', count: 2.3 },
    { name: 'City W', count: 1.8 },
    { name: 'City V', count: 3.0 },
  ],
};

const TableZoneWiseCount: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'State' | 'District' | 'City'>('State');

  const handleButtonClick = (category: 'State' | 'District' | 'City') => {
    setSelectedCategory(category);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {selectedCategory} Wise User Count
        </h4>
        <div className="space-x-2">
  <button
    className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark`}
    style={{ backgroundColor: selectedCategory === 'State' ? primaryBGColor : 'white', color: selectedCategory === 'State' ? 'white' : 'black' }}
    onClick={() => handleButtonClick('State')}
  >
    State
  </button>
  <button
    className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark`}
    style={{ backgroundColor: selectedCategory === 'District' ? primaryBGColor : 'white', color: selectedCategory === 'District' ? 'white' : 'black' }}
    onClick={() => handleButtonClick('District')}
  >
    District
  </button>
  <button
    className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark`}
    style={{ backgroundColor: selectedCategory === 'City' ? primaryBGColor : 'white', color: selectedCategory === 'City' ? 'white' : 'black' }}
    onClick={() => handleButtonClick('City')}
  >
    City
  </button>
</div>

      </div>

      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            {selectedCategory}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              $Count
            </h5>
          </div>
        </div>

        {useCountData[selectedCategory].map((data: CountData, key: number) => (
          <div
            className={`flex justify-between items-center ${
              key === useCountData[selectedCategory].length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {data.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{data.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableZoneWiseCount;
