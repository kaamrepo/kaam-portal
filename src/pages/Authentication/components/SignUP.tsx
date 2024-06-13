import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLoginStore from "../../../store/login.store";
import toast from "react-hot-toast";

interface SignUpFormValues {
  firstname: string;
  lastname: string;
  email?: string;
  phone: string;
  dialcode?: string;
}

export const SignUP: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser } = useLoginStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const handleVerifyOTP = async (data: SignUpFormValues) => {
    data.dialcode = "+91";
    const response: any = await registerUser(data);
    if (response?.status) {
      toast.success("OTP sent successfully", {
        duration: 4000,
        position: "top-right",
      });
      navigate("/auth/otp-verification", {
        state: { phoneNumber: data.phone, type: "REGISTER" },
      });
    } else {
      toast.error("Unable to send OTP", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5 ">
      <h2 className="text-center mb-6 text-2xl font-bold text-black dark:text-whitex sm:text-title-xl2">
        Sign up to Kaam Admin Portal
      </h2>
      <form onSubmit={handleSubmit(handleVerifyOTP)}>
        <div className="my-2">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
              <label className="mb-2.5 block  font-medium text-sm text-black dark:text-white">
                First Name
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                  className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-right">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="mb-2.5 block font-medium text-sm text-black dark:text-white">
                Last Name
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  {...register("lastname", {
                    required: "Last Name is required",
                  })}
                  className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-right">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <label className="mb-2.5 block font-medium text-sm text-black dark:text-white">
            Email
          </label>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter Email address"
              {...register("email")}
              className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="my-2">
          <label className="mb-2.5 block font-medium text-sm text-black dark:text-white">
            Phone Number
          </label>
          <div className="flex flex-row items-center">
            <div className=" w-[20%] h-12 border border-slate-500 rounded-xl flex items-center justify-center mr-2">
              <span className="text-black">🇮🇳 +91</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full h-12 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-right">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="submit"
            value="Verify"
            className="w-full cursor-pointer rounded-lg border bg-primaryBGColor p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
        <div className="mt-3 text-center">
          <p>
            Back To?{" "}
            <Link to="/auth/signin" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
