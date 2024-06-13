import { useState, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import useUserStore from "../../store/user.store";
import { UserTable } from "./UserTable";
import useLoginStore from "../../store/login.store";
export const Users = () => {
  const { getUser } = useUserStore();
  const { user } = useLoginStore();
  const [activeTab, setActiveTab] = useState("Employers");
  const [searchTerm, setSearchTerm] = useState("");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <DefaultLayout>
      {/* Tabs */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => handleTabChange("alluser")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "alluser" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              All Users
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange("Employee")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "Employee" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              Employee
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange("Employer")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "Employer" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              Employer
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange("Mixed")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "Mixed" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              Mixed
            </button>
          </li>
        </ul>
      </div>

      {/* Search input */}
      <div className="mt-3 w-100 mb-2.5 flex text-black dark:text-white">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value !== "") {
              setSearchTerm(e.target.value);
            } else {
              setSearchTerm("");
              getUser({
                skip: 0,
                limit: 10,
                searchOn: { excludeIds: user._id, isActive: true },
              });
            }
          }}
        />
      </div>
      <UserTable searchInput={searchTerm} />
    </DefaultLayout>
  );
};
