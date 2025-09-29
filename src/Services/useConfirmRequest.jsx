import axios from "axios";
import { HOST, HOST_PORT_SEPARATOR, PORT } from "../Utils/Parameters.jsx";
import { useState } from 'react';

const useConfirmRequest = () => {
  const [success, setSuccess] = useState(null);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const jsonId = localStorage.getItem('idpharma');
  const idpharma = JSON.parse(jsonId);

  const confirmRequest = async (perscriptionId, clientId, notificationId, comment, gen) => {
    setIsRequestLoading(true);

    const body = { comment, gen };

    try {
      const res = await axios.post(
        `${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/Accept_prescription/${clientId}/${idpharma}/${perscriptionId}/${notificationId}`,
        body
      );

      if (!res || res.status !== 200) {
        console.log("Error: ", res);
        setSuccess(false);
        setHasError(res);
        return false; // ❌
      } else {
        setSuccess(true);
        return true; // ✅
      }
    } catch (error) {
      setHasError(error);
      console.log(error);
      setSuccess(false);
      return false; // ❌
    } finally {
      setIsRequestLoading(false);
    }
  };

  return { confirmRequest, success, isRequestLoading, hasError };
};

export default useConfirmRequest;
