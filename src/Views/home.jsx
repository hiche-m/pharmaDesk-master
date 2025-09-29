import React, { useEffect, useState, useRef } from "react";
import SideMenu from "../Components/SideMenu.jsx";
import HalfSlabs from "../Components/HalfSlabs.jsx";
import IncomePerPost from "../Components/IncomePerPost.jsx";
import DailyIncome from "../Components/DailyIncome.jsx";
import ActivePosts from "../Components/ActivePosts.jsx";
import WideGraph from "../Components/WideGraph.jsx";
import SideContent from "../Components/SideContent.jsx";
import useFetch from "../Services/UseFetch.jsx";
import { refresh_rate } from "../Utils/Parameters.jsx";
import { toast } from 'react-toastify';

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
import DashboardIcon from "../Assets/SVG/Dashboard.svg";
import HistoryIcon from "../Assets/SVG/histor.svg";
import SettingsIcon from "../Assets/SVG/settings-02.svg";
import HelpIcon from "../Assets/SVG/help.svg";
//import LogoutIcon from "./Assets/SVG/logout.svg";



const Home = () => {
    
    const [refresh, setRefresh] = useState(0);

    const {
        confirmePerscription, isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription, selectedNot,
        setSelectedNot, confirmType, isModalOpen, setModalOpen, handleOpenModal, openNotification, removeNotif
    } = useStateContext();

    //useFetch(refresh);

    //useFetchConfirmed(refresh);

    const /* { confirmRequest, success, isRequestLoading, hasError } */ confirmRequestObject = useConfirmRequest();

    const /* { refuseRequest, rsuccess, isRRequestLoading, rHasError } */ refuseRequestObject = useRefuseRequest();

    const { isLoading, data, error } = useSelector(state => state.user);

    const handleRefresh = () => {
        setRefresh(previous => previous + 1);
    }

    const handleCloseModal = () => {
        setSelectedNot({});
        setModalOpen(false);
    };

  const handleRefuse = async (nid) => {
  const result = await refuseRequestObject.refuseRequest(nid);
  
  if (result.success) {
    console.log("Commande refused.");
    removeNotif({ idnotifications: nid });
    toast("Commande refusée !");
    setRefresh(prev => prev + 1);
  } else {
    console.error("Commande refusal error:", result.error);
  }
  setModalOpen(false);
};

const handleRefuseConfirmation = async (nid) => {
  const result = await refuseRequestObject.refuseRequest(nid);
  
  if (result.success) {
    console.log("Vente refused.");
    removeNotif({ idnotifications: nid });
    toast("Vente refusée !"); 
  } else {
    console.error("Vente refusal error:", result.error);
  }
  setModalOpen(false);
};


    const handleAccept = async (pid, clientId, notificationId, comment, genList) => {
  let gen = {};
  genList.forEach((value, index) => {
    gen[index] = value;
  });

  const ok = await confirmRequestObject.confirmRequest(pid, clientId, notificationId, comment, gen);

  if (ok) {
    console.log("Request accepted.");
    removeNotif({ idnotifications: notificationId }); // ✅ always remove
    setRefresh(previous => previous + 1);
  } else {
    console.log("An error has occurred: ", confirmRequestObject.hasError);
  }

  setModalOpen(false);
};


    const handleConfirm = async (pid, clientId, isOn) => {
  console.log('handleConfirm called with:', { pid, clientId, isOn, selectedNotId: selectedNot.idnotifications });
  
  const ok = await confirmePerscription(clientId, pid, isOn);
  if (ok) {
    // Remove notification from UI immediately
    removeNotif({ idnotifications: selectedNot.idnotifications });
    console.log('Notification removed from state');
    // Don't refresh immediately - let the socket handle updates
    // setRefresh(prev => prev + 1); // Remove this line
  } else {
    console.error('Confirmation failed');
  }
  setModalOpen(false);
};

    /* const handleDisconnect = () => {
        handleLogout();
        navigate(0);
    } */

    /////////////////////////////////////////////////////////////////// Delete Modal Dialog

    return (
        <>
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
                            { label: "Tableau de bord", route: "/dashboard",icon: DashboardIcon  },
                            { label: "Historique", route: "/dashboard/store",icon: HistoryIcon   },
                            //{ label: "Annonces", disabled: true, route: "/dashboard/feed" },
                            { label: "Paramètres", route: "/dashboard/settings",icon: SettingsIcon   },
                            { label: "Aide", route: "/dashboard/help",icon: HelpIcon   },
                            //{ label: "Se déconnecter", action: handleDisconnectOnClick },
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
                onRefuse={handleRefuseConfirmation}
                onConfirm={handleConfirm}
                selectedNotification={selectedNot}
                />
            )}
        </>
    );
}

export default Home;