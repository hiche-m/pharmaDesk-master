import React, { useEffect, useState, useRef } from "react";
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
  const fetchData = (isInitialLoad = false) => {
    fetchNotif(isInitialLoad);
    fetchCommingClients();
  };

  fetchData(true); // Initial load with full replacement
  updateTodayStats();

  const interval = setInterval(() => {
    fetchData(false); // Subsequent loads with merging
  }, 1000 * refresh_rate);

  return () => clearInterval(interval);
}, []);

// Or even better: Use a ref to track if it's the first load
const isFirstLoad = useRef(true);

useEffect(() => {
  const fetchData = () => {
    fetchNotif(isFirstLoad.current);
    fetchCommingClients();
    isFirstLoad.current = false;
  };

  fetchData();
  updateTodayStats();

  const interval = setInterval(() => {
    fetchData();
  }, 1000 * refresh_rate);

  return () => clearInterval(interval);
}, []);

    // const /* { isLoading, data, error, index } */notifObject = useSelector(state => state.notifications);
    const /* { isLoading, data, error, index } */confirmedNotifObject = useSelector(state => state.confirmedNotifications);

    const { fetchCommingClients, isLoadingNotificationConfirmation, isLoadingNotification, updateTodayStats, notificationListeRequests, notificationListeRequestsConfirmation, fetchNotif, pinnedNotifs } = useStateContext();

    const [searchQuery, setSearchQuery] = useState("");

    const isNotificationPinned = (notificationId) => {
    return pinnedNotifs.some(pinnedNotif => pinnedNotif.idnotifications === notificationId);
};

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

    // Use useMemo to memoize filtered results and prevent unnecessary recalculations
    const filteredNewNotifications = React.useMemo(() => {
        return filterNotifications(notificationListeRequests || []);
    }, [notificationListeRequests, searchQuery]);

    const filteredConfirmationNotifications = React.useMemo(() => {
        return filterNotifications(notificationListeRequestsConfirmation || []);
    }, [notificationListeRequestsConfirmation, searchQuery]);

    return (<div className="w-full h-[100vh] min-h-[940px] min-w-[215px] bg-lightShapes flex flex-col grow space-y-5 p-2 overflow-y-auto px-4 py-7">
        <div className="flex flex-col">
            <div className="inline-flex mb-2 pb-4">
                <span className="font-bold text-lg">Notifications</span>
            </div>
            <SearchBar 
            value={searchQuery} 
            onSearch={(query) => setSearchQuery(query)} 
        />
            <div className="h-max w-full space-y-2">
    <div className="inline-flex mb-2 justify-between items-center ">
        <span className="font-medium">Confirmation et Posiologie</span>
    </div>
    {(filteredConfirmationNotifications != null && filteredConfirmationNotifications.length < 1) && (
        <span className="flex flex-row px-4 text-textSecoundary italic font-light">
            Pas de notifications à confirmer.
        </span>
    )}
    {(isLoadingNotificationConfirmation) && <NotifictionsSkeleton length={2} />}
    {filteredConfirmationNotifications != null && filteredConfirmationNotifications.map((tile, not_index) => (
        <NotificationTile 
            key={`confirm-notification-tile-${tile.idnotifications || not_index}`} 
            isConfirm={true} 
            tile={tile} 
            index={not_index} 
            isPinned={isNotificationPinned(tile.idnotifications)} // Add this prop
            handleClick={() => openNotification(tile, 1)} 
        />
    ))}
</div>
            <div className="my-5" />
            <div className="h-max w-full space-y-2">
                <div className="inline-flex mb-2">
                    <span className="font-medium">Nouvelle Commande</span>
                </div>
                {(filteredNewNotifications != null && filteredNewNotifications.length < 1) && (<span className="flex flex-row px-4 text-textSecoundary italic font-light">Pas de nouvelles commandes.</span>)}
                {isLoadingNotification && <NotifictionsSkeleton />}
                {filteredNewNotifications != null && filteredNewNotifications.map((tile, not_index) => (<NotificationTile key={`notification-tile-${tile.idnotifications || not_index}`} isConfirm={false} tile={tile} index={not_index} handleClick={() => openNotification(tile, 0)} />))}
            </div>
        </div>
    </div>);
}

export default SideContent;