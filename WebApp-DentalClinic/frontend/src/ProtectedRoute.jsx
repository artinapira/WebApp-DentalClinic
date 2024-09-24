import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(state => state.auth.data.token1); // Adjust according to your Redux state

    return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
