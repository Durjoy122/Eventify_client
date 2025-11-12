import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const AuthLayout = () => {
    return (
        <div className="bg-base-300">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default AuthLayout;