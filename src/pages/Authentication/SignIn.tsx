import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo/kaamapplogo.png';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../store/login.store';
import toast from 'react-hot-toast';
const SignIn: React.FC = () => {
  const { getOtp,verifyOtp } = useLoginStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setIsSendingOTP(true);
      try {
       const payload = {
        "dialcode": "+91",
        "phone": phoneNumber
    }
     const response:any = await getOtp(payload);     
     if (response?.status) {
      setOtpSent(true);
      toast.success('otp sent successfully',{
        duration: 4000,
  position: 'top-right',
      })
     }else{
      toast.error('Unable to send OTP',{
        duration: 4000,
  position: 'top-right',})
     }
       
      } catch (error) {
        console.error('Error sending OTP:', error);
      } finally {
        setIsSendingOTP(false);
      }
    }
  };

  const handleVerifyOTP = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length >= 4) {
      setIsVerifyingOTP(true);
      try {
        const response:any = await verifyOtp(phoneNumber,otp);
        if (response?.status) {
        
          toast.success('Login Successfull',{
            duration: 4000,
      position: 'top-right',
          });
          console.log("before return");
          navigate('/')
         }else{
          toast.error('Unable to Login',{
            duration: 4000,
      position: 'top-right',})
         }
      
      } catch (error) {
        console.error('Error verifying OTP:', error);
        // Show error message
      } finally {
        setIsVerifyingOTP(false);
      }
    }
  };

  useEffect(() => {
    if (phoneNumber.length !== 10) {
      setOtpSent(false);
    }
  }, [phoneNumber]);

  return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="dark:hidden" src={Logo} alt="Logo" />
              </Link>

              <p className="2xl:px-20">Kaam Admin Portal</p>

              <span className="mt-15 inline-block">
                <img
                  className="hidden dark:block h-24 w-24"
                  src={Logo}
                  alt="Logo"
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign in to Kaam Admin Portal
              </h2>

              <form onSubmit={handleVerifyOTP}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Phone
                  </label>
                  <div className="flex">
                    <div className="relative w-1/4 h-12 border border-slate-500 rounded-xl flex items-center justify-center mr-2">
                      <span className="text-black">🇮🇳 +91</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={isSendingOTP || phoneNumber.length !== 10 || otp.length >= 4}
                      className={`ml-2 bg-primaryBGColor text-white px-3 py-2 rounded-lg ${
                        isSendingOTP || phoneNumber.length !== 10 || otp.length >= 4
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {isSendingOTP ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    OTP
                  </label>
                  <div className="relative">
                  <input
  type="text"
  placeholder= {!otpSent ? 'OTP' : 'Enter OTP'}
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
  disabled={!otpSent}
  autoFocus={otpSent} // Focus the input field when otpSent is true
  className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
    otpSent ? 'border-primary border-2 bg-primaryBGColor' : ''
  }`}
/>


                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Verify"
                    disabled={isVerifyingOTP || otp.length < 4 || isSendingOTP}
                    className={`w-full cursor-pointer rounded-lg border bg-primaryBGColor p-4 text-white transition hover:bg-opacity-90 ${
                      isVerifyingOTP || otp.length < 4 || isSendingOTP
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  />
                </div>

                {/* <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>

  );
};

export default SignIn;


