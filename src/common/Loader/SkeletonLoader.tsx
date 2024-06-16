import React from "react";
const DefaultLayout = React.lazy(() => import("../../layout/DefaultLayout"));
const SkeletonLoader = () => {
  return ( 
    <DefaultLayout>
      <div className="flex flex-col h-screen p-4 space-y-2 animate-pulse rounded-md">
        <div className="h-10 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-slate-200 "></div>
          <div className="w-1/2 h-full bg-slate-200 "></div>
        </div>
        <div className="h-24 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-slate-200 "></div>
          <div className="w-1/2 h-full bg-slate-200 "></div>
        </div>
        <div className="h-24 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-slate-200 "></div>
          <div className="w-1/2 h-full bg-slate-200 "></div>
        </div>
        <div className="h-18 w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-slate-200 "></div>
          <div className="w-1/2 h-full bg-slate-200 "></div>
        </div>
        <div className="h-48   w-full mx-auto flex space-x-2 rounded-lg">
          <div className="w-1/2 h-full bg-slate-200 "></div>
          <div className="w-1/2 h-full bg-slate-200 "></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SkeletonLoader;
