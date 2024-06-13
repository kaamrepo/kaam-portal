import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLoginStore from "../../../store/login.store";
interface OTPFormValues {
  otp: string[];
}
export const OTPverification = () => {
  const { verifyOtp } = useLoginStore();
  const codeInputs = useRef(Array(4).fill(null));
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "";
  const type = location.state?.type || "";
  const { handleSubmit, control, watch, setValue } = useForm<OTPFormValues>({
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });
  const otp = watch("otp").join("");
  const handleVerifyOTP = async () => {
    if (otp.length >= 4) {
      try {
        const response: any = await verifyOtp(phoneNumber, otp);
        if (response?.status) {
          toast.success(
            type === "LOGIN"
              ? "Login Successful"
              : "Profile Created Successfully",
            {
              duration: 4000,
              position: "top-right",
            }
          );
          navigate("/");
        } else {
          toast.error("Unable to Login", {
            duration: 4000,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Error verifying OTP", {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length <= 1) {
      setValue(`otp.${index}` as const, value);
      if (value.length === 1 && index < codeInputs.current.length - 1) {
        codeInputs.current[index + 1].focus();
      } else if (value.length === 0 && index > 0) {
        codeInputs.current[index - 1].focus();
      }
    }
  };

  const setRef = (ref: any, index: number) => {
    codeInputs.current[index] = ref;
  };

  function maskMobileNumber(mobileNumber: string) {
    if (mobileNumber.startsWith("+91") && mobileNumber.length === 14) {
      const firstPart = mobileNumber.slice(0, 5);
      const lastPart = mobileNumber.slice(-3);
      const maskedMiddle = "*******";
      return `${firstPart}${maskedMiddle}${lastPart}`;
    }
    return mobileNumber;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 sm:p-12 xl:p-16 bg-white rounded-lg">
        <h2 className="text-center mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">
          Verify OTP
        </h2>
        <p className="text-center text-gray-700 mb-2">
          Please enter the OTP you received at
        </p>
        <p className="text-center text-gray-900 font-semibold mb-6">
          {maskMobileNumber(`+91 ${phoneNumber}`)}
        </p>
        <form onSubmit={handleSubmit(handleVerifyOTP)}>
          <div className="mb-6">
            <div className="flex justify-center items-center space-x-3">
              {[0, 1, 2, 3].map((index) => (
                <Controller
                  key={index}
                  name={`otp.${index}` as const}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      ref={(ref) => setRef(ref, index)}
                      className="w-12 h-12 text-center bg-gray-100 border border-gray-400 p-2 hover:border-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      onChange={(e) => handleCodeInput(index, e.target.value)}
                    />
                  )}
                />
              ))}
            </div>
          </div>
          <div className="mb-5">
            <input
              type="submit"
              value="Verify"
              className="w-full cursor-pointer rounded-lg border bg-green-500 p-4 text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
