import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const SideMenu = ({ option_list, initialIndex = 0 }) => {
    const [index, setIndex] = useState(initialIndex);
    const location = useLocation();

    const renderedItems = [];

    const handleMenuSwitch = (index) => {
        setIndex(index);
    }

    for (let i = 0; i < option_list.length; i++) {
        const label = option_list[i].label;
        const disabled = option_list[i].disabled ?? false;
        const route = option_list[i].route;

        if (disabled) {
            renderedItems.push(
                <div className="flex flex-row justify-between items-center text-disabled" key={`menu-option-${label}-i`} >
                    <span className={`flex grow bg-lightShapes rounded-md px-6 py-2 font-medium text-disabled`}>{label}</span>
                    <IoLockClosedOutline />
                </div>
            );
        } else if (route) {
            renderedItems.push(
                <Link to={location.pathname === route ? undefined : route} key={`menu-option-${label}-i`} >
                    <div className="flex flex-row justify-between items-center text-disabled">
                        <span onClick={() => handleMenuSwitch(i)} className={`flex grow ${location.pathname === route ? "bg-disabled " : ""}rounded-md cursor-pointer px-6 py-2 font-medium ${location.pathname === route ? "text-black" : "text-textSecoundary"}`}>{label}</span>
                    </div>
                </Link>
            );
        } else {
            const action = option_list[i].action;

            renderedItems.push(<div key={`menu-option-${label}-i`} className="flex flex-row justify-between items-center text-disabled">
                <span onClick={() => action()} className={`flex grow rounded-md cursor-pointer px-6 py-2 font-medium text-textSecoundary`}>{label}</span>
            </div>);
        }
    }

    return (<div className="flex flex-col space-y-1 mt-5 mx-2">
        {renderedItems}
    </div>
    );
}

export default SideMenu;