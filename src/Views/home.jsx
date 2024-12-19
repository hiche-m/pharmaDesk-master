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
import Modal from "../Components/NotificationModal.jsx";
import useConfirmRequest from "../Services/useConfirmRequest.jsx";
import useRefuseRequest from "../Services/useRefuseRequest.jsx";
import { useSelector } from "react-redux";
import useConfirmTransaction from "../Services/useConfirmTransaction.jsx";
import useFetchConfirmed from "../Services/useFetchConfirmed.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";

const Home = () => {

    const [refresh, setRefresh] = useState(0);

    const [selectedNot, setSelectedNot] = useState({});

    const [confirmType, setConfirmType] = useState(0);

    const {confirmePerscription,isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription} = useStateContext()

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
            alert("Request refused.");
            setRefresh(previous => previous + 1);
        } else if (refuseRequestObject.rHasError) {
            alert("An error has occured: " + refuseRequestObject.rHasError);
        }
        setModalOpen(false);
    };

    const handleAccept = async (pid, clientId) => {
        await confirmRequestObject.confirmRequest( pid, clientId);
        if (confirmRequestObject.success) {
            alert("Request accepted.");
            setRefresh(previous => previous + 1);
        } else if (confirmRequestObject.hasError) {
            alert("An error has occured: " + hasError);
        }
        setModalOpen(false);
    };

    const handleConfirm = async (pid, clientId, isOn) => {
       
        confirmePerscription(clientId,pid,isOn)
        setModalOpen(false);
    };

    const openNotification = (notification_data, type) => {
        setConfirmType(type);
        setSelectedNot(notification_data);
        handleOpenModal();
    };

    return (<>
        <div className="col-span-3 row-span-2 bg-lightShapes">
            <SideContent userData={data} handleRefresh={handleRefresh} openNotification={openNotification} loading={confirmRequestObject.isRequestLoading || isLoadingConfirmationPerscription} />
        </div>
        <div className="col-span-9 col-start-1 row-start-2 flex bg-background h-auto">
            <div className="w-max">
                <SideMenu option_list={[{ label: "Tableau de bord" }, { label: "Boutique", disabled: true }/* , { label: "Découvrir", disabled: true } */]/*  + Object.keys(data[0]) */} />
            </div>
            <div className="flex-1">
                <div className="max-w-[190px] sm:max-w-[825px] min-h-[465px] max-h-[580px] grid grid-cols-12 grid-rows-14 w-full h-auto space-x-2 space-y-2 pb-3 pr-3 pt-1 bg-background mb-40">
                    <HalfSlabs className="col-span-12 sm:col-span-5 small:col-span-2 sm:row-span-2 small:row-span-4" />
                    <IncomePerPost className="col-span-12 sm:col-span-7 small:col-span-6 sm:row-span-7 small:row-span-7" />
                    <DailyIncome className="col-span-12 min-h-48 sm:col-span-5 small:col-span-4 sm:row-span-5 small:row-span-7" />
                    <ActivePosts className="max-h-36 col-span-12 sm:col-span-4 small:col-span-2 sm:row-span-7 small:row-span-3" />
                    <WideGraph className="max-small:hidden sm:col-span-8 small:col-span-12 sm:row-span-7 small:row-span-7" />
                </div>
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onRefuse={handleRefuse}
            onAccept={handleAccept}
            onConfirm={handleConfirm}
            selectedNotification={selectedNot}
            confirmType={confirmType}
        />
    </>
    );
}

export default Home;