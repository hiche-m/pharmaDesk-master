import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import pfp4 from "../Assets/Images/pfp4.svg"

const Settings = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const settingsTiles = ["Compte Pharmacie", "Notifications", "Profiles"];

    const handleEditClick = () => {
        console.log('Edit');

    };

    const handleAccountClick = () => {
        console.log('Account');
        setSelectedIndex(2);
    };

    const handleDropdownClick = () => {
        console.log('Open dropdown');
    };

    const handleMenuSwitch = (index) => {
        setSelectedIndex(index);
    }

    return (<>
        {/* Profile */}
        <div className="col-span-12 row-span-3 ml-4 inline-flex flex-row justify-between items-center">
            <div className="inline-flex flex-row space-x-2 items-center">
                <img className="h-12 w-12 rounded-full bg-gray-500" src={pfp4} />
                <span className="flex flex-col">
                    <span className="font-medium">Harrison Pfannerstill</span>
                    <span className="text-sm text-textSecoundary">Administrateur</span>
                </span>
            </div>
            <div className="inline-flex flex-row space-x-1">
                <span className="rounded-full cursor-pointer bg-primary p-3 hover:bg-primary/90 text-white active:bg-darkPrimary" onClick={() => handleEditClick()}><FaPen /></span>
                <span className={`rounded-full ${selectedIndex === 2 ? '' : 'cursor-pointer'} ${selectedIndex === 2 ? 'bg-textSecoundary/70' : 'bg-disabled'} p-3 ${selectedIndex === 2 ? '' : 'hover:bg-disabled/90'} text-textPrimary active:bg-textSecoundary/70`} onClick={selectedIndex === 2 ? null : () => handleAccountClick()}><MdManageAccounts /></span>
                <span className="rounded-full cursor-pointer bg-disabled p-3 hover:bg-disabled/90 text-textPrimary active:bg-textSecoundary/70" onClick={() => handleDropdownClick()}><HiDotsHorizontal /></span>
            </div>
        </div>

        {/* Settings */}
        <span className="col-span-12 row-span-1 text-lg font-bold">Settings</span>

        {/* Content */}
        <div className="col-span-12 row-span-10 inline-flex flex-row bg-superClear rounded-xl shadow-md">
            {/* Side Menu */}
            <div className="bg-lightShapes flex flex-col space-y-4 p-4 rounded-tl-xl">
                {settingsTiles.map((item, index) => (<span className={`font-medium cursor-pointer ${index === selectedIndex ? 'text-textPrimary' : 'text-textSecoundary'}`} key={`setting-item-tile-${index}-${item}`} onClick={() => handleMenuSwitch(index)}>{item}</span>))}
            </div>

            {/* Content */}
            <div className="w-full">
                {/* Account Settings */}
                <div className={`${selectedIndex === 0 ? 'flex' : 'hidden'}`}>
                    {settingsTiles[0]}
                </div>

                {/* Notification Settings */}
                <div className={`${selectedIndex === 1 ? 'flex' : 'hidden'}`}>
                    {settingsTiles[1]}
                </div>

                {/* Profiles Settings */}
                <div className={`${selectedIndex === 2 ? 'flex' : 'hidden'}`}>
                    {settingsTiles[2]}
                </div>
            </div>
        </div>
    </>);
}

export default Settings;