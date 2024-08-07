import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import useUserStore from "../../store/user.store";
import { UserTable } from "./UserTable";
import useLoginStore from "../../store/login.store";
const Users = () => {
  const { getUser } = useUserStore();
  const { loggedInUserId } = useLoginStore();
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const searchOn: any = {
      excludeIds: loggedInUserId,
      isActive: true,
      ...(tab !== "ALL" && { roleId: tab }), // Add roleId if not "ALL"
    };
    getUser({
      skip: 0,
      limit: 10,
      searchOn,
    });
  };
  return (
    <DefaultLayout>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => handleTabChange("ALL")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "ALL" ? "text-blue-600 border-blue-600" : ""
              }`}
            >
              All Users
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange("KAAM_EMPLOYEE")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "KAAM_EMPLOYEE"
                  ? "text-blue-600 border-blue-600"
                  : ""
              }`}
            >
              Employee
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange("KAAM_EMPLOYER")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "KAAM_EMPLOYER"
                  ? "text-blue-600 border-blue-600"
                  : ""
              }`}
            >
              Employer
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange("KAAM_ADMIN")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "KAAM_ADMIN"
                  ? "text-blue-600 border-blue-600"
                  : ""
              }`}
            >
              KaamPe Admins
            </button>
          </li>
        </ul>
      </div>

      {/* Search input */}
      <div className="mt-3 w-100 mb-2.5 flex text-black dark:text-white">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full border px-4 py-2 bg-white border-stroke bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value !== "") {
              setSearchTerm(e.target.value);
            } else {
              setSearchTerm("");
              getUser({
                skip: 0,
                limit: 10,
                searchOn: { excludeIds: loggedInUserId, isActive: true },
              });
            }
          }}
        />
      </div>
      <UserTable searchInput={searchTerm} roleId={activeTab} />
    </DefaultLayout>
  );
};

export default Users;
