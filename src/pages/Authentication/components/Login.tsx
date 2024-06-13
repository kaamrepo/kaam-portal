import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../../../store/login.store";
import { useForm } from "react-hook-form";

interface FormValues {
  phoneNumber: string;
}

export const Login: React.FC = () => {
  const { getOtp } = useLoginStore();
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (data.phoneNumber.length === 10) {
      setIsSendingOTP(true);
      try {
        const payload = {
          dialcode: "+91",
          phone: data.phoneNumber,
        };
        const response: any = await getOtp(payload);
        if (response?.status) {
          toast.success("OTP sent successfully", {
            duration: 4000,
            position: "top-right",
          });
          navigate("/auth/otp-verification", {
            state: { phoneNumber: data.phoneNumber, type: "LOGIN" },
          });
        } else {
          toast.error("Unable to send OTP", {
            duration: 4000,
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("Error sending OTP", {
          duration: 4000,
          position: "top-right",
        });
      } finally {
        setIsSendingOTP(false);
      }
    }
  };

  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="text-center mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign in to Kaam Admin Portal
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-sm text-black dark:text-white">
            Phone Number
          </label>
          <div className="flex flex-row items-center">
            <div className="w-[20%] h-12 border border-slate-500 rounded-xl flex items-center justify-center mr-2">
              <span className="text-black">🇮🇳 +91</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number",
                  },
                  onChange: (e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (value.length <= 10) {
                      e.target.value = value; // Update the value in the event
                    } else {
                      e.preventDefault(); // Prevent further input if length exceeds 10
                    }
                  },
                })}
                className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          {errors.phoneNumber && (
            <p className="text-red-600 text-right">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <input
            type="submit"
            value="Send OTP"
            disabled={isSendingOTP}
            className={`w-full cursor-pointer rounded-lg border bg-primaryBGColor p-4 text-white transition hover:bg-opacity-90 ${
              isSendingOTP ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div className="mt-6 text-center">
          <p>
            Don’t have any account?{" "}
            <Link to="/auth/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
