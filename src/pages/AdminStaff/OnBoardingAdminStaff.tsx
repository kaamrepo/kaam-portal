import { useState, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../../store/user.store";
import { User } from "../../types/user.types";
const OnBoardingAdminStaff = () => {
  const [cities, setCities] = useState([]);
  const { createStaffUser } = useUserStore();
  const navigate = useNavigate();
  const getAddressDataByZIPCode = async (
    zipCode: string,
    setValue: any,
    setCities: any
  ) => {
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${zipCode}`
      );
      if (res.data[0].Status === "Success") {
        setValue("district", res.data[0]?.PostOffice[0]?.District);
        setValue("state", res.data[0]?.PostOffice[0]?.State);
        setValue("country", res.data[0]?.PostOffice[0]?.Country);

        let placeSet = new Set();
        res.data[0]?.PostOffice.forEach(
          (p: { Block: string; Division: string }) => {
            placeSet.add(p?.Block);
            placeSet.add(p?.Division);
          }
        );

        setCities(Array.from(placeSet).map((d) => ({ label: d, value: d })));
      } else {
        toast.error("Invalid ZIP Code.");
      }
    } catch (error) {
      toast.error("Invalid ZIP Code.");
    }
  };

  const handlePinCodeChange = async (e: any) => {
    const { value } = e.target;
    setValue("pincode", value);
    if (value && value.length === 6) {
      await getAddressDataByZIPCode(value, setValue, setCities);
    }
  };
  const validationSchema = yup.object({
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    dialcode: yup.string(),
    email: yup.string().email("Invalid email address"),
    role: yup
      .string()
      .oneOf(["employer", "employee"], "Invalid role")
      .required("Role is required"),
    dateofbirth: yup.date().required("Date of birth is required"),
    address: yup.string().required("Address is required"),
    pincode: yup.string().required("PIN code is required"),
    city: yup.string().required("City is required"),
    district: yup.string().required("District is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Gender is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      role: "employee",
      firstname: "",
      lastname: "",
      dateofbirth: new Date(),
      address: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
      country: "",
      gender: "male",
      phone: "",
      dialcode: "91",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: any) => {
    const user: User = {
      phone: values.phone,
      dialcode: "91",
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      dateofbirth: values.dateofbirth,
      isactive: true,
      address: {
        addressline: values.address,
        pincode: values.pincode,
        district: values.district,
        city: values.city,
        state: values.state,
        country: values.country,
      },
      gender: values.gender,
      role: values.role,
    };
    const response = await createStaffUser(user);
    if (response.status) {
      toast.success("New Staff Added Successfully");
      navigate("/action/users");
    } else {
      toast.error("Error while adding new staff");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="OnBoard admin" />
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      {...register("firstname")}
                      placeholder="Enter your first name"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.firstname ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstname && (
                      <div className="text-red-500">
                        {errors.firstname.message}
                      </div>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      {...register("lastname")}
                      placeholder="Enter your last name"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.lastname ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastname && (
                      <div className="text-red-500">
                        {errors.lastname.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="mb-4.5 flex flex-col gap-2 xl:flex-row">
                    <div className="w-full xl:w-1/4">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Dialcode
                      </label>
                      <input
                        type="text"
                        defaultValue={"🇮🇳 +91"}
                        disabled
                        placeholder="Enter country code"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary `}
                      />
                    </div>

                    <div className="w-full xl:w-3/4">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Phone number must be 10 digits",
                          },
                        })}
                        placeholder="Enter phone number"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <div className="text-red-500">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <div className="text-red-500">{errors.email.message}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Role
                  </label>
                  <select
                    {...register("role")}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.role ? "border-red-500" : ""
                    }`}
                  >
                    <option value="employee">Employee</option>
                    <option value="employer">Employer</option>
                  </select>
                  {errors.role && (
                    <div className="text-red-500">{errors.role.message}</div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("dateofbirth")}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.dateofbirth ? "border-red-500" : ""
                    }`}
                  />
                  {errors.dateofbirth && (
                    <div className="text-red-500">
                      {errors.dateofbirth.message}
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Enter your address"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.address ? "border-red-500" : ""
                    }`}
                  />
                  {errors.address && (
                    <div className="text-red-500">{errors.address.message}</div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    {...register("pincode")}
                    placeholder="Enter your PIN code"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      errors.pincode ? "border-red-500" : ""
                    }`}
                    onChange={handlePinCodeChange}
                  />
                  {errors.pincode && (
                    <div className="text-red-500">{errors.pincode.message}</div>
                  )}
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            errors.city ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Select your city</option>
                          {cities.map(
                            (city: { label: string; value: string }, index) => (
                              <option key={index} value={city.value}>
                                {city.label}
                              </option>
                            )
                          )}
                        </select>
                      )}
                    />
                    {errors.city && (
                      <div className="text-red-500">{errors.city.message}</div>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      District
                    </label>
                    <input
                      type="text"
                      {...register("district")}
                      placeholder="Enter your district"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.district ? "border-red-500" : ""
                      }`}
                    />
                    {errors.district && (
                      <div className="text-red-500">
                        {errors.district.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      State
                    </label>
                    <input
                      type="text"
                      {...register("state")}
                      placeholder="Enter your state"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.state ? "border-red-500" : ""
                      }`}
                    />
                    {errors.state && (
                      <div className="text-red-500">{errors.state.message}</div>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Country
                    </label>
                    <input
                      type="text"
                      {...register("country")}
                      placeholder="Enter your country"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        errors.country ? "border-red-500" : ""
                      }`}
                    />
                    {errors.country && (
                      <div className="text-red-500">
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Gender
                  </label>
                  <div className="flex items-center">
                    <label className="mr-2">
                      <input
                        type="radio"
                        {...register("gender")}
                        value="male"
                        className={`${errors.gender ? "border-red-500" : ""}`}
                      />{" "}
                      Male
                    </label>
                    <label className="ml-2">
                      <input
                        type="radio"
                        {...register("gender")}
                        value="female"
                        className={`${errors.gender ? "border-red-500" : ""}`}
                      />{" "}
                      Female
                    </label>
                    <label className="ml-2">
                      <input
                        type="radio"
                        {...register("gender")}
                        value="other"
                        className={`${errors.gender ? "border-red-500" : ""}`}
                      />{" "}
                      Other
                    </label>
                  </div>
                  {errors.gender && (
                    <div className="text-red-500">{errors.gender.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OnBoardingAdminStaff;
