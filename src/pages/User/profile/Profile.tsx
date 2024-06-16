import DefaultLayout from "../../../layout/DefaultLayout";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { toAbsoluteUrl } from "../../../common/RouteGuard";
import React, { useState } from "react";
const PostedJobs = React.lazy(() => import("./Tab/PostedJob"));
const AppliedJobs = React.lazy(() => import("./Tab/AppliedJob"));
const EditProfile = React.lazy(() => import("./Tab/EditProfile"));

const Profile = () => {
  const [activeTab, setActiveTab] = useState("applied-jobs");
  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Profile" />
      <div className="flex flex-col bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none  rounded-md border-1 border-slate-50 shadow-sm">
        <div className="h-56 w-full flex flex-row p-6 space-x-4">
          <div className="w-44 h-44 border-2 border-slate-300 rounded-lg">
            <img
              src={toAbsoluteUrl("/media/300-1.jpg")}
              alt="profile"
              className="w-full h-full"
            />
          </div>
          <div className="w-[88%] h-44 rounded-lg">
            <div className="h-22 flex justify-between items-start flex-wrap">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <a
                    href="#"
                    className="text-gray-800 hover:text-primary text-2xl font-bold mr-1"
                  >
                    Akshay Naik
                  </a>
                  <a href="#" className="w- h-8">
                    <img
                      // src={toAbsoluteUrl("/media/svgs/verify-svgrepo-com.svg")}
                      src={toAbsoluteUrl(
                        "/media/svgs/verify-svgrepo-com_new_gray.svg"
                      )}
                      alt="profile"
                      className="w-full h-full"
                    />
                  </a>
                  <a
                    href="#"
                    className="btn btn-sm bg-light-success font-bold text-xs py-1 px-3 ml-2"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_upgrade_plan"
                  >
                    Upgrade to Pro
                  </a>
                </div>
                <div className="flex flex-wrap font-bold text-sm mb-4 pr-2">
                  <a
                    href="#"
                    className="flex items-center text-gray-400 hover:text-primary mr-5 mb-2"
                  >
                    <span className="w-5 h-5 mr-1">
                      <img
                        src={toAbsoluteUrl("/media/svgs/phone-svgrepo-com.svg")}
                        alt="phone"
                      />
                    </span>
                    +91 8552049006
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-gray-400 hover:text-primary mr-5 mb-2"
                  >
                    <span className="w-4 h-4 mr-1">
                      <img
                        src={toAbsoluteUrl(
                          "/media/svgs/location-pin-svgrepo-com.svg"
                        )}
                        alt="location"
                      />
                    </span>
                    SF, Bay Area
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-gray-400 hover:text-primary mb-2"
                  >
                    <span className="w-4 h-4 mr-1">
                      <img
                        src={toAbsoluteUrl("/media/svgs/email-svgrepo-com.svg")}
                        alt="email"
                      />
                    </span>
                    max@kt.com
                  </a>
                </div>
              </div>
            </div>
            <div className="h-22 flex flex-wrap justify-between">
              <div className="flex flex-col flex-grow pr-6">
                <div className="flex flex-wrap">
                  <div className="border border-gray-300 border-dashed rounded min-w-[125px] py-3 px-4 mr-6 mb-3">
                    <div className="flex items-center">
                      <span className="w-5 h-5 mr-1">
                        <img
                          src={toAbsoluteUrl(
                            "/media/svgs/work-svgrepo-com.svg"
                          )}
                          alt="location"
                        />
                      </span>
                      <div className="text-2xl font-bold">100%</div>
                    </div>
                    <div className="font-bold text-gray-400 text-sm">
                      Posted Jobs
                    </div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-[125px] py-3 px-4 mr-6 mb-3">
                    <div className="flex items-center">
                      <span className="w-5 h-5 mr-1">
                        <img
                          src={toAbsoluteUrl(
                            "/media/svgs/work-svgrepo-com.svg"
                          )}
                          alt="location"
                        />
                      </span>
                      <div className="text-2xl font-bold">100%</div>
                    </div>
                    <div className="font-bold text-gray-400 text-sm">
                      Applied Jobs
                    </div>
                  </div>
                  <div className="border border-gray-300 border-dashed rounded min-w-[125px] py-3 px-4 mr-6 mb-3">
                    <div className="flex items-center">
                      <span className="w-5 h-5 mr-1">
                        <img
                          src={toAbsoluteUrl(
                            "/media/svgs/work-svgrepo-com.svg"
                          )}
                          alt="location"
                        />
                      </span>
                      <div className="text-2xl font-bold">100%</div>
                    </div>
                    <div className="font-bold text-gray-400 text-sm">
                      In review
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-[200px] sm:w-[300px] mt-3">
                <div className="flex justify-between w-full mt-auto">
                  <span className="font-bold text-sm text-gray-400">
                    Profile Completion
                  </span>
                  <span className="font-bold text-sm">80%</span>
                </div>
                <div className="h-1 mx-3 w-full bg-slate-500 mb-3">
                  <div
                    className="bg-green-500 rounded h-1"
                    role="progressbar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-8 mb-2 px-6">
          <div className="flex overflow-auto h-14">
            <ul className="flex space-x-6 text-lg font-bold border-b-2 border-transparent">
              <li className="flex-shrink-0">
                <button
                  className={`pb-2 text-sm ${
                    activeTab === "applied-jobs"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-800 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("applied-jobs")}
                >
                  Applied Jobs
                </button>
              </li>
              <li>|</li>
              <li className="flex-shrink-0">
                <button
                  className={`pb-2 text-sm ${
                    activeTab === "posted-jobs"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-800 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("posted-jobs")}
                >
                  Posted Jobs
                </button>
              </li>

              <li>|</li>
              <li className="flex-shrink-0">
                <button
                  className={`pb-2 text-sm ${
                    activeTab === "edit-profile"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-800 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("edit-profile")}
                >
                  Edit Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-6">
        {activeTab === "posted-jobs" && <PostedJobs />}
        {activeTab === "applied-jobs" && <AppliedJobs />}
        {activeTab === "edit-profile" && <EditProfile />}
      </div>
    </DefaultLayout>
  );
};

export default Profile;
