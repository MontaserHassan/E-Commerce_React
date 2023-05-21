import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, ...rest }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('userInfo'));

    return isAuthenticated ? (
        <Routes>
            <Route {...rest} />
        </Routes>
    ) : (
        <Navigate to="/login" replace state={{ from: path }} />
    );
};

export default ProtectedRoute;
