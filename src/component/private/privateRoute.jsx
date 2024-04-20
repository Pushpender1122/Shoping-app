import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Authentication } from '../context/auth';

const PrivateRoutes = () => {
    const { isAuthenticated } = useContext(Authentication);

    return (
        isAuthenticated.isAuthenticated ? <Outlet /> : <Navigate to="/user/login" replace />
    );
};

export default PrivateRoutes;
