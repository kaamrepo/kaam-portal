import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css'; // Ensure you have the default styles
import { PostedJobs } from "./Components/PostedJobs";
import { AppliedJobs } from "./Components/AppliedJobs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  categories:
    | Array<{ _id: string; name: string; isActive: boolean }>
    | undefined;
}

export const UserActivityModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState("PostedJobs");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="p-4 w-full max-w-3xl mx-auto">
        <div className="bg-white rounded shadow dark:bg-boxdark">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex justify-center">
              <li className="mr-2">
                <button
                  onClick={() => handleTabChange("PostedJobs")}
                  className={`inline-block p-4 border-b-2 ${
                    activeTab === "PostedJobs"
                      ? "text-blue-600 border-blue-600"
                      : "border-transparent"
                  } hover:text-gray-600 dark:hover:text-gray-300`}
                >
                  Posted Jobs
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => handleTabChange("AppliedJobs")}
                  className={`inline-block p-4 border-b-2 ${
                    activeTab === "AppliedJobs"
                      ? "text-blue-600 border-blue-600"
                      : "border-transparent"
                  } hover:text-gray-600 dark:hover:text-gray-300`}
                >
                  Applied Jobs
                </button>
              </li>
            </ul>
          </div>
          <div className="p-4">
            {activeTab === "PostedJobs" && <PostedJobs user={user} />}
            {activeTab === "AppliedJobs" && <AppliedJobs user={user} />}
          </div>
        </div>
      </div>
    </Modal>
  );
};
