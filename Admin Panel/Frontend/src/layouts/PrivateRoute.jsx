
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/common/Spinner'; 

const PrivateRoute = () => {
    const { user, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <Spinner label="Checking authentication..." />; 
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;