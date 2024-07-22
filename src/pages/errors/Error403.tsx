import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../../common/RouteGuard";
import useLoginStore from "../../store/login.store";
import DefaultLayout from "../../layout/DefaultLayout";
const Error403: FC = () => {
  const { logout } = useLoginStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth/signin", { replace: true });
  };
  return (
    <DefaultLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        {/* Title */}
        <h1 className="font-extrabold text-5xl mb-4 animate-pulse">Oops!</h1>

        {/* Text */}
        <div className="font-semibold text-xl mb-7 text-center">
          You Don't Have Access Of This Resource ...!
        </div>

        {/* Illustration */}
        <div className="mb-10">
          <img
            src={toAbsoluteUrl("/media/403-error.png")}
            className="max-w-full max-h-72 block dark:hidden mx-auto"
            alt="Error 403"
          />
        </div>

        {/* Link */}
        <div className="mb-0 space-x-3">
          <Link
            to="/"
            className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Return Home
          </Link>
          <Link
            to="/auth/signin"
            className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Error403;
