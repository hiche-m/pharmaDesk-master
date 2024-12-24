import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (<>
        <div className="flex flex-col grow justify-center items-center">
            <span className="text-xl text-textPrimary">Coming Soon...</span>
            <span className="text-sm text-textSecoundary underline cursor-pointer" onClick={() => navigate(-1)}>Go Back</span>
        </div>
    </>
    );
}

export default NotFound;