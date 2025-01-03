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


const Home = () => {

    const [refresh, setRefresh] = useState(0);

    const [selectedNot, setSelectedNot] = useState({});

    const [confirmType, setConfirmType] = useState(0);

    const {
        confirmePerscription, isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription,
    } = useStateContext();

    const { handleLogout } = useAuthContext()
    const navigate = useNavigate(0);

    //useFetch(refresh);

    //useFetchConfirmed(refresh);

    const /* { confirmRequest, success, isRequestLoading, hasError } */ confirmRequestObject = useConfirmRequest();

    const /* { refuseRequest, rsuccess, isRRequestLoading, rHasError } */ refuseRequestObject = useRefuseRequest();

    const { isLoading, data, error } = useSelector(state => state.user);

    useEffect(() => {
        /*    const interval = setInterval(() => {
              setRefresh(prev => prev + 1);
          }, refresh_rate * 1000);
  
          return () => clearInterval(interval);  */
    }, []);

    const handleRefresh = () => {
        setRefresh(previous => previous + 1);
    }
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedNot({});
        setModalOpen(false);
    };

    const handleRefuse = async (nid) => {
        await refuseRequestObject.refuseRequest(nid);
        if (refuseRequestObject.rsuccess) {
            console.log("Request refused.");
            setRefresh(previous => previous + 1);
        } else if (refuseRequestObject.rHasError) {
            console.log("An error has occured: " + refuseRequestObject.rHasError);
        }
        setModalOpen(false);
    };

    const handleAccept = async (pid, clientId, comment, genList) => {

        let gen = {};

        genList.map((value, index) => {
            gen[index] = value;
        });

        await confirmRequestObject.confirmRequest(pid, clientId, comment, gen);
        if (confirmRequestObject.success) {
            console.log("Request accepted.");
            setRefresh(previous => previous + 1);
        } else if (confirmRequestObject.hasError) {
            console.log("An error has occured: " + hasError);
        }
        setModalOpen(false);
    };

    const handleConfirm = async (pid, clientId, isOn) => {

        confirmePerscription(clientId, pid, isOn)
        setModalOpen(false);
    };

    const openNotification = (notification_data, type) => {
        setConfirmType(type);
        setSelectedNot(notification_data);
        handleOpenModal();
    };

    const handleDisconnect = () => {
        handleLogout();
        navigate(0);
    }

    return (<>
        <div className="col-span-3 row-span-2 bg-lightShapes">
            <SideContent userData={data} refreshVar={refresh} handleRefresh={handleRefresh} openNotification={openNotification} loading={confirmRequestObject.isRequestLoading || isLoadingConfirmationPerscription} />
        </div>
        <div className="col-span-9 col-start-1 row-start-2 flex h-auto mb-10">
            <div className="w-max">
                <SideMenu option_list={[{ label: "Tableau de bord", route: '/dashboard' }, { label: "Boutique", disabled: true, route: '/dashboard/store' }, { label: "Annonces", disabled: true, route: '/dashboard/feed' }, { label: "Paramètres", route: '/dashboard/settings' }, { label: "Se déconnecter", action: () => handleDisconnect() }/* , { label: "Découvrir", disabled: true } */]/*  + Object.keys(data[0]) */} />
            </div>
            <div className="flex-1">
                <div className="sm:max-w-[825px] min-h-[465px] max-h-[580px] grid grid-cols-12 grid-rows-14 w-full h-auto space-x-4 space-y-4 pb-3 pr-3 pt-4 mb-40 sm:mb-60">
                    <Outlet />
                </div>
            </div>
        </div>
        {confirmType === 0 ? (<NotificationModal isOpen={isModalOpen} onClose={handleCloseModal} onRefuse={handleRefuse} onAccept={handleAccept} selectedNotification={selectedNot} />)
            : (<ConfirmationModal isOpen={isModalOpen} onClose={handleCloseModal} onRefuse={handleRefuse} onConfirm={handleConfirm} selectedNotification={selectedNot} />)}
    </>
    );
}

export default Home;