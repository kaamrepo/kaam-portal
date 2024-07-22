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

  const hasRequiredScopes = requiredScopes.every((scope) =>
    feScopes.includes(scope)
  );
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }
  if (!hasRequiredScopes) {
    return <Navigate to="/403" replace />;
  }
  return <Component />;
};

export default RouteGuard;

export const toAbsoluteUrl = (pathname: string) =>
  process.env.REACT_APP_PUBLIC_URL + pathname;
