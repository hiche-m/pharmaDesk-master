import React, { useEffect, useState } from "react";
import pfp4 from "../Assets/Images/pfp4.svg"
import { recentActivity, typeColors } from "../Utils/Data/ActivityData.jsx";
import ActivityTile from "./ActivityTile.jsx";
import NotificationTile from "./NotificationTile.jsx";
import { useSelector } from "react-redux";
import NotifictionsSkeleton from "../Skeletons/notifications_skeleton.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";

const SideContent = ({ userData, handleRefresh = () => { }, acivity = recentActivity, openNotification = (notification_data, type) => { }, loading = false }) => {

    // use sate for changing refrechging with intervals
    const [refrechingWithInterval, setrefrechingInterval] = useState(true)

    useEffect(() => {
        // Function to fetch notifications and clients
        const fetchData = () => {
            fetchNotif();
            fetchCommingClients();
        };

        fetchData(); // Fetch data immediately when the effect runs

        const interval = setInterval(() => {
            fetchData(); // Fetch data periodically every 10 seconds
        }, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // const /* { isLoading, data, error, index } */notifObject = useSelector(state => state.notifications);
    const /* { isLoading, data, error, index } */confirmedNotifObject = useSelector(state => state.confirmedNotifications);

    const { storeName, fetchCommingClients, isLoadingNotificationConfirmation, isLoadingNotification, setIsLoadingNotifaction, notificationListeRequests, notificationListeRequestsConfirmation, fetchNotif } = useStateContext()
    return (
        <>
            <div className="w-full h-full min-w-[215px] bg-lightShapes flex flex-col grow space-y-5 p-2 overflow-y-auto overflow-x-auto">
                <div className="self-end flex flex-row items-center">
                    <div className="flex flex-col items-end p-4">
                        <div className="text-sm font-medium text-textPrimary">{storeName}</div>
                        <div className="text-xs text-textSecoundary">Administrateur</div>
                    </div>
                    <img src={pfp4} className="h-8 w-8 rounded-full" />
                </div>
                {/* <div className="flex flex-col">
                    <div className="font-medium mb-2">Activité Récente</div>
                    {acivity.map(
                        (tile, index) => {
                            const color = typeColors[tile.type];
                            return (<ActivityTile key={`activity-tile-${index}`} tile={tile} last={index === (acivity.length - 1)} color={color} />);
                        }
                    )}
                </div> */}
                <div className="flex flex-col">
                    <div className="h-max w-full space-y-2">
                        <div className="inline-flex mb-2 justify-between items-center ">
                            <span className="font-medium">Confirmation et Posiologie</span>
                            {!(isLoadingNotification || isLoadingNotificationConfirmation) && (<span className="text-sm ml-2 text-textSecoundary cursor-pointer" onClick={() => handleRefresh()}>Refresh</span>)}
                            {(isLoadingNotification || isLoadingNotificationConfirmation) && (<span className="text-sm ml-2 text-disabled">Refresh</span>)}
                        </div>
                        {(isLoadingNotificationConfirmation) && <NotifictionsSkeleton length={2} />}

                        {notificationListeRequestsConfirmation != null && notificationListeRequestsConfirmation.map((tile, not_index) => (<NotificationTile key={`confirm-notification-tile-${not_index}`} tile={tile} index={not_index} handleClick={() => openNotification(tile, 1)} />))}
                    </div>
                    <div className="my-5" />
                    <div className="h-max w-full space-y-2">
                        <div className="inline-flex mb-2">
                            <span className="font-medium">Notifications d'ordonnances</span>
                        </div>
                        {(notificationListeRequests != null && notificationListeRequests.length < 1) && (<span className="flex flex-row px-4 text-textSecoundary italic font-light">Il n'y a pas de notifications</span>)}
                        {isLoadingNotification && <NotifictionsSkeleton />}
                        {notificationListeRequests != null && notificationListeRequests.map((tile, not_index) => (<NotificationTile key={`notification-tile-${not_index}`} tile={tile} index={not_index} handleClick={() => openNotification(tile, 0)} />))}
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
        </>
    );
}

export default SideContent;