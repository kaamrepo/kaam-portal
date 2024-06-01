import { useEffect, useState } from "react";
import { ViewUserModal } from "./ViewUserModal";
import useCategoryStore from '../../store/categories.store';

export const UserTable = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Initialize with null
    const {categories,getCategories} = useCategoryStore()

    const openUserModal = (user: User) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };
  
    const closeUserModal = () => {
      setIsModalOpen(false);
    };
    useEffect(()=>{
        getCategories();
      },[])
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-row justify-between align-middle">
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Address
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Edit
            </h5>
          </div>
        </div>

        {users.map((user) => (
          <div
            key={user._id.$oid}
            className="grid grid-cols-4 sm:grid-cols-4 border-b border-stroke dark:border-strokedark"
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0"></div>
              <p className="hidden text-black dark:text-white sm:block">
                {user?.firstname} {user?.lastname}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user?.phone}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user?.address?.city}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button  onClick={() => openUserModal(user)} className="text-blue-600 hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
      <ViewUserModal
      categories={categories}
        isOpen={isModalOpen}
        onClose={closeUserModal}
        user={selectedUser}
        onSubmit={(editedUser: User) => {
          // Handle submitting the edited user data here
          console.log('Edited user:', editedUser);
          // You can make an API call to update the user data
          // Then close the modal
          closeUserModal();
        }}
      />
    </div>
  );
};
