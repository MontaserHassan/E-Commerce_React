import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ path, ...rest }) => {
    // const isAuthenticated = () => {
    //     const userInfo = localStorage.getItem('userInfo');
    //     console.log(userInfo);
    //     const token = userInfo ? JSON.parse(userInfo).access : null;
    //     console.log(token);
    //     return !!token;
    // };
    const isAuthenticated = useSelector(state => state.userLogin.userInfo);

    return isAuthenticated ? (
        <Route {...rest} />
    ) : (
        <Navigate to="/login" replace state={{ from: path }} />
    );
};

export default ProtectedRoute;
