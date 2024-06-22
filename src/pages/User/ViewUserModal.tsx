import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { User } from "../../types/user.types"; // Assuming you have a User type
import moment from "moment";
import useUserStore from "../../store/user.store";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  categories:
    | Array<{ _id: string; name: string; isActive: boolean }>
    | undefined;
}

export const ViewUserModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  categories,
}) => {
  const { patchUser } = useUserStore();
  const { control, handleSubmit, reset, setValue } = useForm<User>({
    defaultValues: {
      _id: "",
      phone: "",
      dialcode: "",
      firstname: "",
      lastname: "",
      email: "",
      otp: "",
      otpexpiresat: "",
      createdat: "",
      updatedat: "",
      isactive: false,
      aboutme: "",
      dateofbirth: "",
      address: {
        addressline: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
        country: "",
      },
      location: {
        type: "Point",
        coordinates: [0, 0],
        fulladdress: "",
        pincode: "",
        district: "",
        city: "",
        state: "",
        country: "",
      },
      firebasetokens: [],
      profilepic: "",
      activeforjobs: false,
      allowedjobposting: 0,
      allowedjobapplication: 0,
      tags: [],
      experience: [
        {
          about: "",
          employer: "",
          year: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  const [checkedCategories, setCheckedCategories] = useState<
    Record<string, boolean>
  >({});
  0.2;
  useEffect(() => {
    if (user) {
      reset({
        ...user,
        dateofbirth: moment(user.dateofbirth).format("YYYY-MM-DD"),
      });
      const initialCheckedCategories: any = {};
      categories?.forEach((category) => {
        initialCheckedCategories[category?._id] = user?.tags?.some(
          (tag: any) => tag === category._id
        );
      });
      setCheckedCategories(initialCheckedCategories);
    }
  }, [user, categories, reset]);

  const onSubmit = async (data: User) => {
    const updatedUser: any = {
      ...data,
      _id: user?._id,
      createdat: user?.createdat,
      updatedat: new Date().toISOString(),
      dateofbirth: new Date(data.dateofbirth),
      otpexpiresat: user?.otpexpiresat,
      allowedjobposting: Number(data.allowedjobposting),
      allowedjobapplication: Number(data.allowedjobapplication),
      address: data.address,
    };
    delete updatedUser.tagsDetails;
    const response = await patchUser(updatedUser);
    if (response.status === true) {
      toast.success("User Updated Successfully");
    }
    onClose();
  };

  const handleCheckboxChange = (categoryId: any) => {
    setCheckedCategories((prevCheckedCategories) => ({
      ...prevCheckedCategories,
      [categoryId]: !prevCheckedCategories[categoryId],
    }));
  };
  const isCategoryChecked = (categoryId: any) => {
    return !!checkedCategories[categoryId];
  };
  return (
    <Modal open={isOpen} onClose={onClose} center>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    First name <span className="text-red">*</span>
                  </label>
                  <Controller
                    name="firstname"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field, fieldState }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                </div>
                {/* Last Name */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Last name <span className="text-red">*</span>
                  </label>
                  <Controller
                    name="lastname"
                    control={control}
                    rules={{ required: "Last name is required" }}
                    render={({ field, fieldState }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                </div>
                {/* Email */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field, fieldState }) => (
                      <input
                        {...field}
                        type="text"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      />
                    )}
                  />
                </div>
                {/* Phone */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        disabled
                        readOnly
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                {/* Date of Birth */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date of Birth
                  </label>
                  <Controller
                    name="dateofbirth"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="w-full"></div>
                <p> Address and other details</p>
                <div className="w-full"></div>
                <div className="w-full"></div>
                {/* Address Fields */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <Controller
                    name="address.addressline"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your address"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    PIN Code
                  </label>
                  <Controller
                    name="address.pincode"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your PIN code"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    City
                  </label>
                  <Controller
                    name="address.city"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your city"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="mb-4.5 ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    District
                  </label>
                  <Controller
                    name="address.district"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your district"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Country
                  </label>
                  <Controller
                    name="address.country"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your caddress country"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="w-full"></div>
                <p> Allow posting and applications</p>
                <div className="w-full"></div>
                <div className="w-full"></div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Allow job posting
                  </label>
                  <Controller
                    name="allowedjobposting"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your caddress country"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Allow job applications
                  </label>
                  <Controller
                    name="allowedjobapplication"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your caddress country"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Active for Jobs
                  </label>
                  <div className="flex items-center">
                    <Controller
                      name="activeforjobs"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label className="mr-2">
                            <input
                              type="radio"
                              value="true"
                              checked={field.value === true}
                              onChange={() => setValue("activeforjobs", true)}
                            />{" "}
                            Yes
                          </label>
                          <label className="ml-2">
                            <input
                              type="radio"
                              value="false"
                              checked={field.value === false}
                              onChange={() => setValue("activeforjobs", false)}
                            />{" "}
                            No
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="mb-4.5 col-span-3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Experience
                  </label>
                  {fields.map((experience, index) => (
                    <div
                      key={experience.id}
                      className="mb-4 p-4 bg-gray-100 rounded"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <label className="mb-2.5 block text-black dark:text-white">
                            About
                          </label>
                          <Controller
                            name={`experience.${index}.about`}
                            control={control}
                            render={({ field }) => (
                              <input
                                type="text"
                                {...field}
                                placeholder="Describe the experience"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Employer
                          </label>
                          <Controller
                            name={`experience.${index}.employer`}
                            control={control}
                            render={({ field }) => (
                              <input
                                type="text"
                                {...field}
                                placeholder="Enter the employer name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Year
                          </label>
                          <Controller
                            name={`experience.${index}.year`}
                            control={control}
                            render={({ field }) => (
                              <input
                                type="text"
                                {...field}
                                placeholder="Enter the year"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            )}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-full mt-2 rounded bg-red-500 py-2 text-white transition hover:bg-red-600 focus:outline-none"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="w-full mt-2 rounded bg-primary py-2 text-white transition hover:bg-primary-dark focus:outline-none"
                    onClick={() =>
                      append({ about: "", employer: "", year: "" })
                    }
                  >
                    Add Experience
                  </button>
                </div>

                <div className="mb-4.5 col-span-3">
                  <label className="mb-2.5 block text-black dark:text-white w-full">
                    About {user?.firstname} {user?.lastname}
                  </label>
                  <Controller
                    name="aboutme"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={6}
                        placeholder="Type your message"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
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
