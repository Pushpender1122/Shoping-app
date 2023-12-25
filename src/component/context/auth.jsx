import Cookies from 'js-cookie';
import React, { createContext, useState, useEffect } from 'react';

export const Authentication = createContext();

const Auth = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuthenticated: false,
        UserRole: 'user',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCookie = async () => {
            const cookies = Cookies.get('Auth');
            const UserRole = Cookies.get('UserRole');
            if (cookies) {
                setIsAuthenticated({
                    isAuthenticated: true,
                    UserRole: UserRole
                });
            } else {
                setIsAuthenticated({
                    isAuthenticated: false,
                    UserRole: undefined,
                })
            }
            setLoading(false); // Update loading state when finished
            // console.log(Cookies.get('Auth'));
        };

        fetchCookie();
    }, []);
    if (loading) {

        return null;
    }

    return (
        <Authentication.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </Authentication.Provider>
    );
};

export default Auth;
