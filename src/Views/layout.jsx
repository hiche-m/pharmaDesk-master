import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../Components/Navbar.jsx";

const Layout = () => {
    return (
        <div className="min-h-screen h-full">
            <div className="grid grid-cols-12 grid-rows-[auto_1fr] gap-0">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;