import React from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css'; // Ensure you have the default styles

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any | null; // Adjust type based on your project structure
}

export const ApprovalModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  console.log("user in the modal",user);
  
  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="p-4 w-full max-w-3xl mx-auto">
        <div className="bg-white rounded shadow dark:bg-boxdark">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Approval Details</h2>
          </div>
          <div className="p-4">
            {user && (
              <>
                <p>Name: {`${user.userDetails.firstname} ${user.userDetails.lastname}`}</p>
                <p>Phone: {user.userDetails.phone}</p>
                <p>Available Postings: {user.userDetails.allowedjobposting}</p>
                <p>Requested Postings: {user.requestedjobposting || 0}</p>
                <p>Available Applications: {user.userDetails.allowedjobapplication}</p>
                <p>Requested Applications: {user.requestedjobapplication || 0}</p>
                test
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
