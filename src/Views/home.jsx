import React, { useEffect, useState } from "react";
import SideMenu from "../Components/SideMenu.jsx";
import HalfSlabs from "../Components/HalfSlabs.jsx";
import IncomePerPost from "../Components/IncomePerPost.jsx";
import DailyIncome from "../Components/DailyIncome.jsx";
import ActivePosts from "../Components/ActivePosts.jsx";
import WideGraph from "../Components/WideGraph.jsx";
import SideContent from "../Components/SideContent.jsx";
import useFetch from "../Services/UseFetch.jsx";
import { refresh_rate } from "../Utils/Parameters.jsx";
import NotificationModal from "../Components/NotificationModal.jsx";
import ConfirmationModal from "../Components/ConfirmationModal.jsx";
import useConfirmRequest from "../Services/useConfirmRequest.jsx";
import useRefuseRequest from "../Services/useRefuseRequest.jsx";
import { useSelector } from "react-redux";
import useConfirmTransaction from "../Services/useConfirmTransaction.jsx";
import useFetchConfirmed from "../Services/useFetchConfirmed.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import { useAuthContext } from '../Context/AuthProvider.jsx';
import DashHeader from "../Components/DashboardHeader.jsx";
import DashCard from "../Components/DashboardCard.jsx";
import { Outlet, useNavigate } from 'react-router-dom';
import TailwindConfirmModal from "../Components/TailwindConfirmModal.jsx";

const Home = () => {
    const [refresh, setRefresh] = useState(0);

    // Remove local dismissed state - use context instead
    const {
        confirmePerscription, 
        isLoadingConfirmationPerscription, 
        setIsLoadingConfirmationPerscription, 
        selectedNot,
        setSelectedNot, 
        confirmType, 
        isModalOpen, 
        setModalOpen, 
        handleOpenModal, 
        openNotification, 
        removeNotif,
        dismissNotif,  // Use context's dismiss function
        fetchNotif,    // Add these to force refresh when needed
        fetchCommingClients
    } = useStateContext();

    const { handleLogout } = useAuthContext();
    const navigate = useNavigate();

    // Force refresh notifications on component mount
    useEffect(() => {
        console.log('Home component mounted, fetching notifications...');
        fetchNotif();
        fetchCommingClients();
    }, []);

    const confirmRequestObject = useConfirmRequest();
    const refuseRequestObject = useRefuseRequest();

    const { isLoading, data, error } = useSelector(state => state.user);

    const handleRefresh = () => {
        console.log('Manual refresh triggered');
        setRefresh(previous => previous + 1);
        // Force fetch notifications
        fetchNotif();
        fetchCommingClients();
    }

    const handleCloseModal = () => {
        setSelectedNot({});
        setModalOpen(false);
    };

    const handleRefuse = async (nid) => {
        console.log('Refusing notification:', nid);
        
        try {
            await refuseRequestObject.refuseRequest(nid);
            if (refuseRequestObject.rsuccess) {
                console.log("Request refused.");
                // Use context's dismiss function instead of local one
                dismissNotif(nid);
                setRefresh(previous => previous + 1);
            } else if (refuseRequestObject.rHasError) {
                console.log("An error has occurred: " + refuseRequestObject.rHasError);
            }
        } catch (error) {
            console.error('Error refusing request:', error);
        }
        
        setModalOpen(false);
    };

const handleAccept = async (pid, clientId, notificationId, comment, genList) => {
  console.log('Accepting notification:', notificationId);

  let gen = {};
  genList.map((value, index) => {
    gen[index] = value;
  });

  try {
    await confirmRequestObject.confirmRequest(pid, clientId, notificationId, comment, gen);
    if (confirmRequestObject.success) {
      console.log("Request accepted.");
      
      // Remove from new notifications without dismissing
      removeNotif({ idnotifications: notificationId });
      
      // Optional: If sockets are unreliable, force fetch after a delay
      // setTimeout(() => fetchCommingClients(), 500);
      
      setRefresh(previous => previous + 1);
    } else if (confirmRequestObject.hasError) {
      console.log("An error has occurred: " + confirmRequestObject.hasError);
    }
  } catch (error) {
    console.error('Error accepting request:', error);
  }
  
  setModalOpen(false);
};

    const handleConfirm = async (pid, clientId, isOn) => {
        console.log('Confirming prescription:', pid, 'for client:', clientId);

        try {
            await confirmePerscription(clientId, pid, isOn);
            console.log('Prescription confirmed successfully');
            
            // Don't dismiss here - let the socket event handle it
            // The 'prescription_confirmed_notification' socket event should remove it
            setRefresh(previous => previous + 1);
        } catch (error) {
            console.error('Error confirming prescription:', error);
        }
        
        setModalOpen(false);
    };

    /////////////////////////////////////////////////////////////////// Delete Modal Dialog
    const [disconnectDialogShowing, setDeleteDialogShowing] = useState(false);

    const cancelAction = () => {
        setDeleteDialogShowing(false);
    };

    const disconnectAction = () => {
  handleLogout();
  clearDismissedNotifs();  // Add this to reset dismissed list
  navigate(0);
  setDeleteDialogShowing(false);
};

    const handleDisconnectOnClick = (index) => {
        setDeleteDialogShowing(true);
    };

    return (
        <>
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
            <div className="col-span-3 row-span-2 bg-lightShapes">
                <SideContent
                    userData={data}
                    refreshVar={refresh}
                    handleRefresh={handleRefresh}
                    openNotification={openNotification}
                    loading={confirmRequestObject.isRequestLoading || isLoadingConfirmationPerscription}
                />
            </div>
            <div className="col-span-9 col-start-1 row-start-2 flex h-auto mb-10">
                <div className="w-max">
                    <SideMenu
                        option_list={[
                            { label: "Tableau de bord", route: "/dashboard" },
                            { label: "Boutique", disabled: true, route: "/dashboard/store" },
                            { label: "Annonces", disabled: true, route: "/dashboard/feed" },
                            { label: "Paramètres", route: "/dashboard/settings" },
                            { label: "Aide", route: "/help", disabled: true },
                            { label: "Se déconnecter", action: handleDisconnectOnClick },
                        ]}
                    />
                </div>
                <div className="flex-1">
                    <div className="sm:max-w-[825px] min-h-[465px] max-h-[580px] grid grid-cols-12 grid-rows-14 w-full h-auto space-x-4 space-y-4 pb-3 pr-3 pt-4 mb-40 sm:mb-60">
                        <Outlet />
                    </div>
                </div>
            </div>
            {confirmType === 0 ? (
                <NotificationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onRefuse={handleRefuse}
                    onAccept={handleAccept}
                    selectedNotification={selectedNot}
                />
            ) : (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onRefuse={handleRefuse}
                    onConfirm={handleConfirm}
                    selectedNotification={selectedNot}
                />
            )}
        </>
    );
}

export default Home;