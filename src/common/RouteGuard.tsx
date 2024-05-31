// RouteGuard.tsx
import { Navigate } from 'react-router-dom';

interface RouteGuardProps {
    Component: React.ComponentType<any>;
    isAuthenticated: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ Component, isAuthenticated }) => {
    console.log("isAuthenticated in routeGuard:", isAuthenticated);
    return isAuthenticated ? <Component /> : <Navigate to="/auth/signin" replace />;
};

export default RouteGuard;
