import React, { useEffect, useState } from "react";
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
    const [showUnpinModal, setShowUnpinModal] = useState(false); // Add this
    const [notificationToUnpin, setNotificationToUnpin] = useState(null); // Add this



    useEffect(() => {
        const playNext = () => {
            setIndex((prevIndex) => (prevIndex >= pinnedNotifs.length - 1 ? 0 : prevIndex + 1));
        };

        const interval = setInterval(() => {
            playNext();
        }, 5000); 

        return () => clearInterval(interval);
    }, [pinnedNotifs.length]);

    const handleOpenModal = (tile) => {
        openNotification(tile, 1);
                /* openNotification(tile, 1)
        filteredNewNotifications */
    };

    const handleUnpin = (id) => {
    // Instead of directly unpinning, show confirmation modal
    setNotificationToUnpin(id);
    setShowUnpinModal(true);
};

// Add new function for confirmed unpin
const confirmUnpin = () => {
    unpinNotif(notificationToUnpin);
    setIndex((prevIndex) => (prevIndex >= pinnedNotifs.length - 1 ? 0 : prevIndex));
    setShowUnpinModal(false);
    setNotificationToUnpin(null);
};

// Add function to cancel unpin
const cancelUnpin = () => {
    setShowUnpinModal(false);
    setNotificationToUnpin(null);
};

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md flex flex-col relative h-full p-4`}>
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
            {pinnedNotifs.length > 1 && (<div className="absolute z-10 w-full h-full inline-flex justify-between items-center top-0 left-0 p-4 opacity-10 hover:opacity-100 transition ease-out">
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
            {pinnedNotifs.length > 0 && (<div className="inline-flex justify-between items-center relative z-20 flex w-full gap-x-2">
                <button className="flex-1 text-black text-xs font-medium hover:text-textSecoundary/70 border border-textSecoundary rounded-md px-6 py-1" onClick={() => handleUnpin(pinnedNotifs[index].idnotifications)}>
                    Désépingler
                </button>
                <button className="flex-1 text-black text-xs font-medium hover:text-textSecoundary/70 border border-primary bg-primary rounded-md py-1 px-6" onClick={() => handleOpenModal(pinnedNotifs[index])}>
                    Ouvrir
                </button>
            </div>)}
            {showUnpinModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                    <h3 className="text-lg font-semibold mb-4">
                         voulez-vous vraiment désépinglé cette commande  ?
                    </h3>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={cancelUnpin}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={confirmUnpin}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Désépingler
                        </button>
                    </div>
                </div>
            </div>
        )}

        </div>
    );
}

export default PinSlideshow;