import { Link, Outlet } from "react-router-dom";
import { toAbsoluteUrl } from "../../common/RouteGuard";
export const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" h-full flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2 ">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img
                className="dark:hidden"
                src={toAbsoluteUrl("/media/kaamapplogo.png")}
                alt="Logo"
              />
            </Link>
            <p className="2xl:px-20">Kaam Admin Portal</p>
            <span className="mt-15 inline-block">
              <img
                className="hidden dark:block h-24 w-24"
                src={toAbsoluteUrl("/media/kaamapplogo.png")}
                alt="Logo"
              />
            </span>
          </div>
        </div>
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
