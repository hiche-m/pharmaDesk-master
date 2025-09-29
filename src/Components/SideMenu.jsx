import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

// Import your SVG files
import DashboardIcon from "../Assets/SVG/down.svg";
import HistoryIcon from "../Assets/SVG/down.svg";
import SettingsIcon from "../Assets/SVG/down.svg";
import HelpIcon from "../Assets/SVG/down.svg";
import LogoutIcon from "../Assets/SVG/down.svg";
import AnnouncementIcon from "../Assets/SVG/down.svg";

// SVG icon component
const SvgIcon = ({ src, alt, className = "" }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`w-5 h-5 ${className}`}
    />
  );
};

// Icon mapping for menu items
const iconMap = {
  "Tableau de bord": DashboardIcon,
  "Historique": HistoryIcon,
  "Annonces": AnnouncementIcon,
  "Paramètres": SettingsIcon,
  "Aide": HelpIcon,
  "Se déconnecter": LogoutIcon,
};

const SideMenu = ({ option_list, initialIndex = 0 }) => {
    const [index, setIndex] = useState(initialIndex);
    const location = useLocation();

    const renderedItems = [];

    const handleMenuSwitch = (index) => {
        setIndex(index);
    }

    const getIconComponent = (label, customIcon) => {
        // Use custom icon if provided, otherwise use the icon map
        const iconSrc = customIcon || iconMap[label];
        return iconSrc ? (
            <SvgIcon 
                src={iconSrc} 
                alt={`${label} icon`}
                className="text-current"
            />
        ) : null;
    };

    for (let i = 0; i < option_list.length; i++) {
        const { label, disabled = false, route, action, icon } = option_list[i];

        if (disabled) {
            renderedItems.push(
                <div className="flex flex-row justify-between items-center text-disabled" key={`menu-option-${label}-${i}`}>
                    <div className="flex items-center gap-3 grow bg-lightShapes rounded-md px-6 py-2 font-medium text-disabled">
                        {getIconComponent(label, icon)}
                        <span>{label}</span>
                    </div>
                    <IoLockClosedOutline />
                </div>
            );
        } else if (route) {
            const isActive = location.pathname === route;
            renderedItems.push(
                <Link to={route} key={`menu-option-${label}-${i}`}>
                    <div className="flex flex-row justify-between items-center">
                        <div 
                            onClick={() => handleMenuSwitch(i)} 
                            className={`flex items-center gap-3 grow rounded-md cursor-pointer px-6 py-2 font-medium transition-colors ${
                                isActive 
                                    ? "bg-disabled text-black" 
                                    : "text-textSecondary hover:bg-lightShapes"
                            }`}
                        >
                            {getIconComponent(label, icon)}
                            <span>{label}</span>
                        </div>
                    </div>
                </Link>
            );
        } else {
            renderedItems.push(
                <div key={`menu-option-${label}-${i}`} className="flex flex-row justify-between items-center">
                    <div 
                        onClick={() => action()} 
                        className="flex items-center gap-3 grow rounded-md cursor-pointer px-6 py-2 font-medium text-textSecondary hover:bg-lightShapes transition-colors"
                    >
                        {getIconComponent(label, icon)}
                        <span>{label}</span>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col space-y-1 mt-5 mx-2">
            {renderedItems}
        </div>
    );
}

export default SideMenu;