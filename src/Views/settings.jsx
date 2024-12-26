import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import pfp4 from "../Assets/Images/pfp4.svg"
import SettingsInput from "../Components/SettingsInput.jsx";

const Settings = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const settingsTiles = ["Compte Pharmacie", "Compte Personnel", "Sécurité", "Notifications", "Profiles"];

    const handleEditClick = () => {
        console.log('Edit');

    };

    const handleAccountClick = () => {
        console.log('Account');
        setSelectedIndex(settingsTiles.indexOf('Profiles'));
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
                <img className="hidden sm:block h-12 w-12 rounded-full bg-gray-500" src={pfp4} />
                <span className="flex flex-col">
                    <span className="font-medium">Harrison Pfannerstill</span>
                    <span className="text-sm text-textSecoundary">Administrateur</span>
                </span>
            </div>
            <div className="inline-flex flex-row space-x-1">
                <span className="hidden sm:block rounded-full cursor-pointer bg-primary p-3 hover:bg-primary/90 text-white active:bg-darkPrimary" onClick={() => handleEditClick()}><FaPen /></span>
                <span className={`hidden sm:block rounded-full ${selectedIndex === settingsTiles.indexOf('Profiles') ? '' : 'cursor-pointer'} ${selectedIndex === settingsTiles.indexOf('Profiles') ? 'bg-textSecoundary/70' : 'bg-disabled'} p-3 ${selectedIndex === settingsTiles.indexOf('Profiles') ? '' : 'hover:bg-disabled/90'} text-textPrimary active:bg-textSecoundary/70`} onClick={selectedIndex === settingsTiles.indexOf('Profiles') ? null : () => handleAccountClick()}><MdManageAccounts /></span>
                <span className="rounded-full cursor-pointer bg-disabled p-3 hover:bg-disabled/90 text-textPrimary active:bg-textSecoundary/70" onClick={() => handleDropdownClick()}><HiDotsHorizontal /></span>
            </div>
        </div>

        {/* Settings */}
        <span className="col-span-12 row-span-1 text-lg font-bold">Settings</span>

        {/* Content */}
        <div className="col-span-12 row-span-10 inline-flex flex-row bg-superClear rounded-xl shadow-md">
            {/* Side Menu */}
            <div className={`bg-lightShapes hidden small:flex flex-col space-y-4 p-4 rounded-tl-xl`}>
                {settingsTiles.map((item, index) => (<span className={`font-medium cursor-pointer ${index === selectedIndex ? 'text-textPrimary' : 'text-textSecoundary'}`} key={`setting-item-tile-${index}-${item}`} onClick={() => handleMenuSwitch(index)}>{item}</span>))}
            </div>

            {/* Content */}
            <div className="w-full">
                {/* Account Settings */}
                <div className={`${selectedIndex === 0 ? 'flex' : 'hidden'} flex-col p-4 space-y-4`}>
                    <span className="font-medium">Information sur la pharmacie</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-x-2 small:gap-x-10">
                        <SettingsInput placeholder='Nom du pharmacie...' flexible={true} />
                        <SettingsInput placeholder='Adresse du pharmacie...' flexible={true} />
                        <SettingsInput placeholder='Numéro téléphone pharmacie...' flexible={true} />
                        <SettingsInput placeholder='Description...' large={true} flexible={true} />
                        <SettingsInput placeholder='Latitude' flexible={true} />
                        <SettingsInput placeholder='Longitude' flexible={true} />
                    </div>
                    <div className="inline-flex grow justify-between">
                        <button className="text-textSecoundary">
                            <span className="inline-flex flex-row space-x-2 text-base items-center underline italic">
                                <FaTrashAlt />
                                <span>Clear</span>
                            </span>
                        </button>
                        <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 active:bg-darkPrimary">
                            <span className="inline-flex flex-row space-x-2 text-base items-center px-2 text-white">
                                <FaSave />
                                <span>Save</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Personal Info */}
                <div className={`${selectedIndex === 1 ? 'flex' : 'hidden'}`}>
                    {settingsTiles[1]}
                </div>

                {/* Notification Settings */}
                <div className={`${selectedIndex === 2 ? 'flex' : 'hidden'}`}>
                    {settingsTiles[2]}
                </div>

                {/* Profiles Settings */}
                <div className={`${selectedIndex === 3 ? 'flex' : 'hidden'}`}>
                    {settingsTiles[3]}
                </div>
            </div>
        </div>
    </>);
}

export default Settings;