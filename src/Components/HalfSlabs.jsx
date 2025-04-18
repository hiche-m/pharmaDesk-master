import React from "react";
import up_icon from "../Assets/SVG/up.svg"
import down_icon from "../Assets/SVG/down.svg"

const HalfSlabs = ({ className = "" }) => {
    return (<div className={`${className} flex flex-col bg-superClear rounded-xl ml-2 mt-2 shadow-md items-center`}>
        <div className=" flex flex-row grow space-x-1 border-b border-disabled justify-start items-center p-2 mx-1">
            <img className="h-6 w-6 justify-center items-center" src={up_icon} />
            <span className="flex flex-col space-y-1 items-start">
                <div>
                    <span className="font-medium">20,102</span>
                    <span className="text-sm">DA</span>
                </div>
                <span className="text-sm">Gains</span>
            </span>
        </div>
        <div className=" flex flex-row grow space-x-1 border-t border-disabled justify-start items-center p-2 mx-1">
            <img className="h-6 w-6 justify-center items-center" src={down_icon} />
            <span className="flex flex-col space-y-1 items-start">
                <div>
                    <span className="font-medium">11,102</span>
                    <span className="text-sm">DA</span>
                </div>
                <span className="text-sm">Dépenses</span>
            </span>
        </div>
    </div>);
}

export default HalfSlabs;