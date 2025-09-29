import { HOST, HOST_PORT_SEPARATOR, PORT } from "../Utils/Parameters.jsx";
import { useState } from 'react';
import axios from "axios";

const useRefuseRequest = () => {
  const [rsuccess, setRSuccess] = useState(null);
  const [isRRequestLoading, setIsRRequestLoading] = useState(false);
  const [rHasError, setRHasError] = useState(null);

  const refuseRequest = async (notificationId) => {
    setIsRRequestLoading(true);
    setRSuccess(null);
    setRHasError(null);

    try {
      const res = await axios.delete(
        `${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/refuseOrder/${notificationId}`
      );

      if (res.status === 200 && res.data.success) {
        setRSuccess(true);
        return { success: true, error: null }; // Return result directly
      } else {
        const errorMsg = res.data?.message || "Failed to refuse order";
        setRHasError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error.message;
      setRHasError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsRRequestLoading(false);
    }
  };

  return { refuseRequest, rsuccess, isRRequestLoading, rHasError };
};

export default useRefuseRequest;
