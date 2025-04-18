import React from "react";

const DashHeader = ({ className }) => {
    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md p-4 flex-col items-start justify-center`}>
            <span className="text-lg font-bold">Welcome to Pharma Express, what do you want to do today? </span>
            <span className="text-sm text-textSecoundary">Discover what you can do with Pharma Express to be able to make the most out of your time!</span>
            <button className="bg-primary self-end text-white text-sm font-medium px-4 py-2 rounded-md shadow-md shadow-primary/15 active:bg-darkPrimary hover:bg-primary/90">Learn More</button>
        </div>
    );
}

export default DashHeader;