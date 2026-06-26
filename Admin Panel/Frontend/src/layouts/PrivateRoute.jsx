
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/common/Spinner'; 

const PrivateRoute = ({ allowedRoles }) => {

    const { user, isInitialLoading } = useSelector((state) => state.auth); 

    if (isInitialLoading) {
        return <Spinner label="Checking authentication..." />; 
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/delivery" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;