import { Route, Routes } from "react-router-dom";
import RouteGuard from "../common/RouteGuard";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UserRegistrationForm from "../pages/User/UserRegistrationForm";
import Categories from "../pages/Categories/Categories";
import Users from "../pages/User/Users";
import AuthRouters from "../routes/AuthRouters";
import Error404 from "../pages/errors/Error404";
import OnBoardingAdminStaff from "../pages/AdminStaff/OnBoardingAdminStaff";
import Approval from "../pages/Approval/Approvals";
import Error403 from "../pages/errors/Error403";
function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRouters />} />
      <Route
        path="/"
        element={
          <RouteGuard
            Component={DashboardPage}
            requiredScopes={["DASHBOARD"]}
          />
        }
      />
      <Route
        path="/action/categories"
        element={
          <RouteGuard Component={Categories} requiredScopes={["CATEGORIES"]} />
        }
      />
      <Route
        path="/action/userregistration"
        element={
          <RouteGuard
            Component={UserRegistrationForm}
            requiredScopes={["REGISTER_USER"]}
          />
        }
      />
      <Route
        path="/action/onboardstaff"
        element={
          <RouteGuard
            Component={OnBoardingAdminStaff}
            requiredScopes={["ONBOARDING_ADMIN_STAFF"]}
          />
        }
      />
      <Route
        path="/action/approval"
        element={
          <RouteGuard Component={Approval} requiredScopes={["APPROVALS"]} />
        }
      />
      <Route
        path="/action/users"
        element={<RouteGuard Component={Users} requiredScopes={["USERS"]} />}
      />
      <Route path="/403" element={<Error403 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default AppRouter;
