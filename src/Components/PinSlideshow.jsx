import React, { useState } from "react";
import { useStateContext } from "../Context/ContextProvider.jsx";
import { AiFillPushpin } from "react-icons/ai";
import { formatDate } from "../Utils/Functions.jsx";
import Carousel from "./Carousel.jsx";
import { MdNavigateNext } from "react-icons/md";

const PinSlideshow = ({ className }) => {

    const {
        pinNotif, unpinNotif, pinnedNotifs, openNotification
    } = useStateContext();

    const [index, setIndex] = useState(0);

    const handleOpenModal = (tile) => {
        openNotification(tile, 1);
                /* openNotification(tile, 1)
        filteredNewNotifications */
    };

    const handleUnpin = (id) => {
        unpinNotif(id);
        setIndex((prevIndex) => (prevIndex >= pinnedNotifs.length - 1 ? 0 : prevIndex));
    }

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md flex flex-col space-y-2 relative h-full p-4`}>
            <span className="inline-flex justify-between items-center">
                <span className="text-sm font-medium">
                    Épingles
                </span>
                <div className="inline-flex">
                    <span className="text-xs font-medium mr-2">
                        {pinnedNotifs.length > 0 && (`${index + 1}/${pinnedNotifs.length}`)}
                    </span>
                <AiFillPushpin className="text-textSecoundary mr-1" />
                </div>
            </span>
            <div className="h-full w-full">
            {pinnedNotifs.length > 0 ? 
            (<Carousel pinnedNotifs={pinnedNotifs} index={index} />) 
            : (
                <span className="text-textSecoundary text-center">
                    Il n’y a aucune notification épinglée.
                </span>
            )}
            </div>
            {pinnedNotifs.length > 1 && (<div className="absolute z-10 w-full h-full inline-flex justify-between items-center top-0 left-0 p-4">
                <div
                className="cursor-pointer p-2 bg-textSecoundary/30 rounded-lg hover:bg-textSecoundary/40"
                 onClick={() => {
                    setIndex(index - 1 < 0 ? pinnedNotifs.length - 1 : index - 1);
                    }}>
                        <MdNavigateNext className="text-textSecoundary text-sm rotate-180" />
                </div>
                <div 
                className="cursor-pointer p-2 bg-textSecoundary/30 rounded-lg hover:bg-textSecoundary/40"
                onClick={() => {
                    setIndex(index + 1 >= pinnedNotifs.length ? 0 : index + 1);
                    }
                }
                >
                        <MdNavigateNext className="text-textSecoundary text-sm" />
                </div>
            </div>)}
            {pinnedNotifs.length > 0 && (<div className="inline-flex justify-between items-center relative z-20">
                <button className="text-textSecoundary text-xs font-medium hover:text-textSecoundary/70" onClick={() => handleUnpin(pinnedNotifs[index].idnotifications)}>
                    Désépingler
                </button>
                <button className="text-textSecoundary text-xs font-medium hover:text-textSecoundary/70" onClick={() => handleOpenModal(pinnedNotifs[index])}>
                    Ouvrir
                </button>
            </div>)}
        </div>
    );
}

export default PinSlideshow;