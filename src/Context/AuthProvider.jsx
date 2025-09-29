import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { validateEmail, areAllTrue } from '../Utils/Functions.jsx'
import { toast } from 'react-toastify';
import { useStateContext } from './ContextProvider.jsx';
import { HOST, HOST_PORT_SEPARATOR, PORT } from '../Utils/Parameters.jsx';

const AuthContext = createContext();

const initLoginForm = {

    email: "",
    password: ""

}
const singForm = {

    storeName: "",
    password: "",
    confirmation: "",
    description: "",
    email: "",
    latitude: "",
    longitude: "",
    adressStore: "",
    phonePharmacy: ""

}



export const AuthProvider = ({ children }) => {


    const [loginForm, setLoginForm] = useState(initLoginForm) /// formulaire pour le login 
    const [signForm, setSignForm] = useState(singForm) /// formulaire pour le login
    const [incorrectAuth, setIncorrectAuth] = useState(false) /// 

    const [resetPasswordForm, setResetPasswordForm] = useState({
        password: "",
        confirmation: "",
    })
    const [triggerNavigateHome, setTriggerNavigateHome] = useState(false);
    const [triggerNavigateLogin, setTriggerNavigateLogin] = useState(false);
    const [triggerNavigate, setTriggerNavigate] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const { resetPasswordEmail, setResetPasswordEmail, socket, setNotificationSettings, setIdpharma } = useStateContext();





    const handleLogout = () => {
        console.log('Disconnecting...');

        localStorage.removeItem('token');
        localStorage.removeItem('idpharma');
        localStorage.removeItem('storeName');

        setNotificationSettings(null);
    }


    const handleLoginPost = () => {
    axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/login/v1`, loginForm)
        .then((res) => {
            if (res.data != null && res.data.token != null) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('idpharma', res.data.data.idpharma);
                localStorage.setItem('storeName', res.data.data.storeName);

                setIdpharma(res.data.data.idpharma);

                setIncorrectAuth(false);
                setIsAuth(true);
            }
        })
        .catch((error) => {
            console.log(error);

            // Check if it's an axios error with response
            if (error.response) {
                const status = error.response.status;
                const responseData = error.response.data;

                if (status === 400) {
                    if (responseData.message === 'Email or password incorrect') {
                        setIncorrectAuth(true);
                        console.log("Incorrect credentials");
                        setIsAuth(false);
                    }
                } else if (status === 403) {
                    // Handle email verification required
                    if (responseData.message === 'Please verify your email before logging in.') {
                        // You can set a specific state for email verification needed
                        setIncorrectAuth(false);
                        setIsAuth(false);
                        // Add a state for email verification if you haven't already
                        // setEmailVerificationNeeded(true);
                        alert('Please verify your email before logging in.');
                        console.log("Email verification required");
                    }
                }
            } else if (error.request) {
                // Network error - no response received
                console.log("Network error:", error.request);
                setIsAuth(false);
            } else {
                // Something else happened
                console.log("Error:", error.message);
                setIsAuth(false);
            }
        });
};


    const sendEmailForChangingPassword = () => {
        console.log("send email clicked");

        axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/changingPassword/`, { email: resetPasswordEmail }).then(res => {
            console.log(res.data);

            if (res.data.message != null) {
                toast('Un lien de récupération a été envoyé à votre adresse email.');
                // Listen for the 'store_connected' event
                socket.emit('onChanging_password', { email: resetPasswordEmail });//// make the id dynamic 

            }

        }).catch(e => {
            console.log(e);

            if (e.request.status == 400) {
                const parsedmessage = JSON.parse(e.request.response)
                if (parsedmessage.error == "Non-existent email") alert('Cet email n\'existe pas.');



            }

        })


    }

    const resetPassword = () => {

        //get ID from localstorage when loading 
        const jsonId = localStorage.getItem('idpharma')
        const idpharma = JSON.parse(jsonId)

        if (idpharma == null || undefined) return alert('Veuillez confirmer le lien envoyé à votre adresse email.');

        else {
            axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/approuveModif`, { password: resetPasswordForm.password, id: idpharma })
                .then(res => {

                    if (res.data.token != null) {
                        localStorage.setItem("token", res.data.token)// no need to re login
                        //add useNavigate to redirect to home page

                        //send an alert with message 
                        alert('Votre mot de passe a bien été modifié.');
                        setTriggerNavigateHome(true)
                    }


                }
                ).catch(e => {
                    alert(e.request.response)

                })
        }



    }



    const signRequest = () => {

        if (signForm.email !== "" && signForm.phonePharmacy !== "" && signForm.password !== "" && signForm.confirmation !== "") {
            axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/signup/v1`, signForm)
                .then(res => {
                    if (res.data != null) {
                        if (res.data.message === "Registered successfully") {
                            toast('Confirmez votre compte avec votre email.');
                            setTriggerNavigateLogin(true);
                            return null;
                        } else if (res.data.error === "Email or phoneNumber already registered") {
                            return "L'email ou le numéro de téléphone est déjà enregistré.";
                        }
                    }
                })
                .catch(e => {
                    return "Erreur lors de l'inscription : " + e;
                });
        } else {
            return "Veuillez remplir les zones obligatoires avant de soumettre.";
        }
    }

    useEffect(() => {
  const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuth(false);
      return;
    }

    try {
      const res = await axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/checkToken`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data && res.data.access) {
        setIsAuth(true);
        setIdpharma(res.data.user.idpharma); // persist in context
        // maybe setNotificationSettings(...) if your API returns them
      } else {
        // invalid access: remove local data and force logout
        handleLogout();
        setIsAuth(false);
      }
    } catch (err) {
      console.error("Token validation failed", err);
      handleLogout();
      setIsAuth(false);
    }
  };

  validateToken();
}, []); 





    return (

        <AuthContext.Provider value={{
            loginForm, setLoginForm,
            handleLoginPost, handleLogout, incorrectAuth,
            setIncorrectAuth, resetPasswordEmail,
            setResetPasswordEmail, sendEmailForChangingPassword,
            resetPasswordForm, setResetPasswordForm,
            triggerNavigateHome, setTriggerNavigateHome,
            isAuth, setIsAuth, resetPassword,
            signForm, setSignForm, signRequest,
            triggerNavigateLogin, setTriggerNavigateLogin,
            triggerNavigate, setTriggerNavigate
        }}>

            {children}

        </AuthContext.Provider>

    );

}


export const useAuthContext = () => useContext(AuthContext)