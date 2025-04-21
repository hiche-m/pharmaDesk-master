import axios from "axios";
import { useState } from "react"
import { HOST, HOST_PORT_SEPARATOR, PORT } from "../Utils/Parameters.jsx";
import { capFix } from "../Utils/Functions.jsx";
import { toast } from "react-toastify";

const useUpdateInfo = () => {

    const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

    const [profileUpdateError, setProfileUpdateError] = useState(null);

    const jsonId = localStorage.getItem('idpharma');
    const idpharma = JSON.parse(jsonId);
    const notificationObject = JSON.parse(localStorage.getItem('notification'));

    /* { confirmationSound, notificationSound, showToast } */

    const updateProfile = async (pharmacyForm, personalForm) => {
        setProfileUpdateLoading(true);

        let phone = pharmacyForm.phone;
        let adress = pharmacyForm.adress;

        if (!phone) {
            phone = personalForm.phone;
        }

        if (!adress) {
            adress = personalForm.adress;
        }

        const body = {
            storeName: pharmacyForm.storeName,
            nameOwner: personalForm.firstName && personalForm.lastName ? capFix(`${personalForm.lastName} ${personalForm.firstName}`) : null,
            nis: null,
            nif: null,
            services: null,
            phoneNumber: phone,
            description: pharmacyForm.description,
            email: null,
            latitude: pharmacyForm.latitude,
            longitude: pharmacyForm.longitude,
            adresse: adress,
        };

        try {
            axios.put(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/updateProfile/${idpharma}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if (!res) {
                    const err = 'Could not complete the put request.'
                    setProfileUpdateError(err);
                    console.log(err);
                } else {
                    setProfileUpdateLoading(false);
                    if (notificationObject.showToast) {
                        toast('Sauvegardé!');
                    }
                }
            }).catch((error) => {
                console.log('Error details:', error.response ? error.response.data : error.message);

                // Check if we have a response from the server
                if (error.response) {
                    console.log('Server responded with error:', error.response.status);
                    console.log('Error data from server:', error.response.data);

                    setProfileUpdateError(error.response.data.message);
                } else if (error.request) {
                    console.log('Request was made but no response received:', error.request);
                    setProfileUpdateError('Request was made but no response received!');
                } else {
                    console.log('Error setting up request:', error.message);
                    setProfileUpdateError(error.message.toString());
                }

                setProfileUpdateLoading(false);
            });
        } catch (error) {
            console.log('Error details:', error.response ? error.response.data : error.message);

            // Check if we have a response from the server
            if (error.response) {
                console.log('Server responded with error:', error.response.status);
                console.log('Error data from server:', error.response.data);

                setProfileUpdateError(error.response.data.message);
            } else if (error.request) {
                console.log('Request was made but no response received:', error.request);
                setProfileUpdateError('Request was made but no response received!');
            } else {
                console.log('Error setting up request:', error.message);
                setProfileUpdateError(error.message.toString());
            }

            setProfileUpdateLoading(false);
        }
    };

    const updatePassword = async (securityForm) => {
        setProfileUpdateLoading(true);

        const body = {
            oldPassword: securityForm.oldPassword,
            newPassword: securityForm.newPassword,
        };

        try {
            axios.patch(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/updateProfile/pass/${idpharma}`, body).then((res) => {
                if (!res) {
                    const err = 'Could not complete the patch request.'
                    setProfileUpdateError(err);
                    console.log(err);
                } else {
                    setProfileUpdateLoading(false);
                    if (notificationObject.showToast) {
                        toast('Sauvegardé!');
                    }
                }
            }).catch((e) => {
                setProfileUpdateError(e.message);
                console.error(e.message);

                setProfileUpdateLoading(false);
            });
        } catch (e) {
            setProfileUpdateError(e.message);
            console.error(e.message);

            setProfileUpdateLoading(false);
        }
    };

    return { profileUpdateLoading, profileUpdateError, setProfileUpdateError, updateProfile, updatePassword };
}

export default useUpdateInfo;