import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;

  categories:
    | Array<{ _id: string; name: string; isActive: boolean }>
    | undefined;
}

export const UserActivityModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Employers");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                  <button
                    onClick={() => handleTabChange("alluser")}
                    className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                      activeTab === "alluser"
                        ? "text-blue-600 border-blue-600"
                        : ""
                    }`}
                  >
                    Posted Jobs
                  </button>
                </li>
                <li className="me-2">
                  <button
                    onClick={() => handleTabChange("Employee")}
                    className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                      activeTab === "Employee"
                        ? "text-blue-600 border-blue-600"
                        : ""
                    }`}
                  >
                    Applied Jobs
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
