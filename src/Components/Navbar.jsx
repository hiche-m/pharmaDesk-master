import React, { useEffect } from "react";
import home_full from "../Assets/SVG/home_filled.svg"
import home_outline from "../Assets/SVG/home_outline.svg"
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { IoLockClosedOutline } from "react-icons/io5";
import pfp4 from "../Assets/Images/pfp4.svg"
import logo from "../Assets/SVG/logo_white_bg.svg"
import textSvg from "../Assets/SVG/text_color.svg"
import banner from "../Assets/GIF/banner1.gif"
import { useStateContext } from "../Context/ContextProvider.jsx";

const Navbar = () => {
    const location = useLocation();
    const { getUserData } = useStateContext();

    const storeName = getUserData().storeName;

    return (<div className="col-span-9 row-span-1 inline-flex items-center justify-between text-base font-medium text-textSecoundary py-2 px-4 space-x-4 border-b-2 border-lightShapes">
        {/* <div className="self-end flex flex-row items-center">
            <img src={pfp4} className="h-8 w-8 rounded-full" />
            <div className="flex flex-col items-start p-4">
                <div className="text-sm font-medium text-textPrimary">{storeName}</div>
                <div className="text-xs text-textSecoundary">Administrateur</div>
            </div>
        </div>
        <img className="h-20 bg-gray-300" src={banner} /> */}
        <div className="inline-flex items-center justify-start">
            <img src={logo} className="h-20" />
            <img src={textSvg} className="h-8" />
        </div>
        <div className="flex flex-row items-center space-x-2">
            <div className="font-medium text-textPrimary">{storeName}</div>
            {/* <div className="flex flex-col items-start p-4">
                <div className="text-sm font-medium text-textPrimary">{storeName}</div>
                <div className="text-xs text-textSecoundary">Administrateur</div>
            </div> */}
            <img src={pfp4} className="h-8 w-8 rounded-full" />
        </div>
        {/* <Link to={location.pathname === '/' ? undefined : '/'}><img className="h-6 w-6 justify-center items-center" src={location.pathname === '/' ? home_full : home_outline} /></Link> */}
        {/* <Link to={location.pathname === '/stock' ? undefined : '/stock'}> */}
        {/* <div className="flex flex-row justify-between items-center text-disabled">
            <span className="px-2" >Stock</span>
            <IoLockClosedOutline />
        </div>
        <div className="flex flex-row justify-between items-center text-disabled">
            <span className="px-2" >Découvrir</span>
            <IoLockClosedOutline />
        </div>
        <div className="flex flex-row justify-between items-center text-disabled">
            <span className="px-2" >Annonces</span>
            <IoLockClosedOutline />
        </div>
        <span className="w-max">
            <SearchBar />
        </span> */}
    </div>);
}

export default Navbar;