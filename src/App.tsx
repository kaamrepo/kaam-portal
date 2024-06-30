import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RouteGuard from "./common/RouteGuard";
import useLoginStore from "./store/login.store";
import React from "react";
import SkeletonLoader from "./common/Loader/SkeletonLoader";
// Lazy load components
const DashboardPage = React.lazy(
  () => import("./pages/Dashboard/DashboardPage")
);
const UserRegistrationForm = React.lazy(
  () => import("./pages/User/UserRegistrationForm")
);
const Categories = React.lazy(() => import("./pages/Categories/Categories"));
const Users = React.lazy(() => import("./pages/User/Users"));
const AuthRouters = React.lazy(() => import("./routes/AuthRouters"));
const Profile = React.lazy(() => import("./pages/User/profile/Profile"));
const Error404 = React.lazy(() => import("./pages/errors/Error404"));
const OnBoardingAdminStaff = React.lazy(
  () => import("./pages/AdminStaff/OnBoardingAdminStaff")
);
const Approval = React.lazy(() => import("./pages/Approval/Approvals"));

function App() {
  const { isAuthenticated } = useLoginStore();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Toaster />
      <Suspense fallback={<SkeletonLoader />}>
        <Routes>
          {/* Non-protected routes */}
          <Route path="/auth/*" element={<AuthRouters />} />
          {/* Protected routes with RouteGuard */}
          <Route
            path="/"
            element={
              <RouteGuard
                Component={DashboardPage}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <RouteGuard
                Component={Profile}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/action/categories"
            element={
              <RouteGuard
                Component={Categories}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/action/userregistration"
            element={
              <RouteGuard
                Component={UserRegistrationForm}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/action/onboardstaff"
            element={
              <RouteGuard
                Component={OnBoardingAdminStaff}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/action/approval"
            element={
              <RouteGuard
                Component={Approval}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/action/users"
            element={
              <RouteGuard Component={Users} isAuthenticated={isAuthenticated} />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
