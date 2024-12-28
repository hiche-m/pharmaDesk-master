import { HOST, PORT } from "../Utils/Parameters.jsx";
import { useState } from 'react';
import axios from "axios";

const useRefuseRequest = () => {

    const [rsuccess, setRSuccess] = useState(null);

    const [isRRequestLoading, setIsRRequestLoading] = useState(false);

    const [rHasError, setRHasError] = useState(null);

    const refuseRequest = async (notificationId) => {
        console.log('this is notification id ', notificationId);

        setIsRRequestLoading(true);

        try {
            axios.delete(`${HOST}/api/refuseOrder/${notificationId}`).then((res) => {
                if (!res) {
                    throw new Error('An error has occured, please try again in a moment...');
                } else {
                    setRSuccess(true);
                }
            });
        } catch (error) {
            setRHasError(error);
            console.log(error);
        }
        setIsRRequestLoading(false);
    }

    return { refuseRequest, rsuccess, isRRequestLoading, rHasError };
};

export default useRefuseRequest;