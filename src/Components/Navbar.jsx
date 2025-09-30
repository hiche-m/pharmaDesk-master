import React, { useEffect, useState } from "react";
import home_full from "../Assets/SVG/home_filled.svg"
import home_outline from "../Assets/SVG/home_outline.svg"
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { IoLockClosedOutline } from "react-icons/io5";
import pfp4 from "../Assets/Images/pfp4.svg"
import logo from "../Assets/SVG/Asset 3.svg"
import dropDown from "../Assets/SVG/Chevron down.svg"
import textSvg from "../Assets/SVG/text_color.svg"
import banner from "../Assets/GIF/banner1.gif"
import { useAuthContext } from '../Context/AuthProvider.jsx';
import { useStateContext } from "../Context/ContextProvider.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import TailwindConfirmModal from "../Components/TailwindConfirmModal.jsx"; // Add this import


// ADD THESE IMPORT STATEMENTS
import settingsIcon from "../Assets/SVG/settings-02.svg"; // Add your settings icon path
import logoutIcon from "../Assets/SVG/disconnect.svg"; // Add your logout icon path

const Navbar = () => {
    const location = useLocation();
    const { getUserData } = useStateContext();

    const [storeInfo, setStoreInfo] = useState(null);
    const [cacheBuster, setCacheBuster] = useState(Date.now());
    const [disconnectDialogShowing, setDeleteDialogShowing] = useState(false);
    const { handleLogout } = useAuthContext()
    
    
    // ADD DROPDOWN STATE
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const fetchInfo = () => {
        const info = getUserData();
        console.log('Navbar fetchInfo called, data:', info);
        setStoreInfo(info);
        setCacheBuster(Date.now());
    };

    // ADD DROPDOWN TOGGLE FUNCTION
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // ADD CLOSE DROPDOWN FUNCTION
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    // ADD CLICK OUTSIDE HANDLER
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close dropdown if click is outside the dropdown area
            if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleDisconnectOnClick = (index) => {
        /* Open Dialog */
        setDeleteDialogShowing(true);
        closeDropdown();
    };

    const handleLogoutClick = () => {
    handleDisconnectOnClick();
};

const disconnectAction = () => {
    // Add your logout logic here
    console.log("User logged out");
    handleLogout();
    // Then navigate to login page
    navigate(0);
    setDeleteDialogShowing(false);
};

const cancelAction = () => {
    setDeleteDialogShowing(false);
};


    useEffect(() => {
        console.log('Navbar useEffect triggered');
        fetchInfo();

        const handleUserDataUpdated = () => {
            console.log('userDataUpdated event received in Navbar');
            fetchInfo();
        };

        window.addEventListener("userDataUpdated", handleUserDataUpdated);

        return () => {
            window.removeEventListener("userDataUpdated", handleUserDataUpdated);
        };
    }, []);

    useEffect(() => {
        console.log('Location changed, refreshing navbar data');
        fetchInfo();
    }, [location.pathname]);

    if (!storeInfo) {
        return <LoadingSpinner />;
    }

    return (
        <>
        <div style={{position: 'fixed', bottom: 10, right: 10, background: '#000', color: '#fff', padding: '5px 10px', borderRadius: 5}}>
        Version last version 23 - UPDATE TEST ✅
        </div>
        
        {disconnectDialogShowing && (
                <TailwindConfirmModal
                    className="absolute z-50"
                    title="Êtes-vous sûr de vouloir vous déconnecter ?"
                    content="Cela déconnectera votre session sur ce compte. Vous devrez saisir vos informations de connexion pour l'utiliser à nouveau."
                    actionLabel="Se déconnecter"
                    cancelLabel="Annuler"
                    actionFunction={disconnectAction}
                    cancelAction={cancelAction}
                />
            )}
            
        <div className="col-span-9 inline-flex items-center justify-between text-base font-medium text-textSecoundary px-4 space-x-4 border-b-2 border-lightShapes">
            <div className="inline-flex items-center justify-start">
                <img src={logo} className="h-20 p-4" />
            </div>
            
            {/* ADD DROPDOWN CONTAINER */}
            <div className="dropdown-container relative">
                <div 
                    className="flex flex-row items-center space-x-3 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <img src={`${storeInfo.profilePic ?? pfp4}?t=${cacheBuster}`} className="h-8 w-8 rounded-full" />
                    <div className="font-medium text-textPrimary">{storeInfo.storeName}</div>
                    <img src={dropDown} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {/* ADD DROPDOWN MENU */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-lightShapes z-50">
                        {/* Settings Button */}
                                    <Link 
                to="/dashboard/settings"
                className="flex items-center w-full px-4 py-2 text-sm text-textPrimary hover:bg-lightShapes transition-colors"
                onClick={closeDropdown}
            >
                <img src={settingsIcon} className="w-4 h-4 mr-3" alt="Paramètres" />
                <span>Paramètres</span>
            </Link>

                        
                        {/* Logout Button */}
                        <button 
                            onClick={handleLogoutClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-textPrimary hover:bg-lightShapes transition-colors border-t border-lightShapes"
                        >
                            <img src={logoutIcon} className="w-4 h-4 mr-3" alt="Se déconnecter" />
                            <span>Se déconnecter</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>
    );
}

export default Navbar;