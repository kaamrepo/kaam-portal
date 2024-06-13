// RouteGuard.tsx
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  Component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  Component,
  isAuthenticated = true,
}) => {
  console.log("isAuthenticated in routeGuard:", isAuthenticated);
  // return isAuthenticated ? <Component /> : <Navigate to="/auth/signin" replace />;
  return isAuthenticated ? <Component /> : <Component />;
};

export default RouteGuard;

export const toAbsoluteUrl = (pathname: string) =>
  process.env.REACT_APP_PUBLIC_URL + pathname;
