import axios from "axios";
import { HOST } from "../Utils/Parameters.jsx";
import { useState } from 'react';

const useConfirmRequest = () => {

    const [success, setSuccess] = useState(null);

    const [isRequestLoading, setIsRequestLoading] = useState(false);

    const [hasError, setHasError] = useState(null);
    //get ID from localstorage when loading 
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    const confirmRequest = async (perscriptionId, clientId) => {

        setIsRequestLoading(true);
        //if (idpharma == null || undefined) return setHasError('id empty')

        try {
            axios.get(`${HOST}/api/Accept_prescription/${clientId}/${idpharma}/${perscriptionId}`).then((res) => {

                if (!res) {
                    throw new Error('An error has occured, please try again in a moment...');
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