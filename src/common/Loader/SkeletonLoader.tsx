import React from "react";
const DefaultLayout = React.lazy(() => import("../../layout/DefaultLayout"));
const SkeletonLoader = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col h-screen p-4 space-y-2 animate-pulse rounded-md">
        <div className="h-10 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
        </div>
        <div className="h-24 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
        </div>
        <div className="h-24 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
        </div>
        <div className="h-18 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
        </div>
        <div className="h-48   w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
          <div className="w-1/2 h-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SkeletonLoader;
