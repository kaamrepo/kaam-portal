import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useLoginStore from '../../store/login.store';
import toast from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import useCategoryStore from '../../store/categories.store';
const UserRegistrationForm = () => {
  const { getOtp, verifyOtp, registerUser } = useLoginStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [categories, setCategories] = useState([]);
  const { getCategories } = useCategoryStore();
  useEffect(() => {
    if (otpVerified) {
      // Fetch categories once OTP is verified
      fetchCategories();
    }
  }, [otpVerified]);

  const fetchCategories = async () => {
    try {
      const response = getCategories(); // Adjust the endpoint as necessary
      console.log('respinse of category in user');

      if (response) {
        setCategories(response.data.data);
      } else {
        toast.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('in the hanglesubmit');

    // Perform form validation
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      phoneNumber.trim() === ''
    ) {
      toast.error('Please check mandatory feilds', {
        position: 'top-right',
      });
      console.log('empty fiesl');

      return;
    }
    setIsSendingOTP(true);
    try {
      // Call registerUser function

      const registerResponse = await registerUser({
        firstName,
        lastName,
        dialcode: '+91',
        phone: phoneNumber,
      });
      // Once user is registered, send OTP
      console.log('registerReposne', registerResponse);

      const payload = {
        dialcode: '+91',
        phone: phoneNumber,
      };
      if (registerResponse.status) {
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
    isActive: yup.boolean().required('Active status is required'),
    role: yup
      .string()
      .oneOf(['employer', 'employee'], 'Invalid role')
      .required('Role is required'),
    dob: yup.date().required('Date of birth is required'),
    address: yup.string().required('Address is required'),
    pinCode: yup.string().required('PIN code is required'),
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
      isActive: true,
      role: 'employee',
      dob: '',
      address: '',
      pinCode: '',
      city: '',
      district: '',
      state: '',
      country: '',
      gender: 'male',
      aboutMe: '',
      categories: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form Values:', values);
      // Handle form submission
    },
  });
  const handleVerifyOTP = async () => {
    setIsVerifyingOTP(true);
    try {
      const response = await verifyOtp(phoneNumber, otp);
      if (response?.status) {
        setOtpVerified(true);
        console.log('OTP verified successfully');
        // Navigate to the next step or enable the next fields
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
      <Breadcrumb pageName="Register User" />
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {!otpVerified ? (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          First name <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Last name <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Phone <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter phone number"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Check if the entered value is a number and has a length of 10
                            if (/^\d{0,10}$/.test(value)) {
                              setPhoneNumber(value);
                            }
                          }}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    {otpSent && (
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-2.5 block text-black dark:text-white">
                            OTP
                          </label>
                          <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    )}
                    {!otpSent ? (
                      <button
                        type="submit"
                        disabled={isSendingOTP || (otpSent && otp.length < 4)}
                        className={`w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${
                          isSendingOTP || (otpSent && otp.length < 4)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {isSendingOTP ? 'Sending...' : 'Send OTP'}
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </form>

                <button
                  disabled={!otpSent}
                  onClick={handleVerifyOTP}
                  className={`w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${
                    !otpSent ? 'hidden' : ''
                  }`}
                >
                  Verify OTP
                </button>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.firstName && formik.touched.firstName
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.firstName && formik.touched.firstName && (
                        <div className="text-red-500">
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.lastName && formik.touched.lastName
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.errors.lastName && formik.touched.lastName && (
                        <div className="text-red-500">
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email (Optional)
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

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Active for Jobs
                      </label>
                      <div className="flex items-center">
                        <label className="mr-2">
                          <input
                            type="radio"
                            name="isActive"
                            value="true"
                            onChange={formik.handleChange}
                            checked={formik.values.isActive === true}
                          />{' '}
                          Yes
                        </label>
                        <label className="ml-2">
                          <input
                            type="radio"
                            name="isActive"
                            value="false"
                            onChange={formik.handleChange}
                            checked={formik.values.isActive === false}
                          />{' '}
                          No
                        </label>
                      </div>
                      {formik.errors.isActive && formik.touched.isActive && (
                        <div className="text-red-500">
                          {formik.errors.isActive}
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
                      name="pinCode"
                      placeholder="Enter your PIN code"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pinCode}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.errors.pinCode && formik.touched.pinCode
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {formik.errors.pinCode && formik.touched.pinCode && (
                      <div className="text-red-500">
                        {formik.errors.pinCode}
                      </div>
                    )}
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.errors.city && formik.touched.city
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
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

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      About Me
                    </label>
                    <textarea
                      name="aboutMe"
                      rows={6}
                      placeholder="Type your message"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.aboutMe}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        formik.errors.aboutMe && formik.touched.aboutMe
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {formik.errors.aboutMe && formik.touched.aboutMe && (
                      <div className="text-red-500">
                        {formik.errors.aboutMe}
                      </div>
                    )}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Categories
                    </label>
                    <div className="flex flex-wrap">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="mr-4 mb-2 flex items-center"
                        >
                          <input
                            type="checkbox"
                            name="categories"
                            value={category.id}
                            onChange={formik.handleChange}
                            checked={formik.values.categories.includes(
                              category.id,
                            )}
                            className="mr-2"
                          />
                          {category.name}
                        </label>
                      ))}
                    </div>
                    {formik.errors.categories && formik.touched.categories && (
                      <div className="text-red-500">
                        {formik.errors.categories}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className={`w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${
                      !formik.isValid || formik.isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserRegistrationForm;
