import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    const { authenticate } = useSelector((state) => state.Auth);

    if (!authenticate) {
        // If the user is not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the passed element (BlogList in this case)
    return element;
};

export default ProtectedRoute;
