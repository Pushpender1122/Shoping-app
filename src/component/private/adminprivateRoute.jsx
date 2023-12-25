import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Authentication } from '../context/auth';
import axios from 'axios';

const AdminPrivateRoute = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Authentication);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const result = await axios.get(`${apiUrl}auth/admin/check`, { withCredentials: true });
                if (result.data.message === 'Admin true') {
                    setIsAuthenticated({
                        isAuthenticated: true,
                        UserRole: 'admin'
                    });
                } else {
                    setIsAuthenticated({
                        isAuthenticated: true,
                        UserRole: 'user'
                    });
                }
            } catch (error) {
                // Handle errors here
                console.error('Error checking admin status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, [apiUrl, setIsAuthenticated]);

    if (loading) {
        return null; // or a loading spinner/indicator
    }

    return isAuthenticated.UserRole === 'admin' ? <Outlet /> : <Navigate to="/user/login" />;
};

export default AdminPrivateRoute;
