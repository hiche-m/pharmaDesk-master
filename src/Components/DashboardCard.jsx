import React from "react";
import { AiFillCaretDown } from "react-icons/ai";

const DashCard = ({ className, post = 'Seller', name = 'Alice Smith', adress = '', imgSrc = null, todaySales = 0, salesToNextLevel = 0 }) => {
    return (<div className={`${className} bg-superClear rounded-xl shadow-md p-4 flex flex-col space-y-2`}>
        {/* Header */}
        <span className="inline-flex justify-between">
            <span className=" text-sm font-medium">{post}</span>
            <AiFillCaretDown size="0.5rem" />
        </span>

        {/* Profile */}
        <span className="inline-flex">
            <img className="h-12 w-12 bg-gray-200 rounded-full mr-2" src={imgSrc} />
            <span className="flex flex-col">
                <span>{name}</span>
                <span className="text-sm text-textSecoundary">{adress}</span>
            </span>
        </span>

        {/* Seperator */}
        <span className="w-full border border-disabled" />

        {/* Daily Sales */}
        <span className="inline-flex justify-between">
            <span className="text-xs">Today</span>
            <span className="text-xs font-medium">{todaySales} sales</span>
        </span>

        {/* Til next leve */}
        <span className="inline-flex justify-between">
            <span className="text-xs mr-2">Sales until next level</span>
            <span className="text-xs font-medium">{salesToNextLevel} sales</span>
        </span>

        {/* Progress */}
        <span className="w-full h-2 rounded-full bg-gradient-to-r from-primary from-[49%] to-lightShapes to-50%" />
    </div>);
}

export default DashCard;