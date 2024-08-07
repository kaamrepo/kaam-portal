import { Navigate } from "react-router-dom";
import useLoginStore from "../store/login.store";
interface RouteGuardProps {
  Component: React.ComponentType<any>;
  requiredScopes?: string[];
}
const RouteGuard: React.FC<RouteGuardProps> = ({
  Component,
  requiredScopes = [],
}) => {
  const { feScopes, isAuthenticated } = useLoginStore();

  // If not authenticated, redirect to sign-in
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  // If 'ALL' is in feScopes, allow access regardless of requiredScopes
  if (feScopes.includes("ALL")) {
    return <Component />;
  }

  // Check if the user has all required scopes
  const hasRequiredScopes = requiredScopes.every((scope) =>
    feScopes.includes(scope)
  );

  // If user does not have required scopes, redirect to "403 Forbidden"
  if (!hasRequiredScopes) {
    return <Navigate to="/403" replace />;
  }

  // If all checks pass, render the Component
  return <Component />;
};

export default RouteGuard;

export const toAbsoluteUrl = (pathname: string) =>
  process.env.REACT_APP_PUBLIC_URL + pathname;
