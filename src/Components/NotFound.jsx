import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (<>
        <div className="col-span-3 row-span-2 bg-lightShapes">

        </div>
        <div className="col-span-9 col-start-1 row-start-2 flex bg-background">
            <div className="flex flex-col grow justify-center items-center">
                <span className="text-xl text-textPrimary">Coming Soon...</span>
                <span className="text-sm text-textSecoundary underline" onClick={() => navigate(-1)}>Go Back</span>
            </div>
        </div>
    </>
    );
}

export default NotFound;