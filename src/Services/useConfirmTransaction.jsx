import axios from "axios";
import { HOST, HOST_PORT_SEPARATOR, PORT } from "../Utils/Parameters.jsx";
import { useState } from 'react';

const useConfirmTransaction = () => {

    const [success, setSuccess] = useState(null);

    const [isTransactionLoading, setIsTransactionLoading] = useState(false);

    const [hasError, setHasError] = useState(null);

    const confirmTransaction = async (userId, perscriptionId, clientId, formData) => {

        setIsTransactionLoading(true);

        try {

            const body = {
                idClient: clientId,
                posiologies: formData,
            };
            console.log(body);
            axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/Confirmation_prescription/${userId}/${perscriptionId}`, body).then((res) => {
                if (!res.ok) {
                    throw new Error('An error has occured, please try again in a moment...');
                } else {
                    setSuccess(true);
                }
            });
        } catch (error) {
            setHasError(error);
            console.log(error);
        }
        setIsTransactionLoading(false);
    }

    return { confirmTransaction, success, isTransactionLoading, hasError };
};

export default useConfirmTransaction;