import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import pfp1 from "../Assets/Images/pfp1.svg"
import pfp2 from "../Assets/Images/pfp2.svg"

const IncomePerPost = ({ className = "" }) => {
    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md p-2 grid grid-cols-6 grid-rows-5`}>
            {/*Header */}
            <div className="col-span-6 row-span-1 grid grid-rows-1 grid-cols-2">
                <span className="flex flex-row grow row-span-1 font-medium items-center">Meilleures Postes</span>
                <span className="flex flex-row grow row-span-1 text-sm justify-end items-center">
                    <span className="text-selectionBG">Pour</span>
                    <span className="px-1 text-xs">Août 2019</span>
                    <AiFillCaretDown size="0.5rem" />
                </span>
            </div>
            {/*First Post */}
            <div className="col-span-6 row-span-2 flex flex-col">
                <div className=" flex flex-row justify-start items-center h-max">
                    <img className="h-10 w-10 rounded-full bg-disabled" src={pfp1} />
                    <span className="flex flex-col space-y-1 pl-2">
                        <span className="text-sm text-textPrimary">Dexter Elliot</span>
                        <span className="text-xs text-textSecoundary">Akid Lotfi, Oran</span>
                    </span>
                </div>
                <div className="flex flex-row h-max my-3 mx-2 items-center">
                    <span className="bg-primary h-2 w-[67%] rounded-full max-h-1.5" />
                    <span className="bg-disabled h-1 w-[33%] max-h-1" />
                </div>
                <div className="flex flex-row justify-between items-center text-sm mx-2">
                    <span>Vendu aujourd'hui:</span>
                    <span className="font-medium">10,050 DA</span>
                </div>
            </div>
            {/*Secound Post */}
            <div className="col-span-6 row-span-2 flex flex-col">
                <div className=" flex flex-row justify-start items-center h-max">
                    <img className="h-10 w-10 rounded-full bg-disabled" src={pfp2} />
                    <span className="flex flex-col space-y-1 pl-2">
                        <span className="text-sm text-textPrimary">Susan Suisse</span>
                        <span className="text-xs text-textSecoundary">Akid Lotfi, Oran</span>
                    </span>
                </div>
                <div className="flex flex-row h-max my-3 mx-2 items-center">
                    <span className="bg-darkPrimary h-2 w-[67%] rounded-full max-h-1.5" />
                    <span className="bg-disabled h-1 w-[33%] max-h-1" />
                </div>
                <div className="flex flex-row justify-between items-center text-sm mx-2">
                    <span>Vendu aujourd'hui:</span>
                    <span className="font-medium">8,500 DA</span>
                </div>
            </div>
        </div>
    );
}

export default IncomePerPost;