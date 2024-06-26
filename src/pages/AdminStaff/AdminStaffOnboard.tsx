

import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import useLoginStore from '../../store/login.store';
import toast from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import useCategoryStore from '../../store/categories.store';
import useUserStore from '../../store/user.store';
import axios from 'axios';
const AdminStaffOnboard = () => {
  const { getOtp, verifyOtp, registerUser } = useLoginStore();
  const [phone, setphone] = useState('');
  const [registeredUser, setregisteredUser] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const { getCategories, categories} = useCategoryStore();
  const {patchUser} = useUserStore();
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (otpVerified) {
      // Fetch categories once OTP is verified
      console.log("categories",categories);
      
      fetchCategories();
    }
  }, [otpVerified]);
  const getAddressDateByZIPCode = async (zipCode, setFieldValue, setCities) => {
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${zipCode}`,
      );
      console.log('pin code response', res);

      if (res.data[0].Status === 'Success') {
        setFieldValue('district', res.data[0]?.PostOffice[0]?.District);
        setFieldValue('state', res.data[0]?.PostOffice[0]?.State);
        setFieldValue('country', res.data[0]?.PostOffice[0]?.Country);

        let placeSet = new Set();
        res.data[0]?.PostOffice.forEach((p) => {
          placeSet.add(p?.Block);
          placeSet.add(p?.Division);
        });

        setCities(Array.from(placeSet).map((d, i) => ({ label: d, value: d })));
      } else {
        toast.error('Invalid ZIP Code.');
      }
    } catch (error) {
      toast.error('Invalid ZIP Code.');
    }
  };
  const handlePinCodeChange = async (e) => {
    const { value } = e.target;
    formik.handleChange(e);
    if (value && value.length === 6) {
      await getAddressDateByZIPCode(value, formik.setFieldValue, setCities);
    }
  };

  const fetchCategories = async () => {
    try {
     getCategories(); // Adjust the endpoint as necessary
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (
      firstname.trim() === '' ||
      lastname.trim() === '' ||
      phone.trim() === ''
    ) {
      toast.error('Please check mandatory feilds', {
        position: 'top-right',
      });
      return;
    }
    setIsSendingOTP(true);
    try {
      // Call registerUser function

      const registerResponse = await registerUser({
        firstname,
        lastname,
        dialcode: '+91',
        phone: phone,
      });
      // Once user is registered, send OTP
      const payload = {
        dialcode: '+91',
        phone: phone,
      };
      console.log("registered user",registerResponse);
      
      if (registerResponse.status) {
        setregisteredUser(registerResponse?.data?.data?._id)
        const response = await getOtp(payload);
        if (response?.status) {
          setOtpSent(true);
          toast.success('OTP sent successfully', {
            duration: 4000,
            position: 'top-right',
          });
        } else {
          toast.error('Unable to send OTP', {
            duration: 4000,
            position: 'top-right',
          });
        }
      } else {
        console.log('registerResponse', registerResponse);
        registerResponse?.data
          ? toast.error(registerResponse?.data, {
              duration: 4000,
              position: 'top-right',
            })
          : toast.error('unable to register user', {
              duration: 4000,
              position: 'top-right',
            });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    } finally {
      setIsSendingOTP(false);
    }
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address'),
    isActiveforJobs: yup.boolean().required('Active status is required'),
    role: yup
      .string()
      .oneOf(['employer', 'employee'], 'Invalid role')
      .required('Role is required'),
    dob: yup.date().required('Date of birth is required'),
    address: yup.string().required('Address is required'),
    pincode: yup.string().required('PIN code is required'),
    city: yup.string().required('City is required'),
    district: yup.string().required('District is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    gender: yup
      .string()
      .oneOf(['male', 'female', 'other'], 'Invalid gender')
      .required('Gender is required'),
    aboutMe: yup.string().required('About me is required'),
    categories: yup
      .array()
      .min(1, 'At least one category must be selected')
      .required('Categories are required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      isActiveforJobs: true,
      role: 'employee',
      dob: '',
      address: '',
      pincode: '',
      city: '',
      district: '',
      state: '',
      country: '',
      gender: 'male',
      aboutMe: '',
      categories: [],
      phone:'',
    },
    validationSchema,
    onSubmit: async (values:any) => {
      console.log('Form Values:', values);
      values.phone = phone;
      values._id = registeredUser;
     const response = await patchUser(values)
      console.log("response post submit",response);
      if (response.status) {
        toast.success("Details Updated Successfully");
        navigate('/action/users')
      }
      else{
      toast.error("Unable to Update User Details")
      }
      
    },
  });
  const handleVerifyOTP = async () => {
    setIsVerifyingOTP(true); 
    try {
      const response = await verifyOtp(phone, otp);
      if (response?.status) {
        setOtpVerified(true);
        console.log('OTP verified successfully');
        toast.success('OTP verified', {
          position: 'top-right',
        });
      } else {
        toast.error('OTP Not verified', {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Show error message to the user
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="OnBoard admin" />
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Enter your first name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={firstname}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.firstname && formik.touched.firstname
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.firstname && formik.touched.firstname && (
                        <div className="text-red-500">
                          {formik.errors.firstname}
                        </div>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Enter your last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={lastname}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.lastname && formik.touched.lastname
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.lastname && formik.touched.lastname && (
                        <div className="text-red-500">
                          {formik.errors.lastname}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.email && formik.touched.email
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="text-red-500">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Role
                    </label>
                    <select
                      name="role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.errors.role && formik.touched.role
                          ? 'border-red-500'
                          : ''
                      }`}
                    >
                      <option value="employee">Employee</option>
                      <option value="employer">Employer</option>
                    </select>
                    {formik.errors.role && formik.touched.role && (
                      <div className="text-red-500">{formik.errors.role}</div>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.errors.dob && formik.touched.dob
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {formik.errors.dob && formik.touched.dob && (
                      <div className="text-red-500">{formik.errors.dob}</div>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.errors.address && formik.touched.address
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {formik.errors.address && formik.touched.address && (
                      <div className="text-red-500">
                        {formik.errors.address}
                      </div>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Enter your PIN code"
                      onChange={handlePinCodeChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pincode}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.errors.pincode && formik.touched.pincode
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {formik.errors.pincode && formik.touched.pincode && (
                      <div className="text-red-500">
                        {formik.errors.pincode}
                      </div>
                    )}
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        City
                      </label>
                      <select
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.city && formik.touched.city
                            ? 'border-red-500'
                            : ''
                        }`}
                      >
                        <option value="">Select your city</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city.value}>
                            {city.label}
                          </option>
                        ))}
                      </select>
                      {formik.errors.city && formik.touched.city && (
                        <div className="text-red-500">{formik.errors.city}</div>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        District
                      </label>
                      <input
                        type="text"
                        name="district"
                        placeholder="Enter your district"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.district}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.district && formik.touched.district
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.district && formik.touched.district && (
                        <div className="text-red-500">
                          {formik.errors.district}
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
                        name="state"
                        placeholder="Enter your state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.state && formik.touched.state
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.state && formik.touched.state && (
                        <div className="text-red-500">
                          {formik.errors.state}
                        </div>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Enter your country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.country && formik.touched.country
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.country && formik.touched.country && (
                        <div className="text-red-500">
                          {formik.errors.country}
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
                          name="gender"
                          value="male"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === 'male'}
                        />{' '}
                        Male
                      </label>
                      <label className="ml-2">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === 'female'}
                        />{' '}
                        Female
                      </label>
                      <label className="ml-2">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === 'other'}
                        />{' '}
                        Other
                      </label>
                    </div>
                    {formik.errors.gender && formik.touched.gender && (
                      <div className="text-red-500">{formik.errors.gender}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className={`w-full rounded bg-primaryBGColor p-3 font-medium text-gray hover:bg-opacity-90 ${
                      !formik.isValid || formik.isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};


export default AdminStaffOnboard;
