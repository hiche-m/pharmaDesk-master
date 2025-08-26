import React, { useEffect, useState, useMemo } from "react";
import pfp4 from "../Assets/Images/pfp4.svg";
import { recentActivity } from "../Utils/Data/ActivityData.jsx";
import ActivityTile from "./ActivityTile.jsx";
import NotificationTile from "./NotificationTile.jsx";
import { useSelector } from "react-redux";
import NotifictionsSkeleton from "../Skeletons/notifications_skeleton.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import { refresh_rate } from "../Utils/Parameters.jsx";
import SearchBar from "./SearchBar.jsx";

const SideContent = ({
  userData,
  handleRefresh = () => {},
  acivity = recentActivity,
  openNotification = (notification_data, type) => {},
  loading = false,
  refreshVar = 0, // Add this to trigger refreshes
}) => {
  // state for controlling refresh with intervals
  const [refrechingWithInterval, setrefrechingInterval] = useState(true);

  const {
  fetchCommingClients,
  isLoadingNotificationConfirmation,
  isLoadingNotification,
  updateTodayStats,
  fetchNotif,
  activeNotifications,        // Use these instead of raw lists
  activeNotificationsComing,  // Use these instead of raw lists
  notificationListeRequests,  // Keep for debugging
  notificationListeRequestsConfirmation, // Keep for debugging
  dismissedNotifs  // Add this line
} = useStateContext();

  // Fetch data when component mounts and when refreshVar changes
  useEffect(() => {
    console.log('SideContent: Starting fetch cycle...');
    
    const fetchData = () => {
      console.log('SideContent: Fetching notifications...');
      fetchNotif();
      fetchCommingClients();
    };

    fetchData();
    updateTodayStats();

    const interval = setInterval(() => {
      fetchData();
    }, 1000 * refresh_rate);

    return () => clearInterval(interval);
  }, [refreshVar]); // Add refreshVar as dependency

  // Debug effect to log state changes
  useEffect(() => {
    console.log('SideContent: Notification states updated');
    console.log('Raw notifications:', notificationListeRequests?.length || 0);
    console.log('Active notifications:', activeNotifications?.length || 0);
    console.log('Raw confirmations:', notificationListeRequestsConfirmation?.length || 0);
    console.log('Active confirmations:', activeNotificationsComing?.length || 0);
  }, [
    notificationListeRequests, 
    activeNotifications, 
    notificationListeRequestsConfirmation, 
    activeNotificationsComing
  ]);

  // optional if you still use redux
  const confirmedNotifObject = useSelector(
    (state) => state.confirmedNotifications
  );

  // search filter
  const [searchQuery, setSearchQuery] = useState("");

  const filterNotifications = (notifications) => {
    if (!notifications || !Array.isArray(notifications)) {
      console.log('filterNotifications: Invalid input:', notifications);
      return [];
    }
    
    if (!searchQuery || searchQuery.length < 1) return notifications;

    const normalizedQuery = searchQuery.trim().toLowerCase();

    return notifications.filter((tile) => {
      if (!tile) return false;
      
      const firstname = tile.firstname?.toLowerCase() || "";
      const lastname = tile.lastname?.toLowerCase() || "";
      const phoneNumbers =
        tile.phoneNumber?.split(";").map((num) => num.trim()) || [];
      const fullName = `${firstname} ${lastname}`;

      return (
        firstname.includes(normalizedQuery) ||
        lastname.includes(normalizedQuery) ||
        fullName.includes(normalizedQuery) ||
        phoneNumbers.some((num) => num.includes(normalizedQuery)) ||
        phoneNumbers.some((num) => `0${num}`.includes(normalizedQuery))
      );
    });
  };

  // compute filtered lists directly (no extra state)
  const filteredNewNotifications = useMemo(() => {
    const result = filterNotifications(activeNotifications || []);
    console.log('SideContent: Filtered new notifications:', result.length);
    return result;
  }, [searchQuery, activeNotifications]);

  const filteredConfirmationNotifications = useMemo(() => {
  const raw = activeNotificationsComing || [];
  console.log('SideContent: Raw confirmation notifications:', raw.length);
  console.log('SideContent: Dismissed IDs:', dismissedNotifs ? dismissedNotifs : 'Not loaded yet');
  
  const result = filterNotifications(raw);
  console.log('SideContent: Filtered confirmation notifications:', result.length);
  if (result.length === 0 && raw.length > 0) {
    console.log('SideContent: Filtered out due to search or other filters');
  }
  return result;
}, [searchQuery, activeNotificationsComing]);

  return (
    <div className="w-full h-[100vh] min-h-[940px] min-w-[215px] bg-lightShapes flex flex-col grow space-y-5 p-2 overflow-y-auto px-4 py-10">
      <div className="flex flex-col">
        <div className="inline-flex mb-2">
          <span className="font-bold text-lg">Notifications</span>
        </div>
        <SearchBar onSearch={(query) => setSearchQuery(query)} />

        {/* Confirmation notifications */}
        <div className="h-max w-full space-y-2">
          <div className="inline-flex mb-2 justify-between items-center ">
            <span className="font-medium">Confirmation et Posiologie</span>
            {/* Debug info - remove in production */}
            <span className="text-xs text-gray-500">
              ({filteredConfirmationNotifications.length})
            </span>
          </div>
          
          {/* Show loading state */}
          {isLoadingNotificationConfirmation && (
            <NotifictionsSkeleton length={2} />
          )}
          
          {/* Show empty message when not loading and no notifications */}
          {!isLoadingNotificationConfirmation && 
           filteredConfirmationNotifications.length < 1 && (
            <span className="flex flex-row px-4 text-textSecoundary italic font-light">
              Pas de notifications à confirmer.
            </span>
          )}
          
          {/* Show notifications */}
          {!isLoadingNotificationConfirmation &&
           filteredConfirmationNotifications.length > 0 &&
           filteredConfirmationNotifications.map((tile, not_index) => {
             if (!tile || !tile.idnotifications) {
               console.warn('SideContent: Invalid confirmation notification at index:', not_index);
               return null;
             }
             
             return (
               <NotificationTile
                 key={`confirm-notification-tile-${tile.idnotifications}-${not_index}`}
                 isConfirm={true}
                 tile={tile}
                 index={not_index}
                 handleClick={() => openNotification(tile, 1)}
               />
             );
           })
          }
        </div>

        <div className="my-5" />

        {/* New order notifications */}
        <div className="h-max w-full space-y-2">
          <div className="inline-flex mb-2">
            <span className="font-medium">Nouvelle Commande</span>
            {/* Debug info - remove in production */}
            <span className="text-xs text-gray-500">
              ({filteredNewNotifications.length})
            </span>
          </div>
          
          {/* Show loading state */}
          {isLoadingNotification && <NotifictionsSkeleton />}
          
          {/* Show empty message when not loading and no notifications */}
          {!isLoadingNotification && 
           filteredNewNotifications.length < 1 && (
            <span className="flex flex-row px-4 text-textSecoundary italic font-light">
              Pas de nouvelles commandes.
            </span>
          )}
          
          {/* Show notifications */}
          {!isLoadingNotification &&
           filteredNewNotifications.length > 0 &&
           filteredNewNotifications.map((tile, not_index) => {
             if (!tile || !tile.idnotifications) {
               console.warn('SideContent: Invalid new notification at index:', not_index);
               return null;
             }
             
             return (
               <NotificationTile
                 key={`notification-tile-${tile.idnotifications}-${not_index}`}
                 isConfirm={false}
                 tile={tile}
                 index={not_index}
                 handleClick={() => openNotification(tile, 0)}
               />
             );
           })
          }
        </div>
      </div>
    </div>
  );
};

export default SideContent;