import React from "react";
import { tailwindColors } from '../Utils/Colors.jsx';
import { AiOutlineExpandAlt } from "react-icons/ai";
import pfp1 from "../Assets/Images/pfp1.svg"
import pfp2 from "../Assets/Images/pfp2.svg"

const ActivePosts = ({ className = "" }) => {
    return (<div className={`${className} bg-superClear rounded-xl shadow-md flex flex-col items-start p-2`}>
        <div className="flex flex-col h-max">
            <span className="font-medium text-sm">Postes</span>
            <span className="text-textSecoundary text-xs">Actifs (4)</span>
        </div>
        <div className="inline-flex flex-row grow w-full items-end justify-between">
            <span className="flex flex-row">
                <img className="h-7 w-7 rounded-full bg-disabled" src={pfp1} />
                <img className="h-7 w-7 rounded-full bg-disabled translate-x-[-0.75rem]" src={pfp2} />
            </span>
            <span className="p-1 bg-disabled rounded-full hover:bg-lightShapes cursor-pointer">
                <AiOutlineExpandAlt size="1.25rem" color={tailwindColors.textSecoundary} />
            </span>
        </div>
    </div>);
}

export default ActivePosts;