import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Authentication } from '../context/auth';

const Protectedlogin = () => {
    const { isAuthenticated } = useContext(Authentication);

    return (
        isAuthenticated.isAuthenticated ? <Navigate to="/" /> : <Outlet />
    );
};

export default Protectedlogin;
