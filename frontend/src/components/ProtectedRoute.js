import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';

const ProtectedRoute = ({ element }) => {
    const { authenticate } = useSelector((state) => state.Auth);

    if (!authenticate) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
        <Header/>
        {element}
        </>
        
    );
};

export default ProtectedRoute;
