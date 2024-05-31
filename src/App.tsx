// App.tsx
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import DashboardPage from './pages/Dashboard/DashboardPage';
import FormElements from './pages/Form/FormElements';
import UserRegistrationForm from './pages/User/UserRegistrationForm';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { Categories } from './pages/Categories/Categories';
import { Toaster } from 'react-hot-toast';
import RouteGuard from './common/RouteGuard';
import useLoginStore from './store/login.store';

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
          path="/action/form-elements"
          element={
            <RouteGuard
              Component={FormElements}
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
          path="/action/form-layout"
          element={
            <RouteGuard
              Component={FormLayout}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/tables"
          element={
            <RouteGuard Component={Tables} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <RouteGuard Component={Alerts} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <RouteGuard Component={Buttons} isAuthenticated={isAuthenticated} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
