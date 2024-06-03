// App.tsx
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import DashboardPage from './pages/Dashboard/DashboardPage';
import UserRegistrationForm from './pages/User/UserRegistrationForm';
import { Categories } from './pages/Categories/Categories';
import { Toaster } from 'react-hot-toast';
import RouteGuard from './common/RouteGuard';
import useLoginStore from './store/login.store';
import { Users } from './pages/User/Users';

function App() {
  const { isAuthenticated } = useLoginStore();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster />
      <Routes>
        {/* Non-protected routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

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
          path="/action/users"
          element={
            <RouteGuard
              Component={Users}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
