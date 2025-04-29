import React, { useEffect, useState } from "react";
import pfp4 from "../Assets/Images/pfp4.svg"
import { recentActivity, typeColors } from "../Utils/Data/ActivityData.jsx";
import ActivityTile from "./ActivityTile.jsx";
import NotificationTile from "./NotificationTile.jsx";
import { useSelector } from "react-redux";
import NotifictionsSkeleton from "../Skeletons/notifications_skeleton.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import { refresh_rate } from "../Utils/Parameters.jsx";
import SearchBar from "./SearchBar.jsx";

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
        updateTodayStats(); // Update today stats immediately when the effect runs

        const interval = setInterval(() => {
            fetchData(); // Fetch data periodically every 10 seconds
        }, 1000 * refresh_rate);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // const /* { isLoading, data, error, index } */notifObject = useSelector(state => state.notifications);
    const /* { isLoading, data, error, index } */confirmedNotifObject = useSelector(state => state.confirmedNotifications);

    const { fetchCommingClients, isLoadingNotificationConfirmation, isLoadingNotification, updateTodayStats, notificationListeRequests, notificationListeRequestsConfirmation, fetchNotif } = useStateContext();

    const [searchQuery, setSearchQuery] = useState("");

    const filterNotifications = (notifications) => {
        if (!searchQuery || searchQuery.length < 1) return notifications;

        const normalizedQuery = searchQuery.trim().toLowerCase();

        return notifications.filter((tile) => {
            const firstname = tile.firstname?.toLowerCase() || "";
            const lastname = tile.lastname?.toLowerCase() || "";
            const phoneNumbers = tile.phoneNumber?.split(";").map(num => num.trim()) || [];
            const fullName = `${firstname} ${lastname}`;

            return (
                firstname.includes(normalizedQuery) ||
                lastname.includes(normalizedQuery) ||
                fullName.includes(normalizedQuery) ||
                phoneNumbers.some(num => num.includes(normalizedQuery)) ||
                phoneNumbers.some(num => `0${num}`.includes(normalizedQuery))
            );
        });
    };
    const [filteredNewNotifications, setFilteredNewNotifications] = useState(filterNotifications(notificationListeRequests));
    const [filteredConfirmationNotifications, setFilteredConfirmationNotifications] = useState(filterNotifications(notificationListeRequestsConfirmation));

    useEffect(() => {

        const notifTemp = filterNotifications(notificationListeRequests);
        const confirmedNotifTemp = filterNotifications(notificationListeRequestsConfirmation);

        if(filteredNewNotifications != notifTemp){
            setFilteredNewNotifications(filterNotifications(notificationListeRequests));
        }

        if(filteredConfirmationNotifications != confirmedNotifTemp){
            setFilteredConfirmationNotifications(filterNotifications(notificationListeRequestsConfirmation));
        }

    }, [notificationListeRequestsConfirmation, notificationListeRequests]);

    return (<div className="w-full h-[100vh] min-h-[940px] min-w-[215px] bg-lightShapes flex flex-col grow space-y-5 p-2 overflow-y-auto px-4 py-10">
        <div className="flex flex-col">
            <div className="inline-flex mb-2">
                <span className="font-bold text-lg">Notifications</span>
            </div>
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            <div className="h-max w-full space-y-2">
                <div className="inline-flex mb-2 justify-between items-center ">
                    <span className="font-medium">Confirmation et Posiologie</span>
                </div>
                {(filteredConfirmationNotifications != null && filteredConfirmationNotifications.length < 1) && (<span className="flex flex-row px-4 text-textSecoundary italic font-light">Pas de notifications à confirmer.</span>)}
                {(isLoadingNotificationConfirmation) && <NotifictionsSkeleton length={2} />}
                {filteredConfirmationNotifications != null && filteredConfirmationNotifications.map((tile, not_index) => (<NotificationTile key={`confirm-notification-tile-${not_index}`} isConfirm={true} tile={tile} index={not_index} handleClick={() => openNotification(tile, 1)} />))}
            </div>
            <div className="my-5" />
            <div className="h-max w-full space-y-2">
                <div className="inline-flex mb-2">
                    <span className="font-medium">Nouvelles Commandes</span>
                </div>
                {(filteredNewNotifications != null && filteredNewNotifications.length < 1) && (<span className="flex flex-row px-4 text-textSecoundary italic font-light">Pas de nouvelles commandes.</span>)}
                {isLoadingNotification && <NotifictionsSkeleton />}
                {filteredNewNotifications != null && filteredNewNotifications.map((tile, not_index) => (<NotificationTile key={`notification-tile-${not_index}`} isConfirm={false} tile={tile} index={not_index} handleClick={() => openNotification(tile, 0)} />))}
            </div>
        </div>
    </div>);
}

export default SideContent;