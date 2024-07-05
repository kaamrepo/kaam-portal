import { useState } from "react";
import { ApprovalTable } from "./ApprovalTable";
import DefaultLayout from '../../layout/DefaultLayout'

 const Approvals = () => {
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
             Incremental Approvals
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
              // getUser({
              //   skip: 0,
              //   limit: 10,
              //   searchOn: { excludeIds: user._id, isActive: true },
              // });
            }
          }}
        />
      </div>
      <ApprovalTable searchInput={searchTerm} />
    </DefaultLayout>
  )
}
export default Approvals;

