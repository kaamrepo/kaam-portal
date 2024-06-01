import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { User } from '../../types/user.types'; // Assuming you have a User type
import moment from 'moment';
import useUserStore from '../../store/user.store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSubmit: (editedUser: User) => void;
  categories:
    | Array<{ _id: string; name: string; isActive: boolean }>
    | undefined;
}

export const ViewUserModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  onSubmit,
  categories,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [checkedCategories, setCheckedCategories] = useState<
    Record<string, boolean>
  >({});
  const { patchUser } = useUserStore();
  // Function to handle checkbox change

  // Initialize editedUser with user data
  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
      // Reset checkedCategories when user changes
      setCheckedCategories({});
    }
  }, [user]);
  // Handle form field changes
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value,type } = e.target;
    if (type === 'radio' && name === 'activeforjobs') {
        setEditedUser((prevState) => ({
          ...prevState,
          [name]: value === 'true',
        }));
      } else {
        // Handle other fields
        setEditedUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    // Check if the field is part of the address object
    if (['addressline', 'pincode', 'city', 'district'].includes(name)) {
      setEditedUser((prevState) => ({
        ...prevState,
        address: {
          ...prevState?.address,
          [name]: value,
        },
      }));
    } else {
      // Update other fields including aboutMe
      setEditedUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedUser) {
      const updatedUser = {
        ...editedUser,
        _id:  editedUser._id ,
        createdat: editedUser.createdat,
        updatedat:new Date().toISOString(),
        dob:editedUser.dateofbirth,
        isActiveforJobs:editedUser.activeforjobs,
        otpexpiresat:  editedUser.otpexpiresat,
        categories: Object.keys(checkedCategories)
          .filter(key => checkedCategories[key])
          .map(tagId => ( tagId )),
      };
      await patchUser(updatedUser);
  
      console.log('Payload to be sent to API:', updatedUser);
  
      // Uncomment the line below to submit the form
      // await onSubmit(updatedUser);
    }
  };
  
  useEffect(() => {
    // Initialize checkedCategories based on user tags
    const initialCheckedCategories = {};
    categories.forEach((category) => {
      initialCheckedCategories[category._id] = user?.tags?.some(
        (tag) => tag === category._id,
      );
    });
    setCheckedCategories(initialCheckedCategories);
  }, [user, categories]);
  const handleCheckboxChange = (categoryId) => {
    setCheckedCategories((prevCheckedCategories) => ({
      ...prevCheckedCategories,
      [categoryId]: !prevCheckedCategories[categoryId],
    }));
  };
  const isCategoryChecked = (categoryId) => {
    return !!checkedCategories[categoryId];
  };

  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    First name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={editedUser?.firstname || ''}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* Last Name */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Last name <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={editedUser?.lastname || ''}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* Email */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={editedUser?.email || ''}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* Phone */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    disabled={true}
                    value={editedUser?.phone || ''}
                    readOnly
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/* Date of Birth */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateofbirth"
                    value={moment(user?.dateofbirth).format('YYYY-MM-DD')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Active for Jobs
                  </label>
                  <div className="flex items-center">
                    <label className="mr-2">
                      <input
                        type="radio"
                        name="activeforjobs"
                        value="true"
                        checked={editedUser?.activeforjobs === true}
                        onChange={handleChange}
                      />{' '}
                      Yes
                    </label>
                    <label className="ml-2">
                      <input
                        type="radio"
                        name="activeforjobs"
                        value="false"
                        checked={editedUser?.activeforjobs === false}
                        onChange={handleChange}
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="addressline"
                    placeholder="Enter your address"
                    onChange={handleChange}
                    value={editedUser?.address?.addressline || ''}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter your PIN code"
                    onChange={handleChange}
                    value={editedUser?.address?.pincode || ''}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    onChange={handleChange}
                    value={editedUser?.address?.city || ''}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    placeholder="Enter your district"
                    onChange={handleChange}
                    value={editedUser?.address?.district || ''}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                </div>
                <div className="mb-4.5 col-span-3">
                  <label className="mb-2.5 block text-black dark:text-white w-full">
                    About {editedUser?.firstname} {editedUser?.lastname}
                  </label>
                  <textarea
                    name="aboutMe"
                    rows={6}
                    placeholder="Type your message"
                    onChange={handleChange}
                    value={editedUser?.aboutMe || ''}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                </div>

                {/* Categories Checkboxes */}
                <div className="mb-4.5 col-span-3">
                  <div className="mb-4.5 col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categories &&
                        categories.map((category) => (
                          <div key={category._id}>
                            <label className="block text-black dark:text-white">
                              <input
                                type="checkbox"
                                id={`category-${category._id}`}
                                name={`category-${category._id}`}
                                checked={isCategoryChecked(category._id)}
                                onChange={() =>
                                  handleCheckboxChange(category._id)
                                }
                                className="mr-2 leading-tight"
                              />
                              <span>{category.name}</span>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="col-span-3 w-full rounded bg-primaryBGColor p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
