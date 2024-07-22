import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../pages/Authentication/AuthLaylout";
import { Login } from "../pages/Authentication/components/Login";
import { OTPverification } from "../pages/Authentication/components/OTPVerification";
import { SignUP } from "../pages/Authentication/components/SignUP";
import { LoginWithEmail } from "../pages/Authentication/components/LoginWithEmail";
const AuthRouters = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="signin" element={<LoginWithEmail />} />
        <Route path="signup" element={<SignUP />} />
        <Route path="otp-verification" element={<OTPverification />} />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};
export default AuthRouters;
