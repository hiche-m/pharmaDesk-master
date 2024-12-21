import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../Components/NotFound.jsx";
import Home from "./home.jsx";
import Layout from "./layout.jsx";
import { Helmet } from 'react-helmet';
import { useStateContext } from "../Context/ContextProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./AuthViews/Login.jsx";
import PasswordForgoten from "./AuthViews/PasswordForgoten.jsx";
import ResetPassword from "./AuthViews/ResetPassword.jsx";
import { useAuthContext } from "../Context/AuthProvider.jsx";
import SignUp from "./AuthViews/SignUp.jsx";

export default function App() {

    const { canceling, setCanceling } = useStateContext()
    const { isAuth, setIsAuth } = useAuthContext()
    /*    const navigate = useNavigate(); // Initialize the useNavigate hook */


    useEffect(() => {


        const dataJson = localStorage.getItem("token")
        const idPharmaJson = localStorage.getItem("idpharma")
        const storeNameJson = localStorage.getItem("storeName")


        if (dataJson && idPharmaJson && storeNameJson) {
            setIsAuth(true);

        } else {
            setIsAuth(false); // If token is not found, set isAuth to false
        }

        console.log('im in the', isAuth);


    }, [isAuth])

    /* // Redirect based on the isAuth state
    useEffect(() => {
        if (isAuth) {
            navigate("/"); // If authenticated, go to the home page
        } else {
            navigate("/login"); // If not authenticated, go to login page
        }
    }, [isAuth, navigate]); // This effect depends on the `isAuth` state */


    return (
        <HashRouter>
            <Helmet>
                <meta
                    http-equiv="Content-Security-Policy"
                    content="default-src 'self'; connect-src 'self' ws://pharma-back.onrender.com https://pharma-back.onrender.com; img-src 'self' http://res.cloudinary.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
                />
            </Helmet>
            <Routes>

                <Route path='/' element={isAuth ? <Layout /> : <Login />}>
                    <Route index element={<Home />} />
                    <Route path='store' element={<NotFound />} />
                    <Route path='discover' element={<NotFound />} />
                </Route>

                <Route path='/stock' element={<Layout />}>
                    <Route index element={<NotFound />} />
                    <Route path='transactions' element={<NotFound />} />
                    <Route path='database' element={<NotFound />} />
                </Route>

                <Route path="/login" element={<Login />} />



                <Route path="/passwordForgotten" element={<PasswordForgoten />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/signup" element={<SignUp />} />

            </Routes>
            <ToastContainer />
        </HashRouter>
    );
}