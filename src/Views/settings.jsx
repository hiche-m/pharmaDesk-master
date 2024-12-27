import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import pfp4 from "../Assets/Images/pfp4.svg"
import SettingsInput from "../Components/SettingsInput.jsx";
import ToggleSwitch from "../Components/ToggleSwitch.jsx";
import DropdownMenu from "../Components/DropDownMenu.jsx";
import { toast } from "react-toastify";

const Settings = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const settingsTiles = ["Compte Pharmacie", "Compte Personnel", "Sécurité", "Notifications", "Profils"];

    const handleEditClick = () => {
        console.log('Edit');

    };

    const handleAccountClick = () => {
        console.log('Account');
        setSelectedIndex(settingsTiles.indexOf('Profils'));
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
                <span className={`hidden sm:block rounded-full ${selectedIndex === settingsTiles.indexOf('Profils') ? '' : 'cursor-pointer'} ${selectedIndex === settingsTiles.indexOf('Profils') ? 'bg-textSecoundary/70' : 'bg-disabled'} p-3 ${selectedIndex === settingsTiles.indexOf('Profils') ? '' : 'hover:bg-disabled/90'} text-textPrimary active:bg-textSecoundary/70`} onClick={selectedIndex === settingsTiles.indexOf('Profils') ? null : () => handleAccountClick()}><MdManageAccounts /></span>
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
                <div className={`${selectedIndex === 0 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Informations sur la pharmacie</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-x-2 small:gap-x-10">
                            <SettingsInput placeholder='Nom du pharmacie...' flexible={true} />
                            <SettingsInput placeholder='Adresse du pharmacie...' flexible={true} />
                            <SettingsInput placeholder='Numéro téléphone pharmacie...' flexible={true} />
                            <SettingsInput placeholder='Description...' large={true} flexible={true} />
                            <SettingsInput placeholder='Latitude' flexible={true} />
                            <SettingsInput placeholder='Longitude' flexible={true} />
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
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
                <div className={`${selectedIndex === 1 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Informations personnelles </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-x-2 small:gap-x-10">
                            <SettingsInput placeholder='Votre nom...' flexible={true} />
                            <SettingsInput placeholder='Votre prénom...' flexible={true} />
                            <SettingsInput placeholder='Votre numéro téléphone...' flexible={true} />
                            <SettingsInput placeholder='Votre adresse complète...' large={true} flexible={true} />
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
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

                {/* Security */}
                <div className={`${selectedIndex === 2 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Informations de sécurité</span>
                        <div className="grid grid-cols-1 overflow-y-auto mr-2 small:mr-20">
                            <SettingsInput placeholder='Adresse mail...' flexible={true} />
                            <span className="col-span-1 h-5" />
                            <SettingsInput placeholder='Nouveau mot de passe...' flexible={true} />
                            <SettingsInput placeholder='Confirmer le nouveau mot de passe...' flexible={true} />
                            <span className="col-span-1 h-5" />
                            <SettingsInput placeholder='Votre mot de passe actuel...' flexible={true} />
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
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

                {/* Notification Settings */}
                <div className={`${selectedIndex === 3 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Paramètres de notifications</span>
                        <div className="grid grid-cols-1 overflow-y-auto space-y-2 py-2">
                            {/* First Row */}
                            <div className="inline-flex flex-row w-full justify-between">
                                <span className="flex flex-col">
                                    <span>Émettre un son lorsqu'une notification d'ordonnance arrive.</span>
                                    <span className="text-textSecoundary italic text-sm">Nouvelle notification!</span>
                                </span>
                                <ToggleSwitch value={true} toggleSwitch={() => { }} />
                            </div>
                            {/* Secound Row */}
                            <div className="inline-flex flex-row w-full justify-between">
                                <span className="flex flex-col">
                                    <span>Émettre un son lorsqu'un client confirme qu'il va venir.</span>
                                    <span className="text-textSecoundary italic text-sm">Un client arrive!</span>
                                </span>
                                <ToggleSwitch value={false} toggleSwitch={() => { }} />
                            </div>
                            {/* Third Row */}
                            <div className="inline-flex flex-row w-full justify-between">
                                <span className="flex flex-col">
                                    <span>Afficher une boîte de dialogue toast lorsque des événements se produisent.</span>
                                    <span className="text-textSecoundary underline text-sm cursor-pointer" onClick={() => toast('Un dialogue toast!')}>Cliquez ici pour prévisualiser</span>
                                </span>
                                <ToggleSwitch value={true} toggleSwitch={() => { }} />
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
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

                {/* Profils Settings */}
                <div className={`${selectedIndex === 4 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <div className="inline-flex flex-row w-full justify-between items-center py-2">
                            <span className="font-medium">Gestion de profils</span>
                            <IoMdAdd className="text-textSecoundary cursor-pointer" onClick={() => {
                                console.log('Add Profile');
                            }} />
                        </div>
                        <div className="flex flex-col space-y-2 py-2">
                            <div className="flex flex-col small:inline-flex small:flex-row w-full justify-between items-start small:items-center">
                                <div className="inline-flex flex-row space-x-2 items-center">
                                    <img className="hidden sm:block h-12 w-12 rounded-full bg-gray-500" src={pfp4} />
                                    <span className="flex flex-col">
                                        <span className="font-medium">Harrison Pfannerstill</span>
                                        <span className="text-sm text-textSecoundary">Administrateur</span>
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-0 py-0 sm:space-y-2 sm:py-2 sm:inline-flex sm:flex-row space-x-4 items-center">
                                    <button className="text-red-500 underline text-sm">Supprimer</button>
                                    <DropdownMenu options={[{ label: 'Administrateur', value: 'admin' }, { label: 'Vendeur', value: 'vendeur' }]} label={'Role'} selectedValue={'admin'} onSelect={(value) => { }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
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
            </div>
        </div>
    </>);
}

export default Settings;