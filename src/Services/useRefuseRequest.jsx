import { HOST, PORT } from "../Utils/Parameters.jsx";
import { useState } from 'react';

const useRefuseRequest = () => {

    const [rsuccess, setRSuccess] = useState(null);

    const [isRRequestLoading, setIsRRequestLoading] = useState(false);

    const [rHasError, setRHasError] = useState(null);

    const refuseRequest = async (notificationId) => {
    console.log('this is notification id ',notificationId);

        setIsRRequestLoading(true);

        try {
            const res = await fetch(`${HOST}/api/refuseOrder/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('An error has occured, please try again in a moment...');
            }

            console.log(await res.json());
            setRSuccess(true);
        } catch (error) {
            setRHasError(error);
            console.log(error);
        }
        setIsRRequestLoading(false);
    }

    return { refuseRequest, rsuccess, isRRequestLoading, rHasError };
};

export default useRefuseRequest;