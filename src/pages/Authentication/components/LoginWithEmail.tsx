import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../store/login.store";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
interface FormValues {
  email: string;
  password: string;
}
export const LoginWithEmail: React.FC = () => {
  const { loginWithEmail } = useLoginStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormValues) => {
    const response: any = await loginWithEmail(data);
    if (response?.status) {
      toast.success("Login successfully", {
        duration: 4000,
        position: "top-right",
      });
      navigate("/");
    } else {
      toast.error(response?.data?.message ?? "Unable to Login", {
        duration: 4000,
        position: "top-right",
      });
    }
  };
  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="text-center mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign in to Kaam Admin Portal
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <FaUser className="absolute left-4 top-3.5 text-gray-500" />
          <input
            type="email"
            placeholder="Enter Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          {errors.email && (
            <p className="text-red-600 text-xs text-right">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4 relative">
          <FaLock className="absolute left-4 top-3.5 text-gray-500" />
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              //   pattern: {
              //     value:
              //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              //     message:
              //       "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
              //   },
            })}
            className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-12 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span
            className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-600 text-xs text-right">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <input
            type="submit"
            value="Submit"
            className={`w-full cursor-pointer rounded-lg border bg-primaryBGColor p-4 text-white transition hover:bg-opacity-90 ${
              !isDirty ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isDirty}
          />
        </div>
      </form>
    </div>
  );
};
