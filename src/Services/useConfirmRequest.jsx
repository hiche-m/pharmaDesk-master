import axios from "axios";
import { HOST, HOST_PORT_SEPARATOR, PORT } from "../Utils/Parameters.jsx";
import { useState } from 'react';

const useConfirmRequest = () => {

    const [success, setSuccess] = useState(null);

    const [isRequestLoading, setIsRequestLoading] = useState(false);

    const [hasError, setHasError] = useState(null);
    //get ID from localstorage when loading 
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    const confirmRequest = async (perscriptionId, clientId, notificationId, comment, gen) => {

        setIsRequestLoading(true);
        //if (idpharma == null || undefined) return setHasError('id empty')

        const body = {
            comment,
            gen
        };

        try {
            axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/Accept_prescription/${clientId}/${idpharma}/${perscriptionId}/${notificationId}`, body).then((res) => {

                if (!res) {
                    console.log("Error: ", res);
                    setSuccess(false);
                    setHasError(res);
                } else {
                    setSuccess(true);
                }
            });
        } catch (error) {
            setHasError(error);
            console.log(error);
        }
        setIsRequestLoading(false);
    }

    return { confirmRequest, success, isRequestLoading, hasError };
};

export default useConfirmRequest;