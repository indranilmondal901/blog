import React from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BlogList from './pages/BlogList';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import BlogDetails from './pages/BlogDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Route for Blogs */}
                <Route path="/blogs" element={<ProtectedRoute element={<BlogList />} />} />
                <Route path="/blog/:id" element={<ProtectedRoute element={<BlogDetails />} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
