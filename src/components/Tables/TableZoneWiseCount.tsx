import React, { useEffect, useState } from 'react';
import useDashboardStore from '../../store/Dashboard.store';
import { CountData } from '../../types/dashboard.types'; // Ensure this type is imported correctly

const TableZoneWiseCount: React.FC = () => {
  const { getLocationStats, locationData } = useDashboardStore();
  const [selectedCategory, setSelectedCategory] = useState<'State' | 'District' | 'City'>('State');

  useEffect(() => {
    getLocationStats();
  }, []);

  const handleButtonClick = (category: 'State' | 'District' | 'City') => {
    setSelectedCategory(category);
  };

  // Determine which data to display based on selectedCategory
  const getCountData = (): CountData[] => {
    switch (selectedCategory) {
      case 'State':
        return locationData.state
          ? Object.entries(locationData.state).map(([state, count]) => ({
              name: state,
              count: count,
            }))
          : [];
      case 'City':
        return locationData.city
          ? Object.entries(locationData.city).map(([city, count]) => ({
              name: city,
              count: count,
            }))
          : [];
      case 'District':
        return locationData.district
          ? Object.entries(locationData.district).map(([district, count]) => ({
              name: district,
              count: count,
            }))
          : [];
      default:
        return [];
    }
  };

  // Total count based on selectedCategory
  const getTotalCount = (): number => {
    switch (selectedCategory) {
      case 'State':
        return locationData.totalStateCount ?? 0;
      case 'City':
        return locationData.totalCityCount ?? 0;
      case 'District':
        return locationData.totalDistrictCount ?? 0;
      default:
        return 0;
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {selectedCategory} Wise User Count
        </h4>
        <div className="space-x-2">
          <button
            className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark ${
              selectedCategory === 'State' ? 'bg-primaryBGColor text-white' : ''
            }`}
            onClick={() => handleButtonClick('State')}
          >
            State
          </button>

          <button
            className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark ${
              selectedCategory === 'District' ? 'bg-primaryBGColor text-white' : ''
            }`}
            onClick={() => handleButtonClick('District')}
          >
            District
          </button>

          <button
            className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark ${
              selectedCategory === 'City' ? 'bg-primaryBGColor text-white' : ''
            }`}
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
              Count: {getTotalCount()}
            </h5>
          </div>
        </div>

        {getCountData().map((data: CountData, key: number) => (
          <div
            className={`flex justify-between items-center ${
              key === getCountData().length - 1
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
