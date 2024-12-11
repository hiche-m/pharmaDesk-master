import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { validateEmail, areAllTrue } from '../Utils/Functions.jsx'
import { toast } from 'react-toastify';
import { useStateContext } from './ContextProvider.jsx';

const AuthContext = createContext();

const initLoginForm = {

    email: "",
    password: ""

}
const singForm = {

    storeName: "",
    nameOwner: "",
    password: "",
    store: "",
    confirmation: "",
    services: "",
    phoneNumber: "",
    description: "",
    email: "",
    latitude: "",
    longitude: "",
    adresse: "",
    commune: "",
    wilaya: "",
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

    const { resetPasswordEmail, setResetPasswordEmail,socket } = useStateContext()


   





    const handleLoginPost = () => {

        axios.post("https://pharma-back.onrender.com/api/pharma/login/v1", loginForm).then((res) => {

            if (res.data != null && res.data.token != null) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('idpharma', res.data.data[0].idpharma)
                setIncorrectAuth(false)
                setIsAuth(true)
            }



        }).catch((e) => {
            console.log(e);

            if (e.request.status == 400) {
                const parsedmessage = JSON.parse(e.request.response)
                if (parsedmessage.message == 'Email or password incorrect') {
                    // set a message for incorrect email or password 
                    setIncorrectAuth(true)
                    console.log("incrorrect credetials ");
                    setIsAuth(false)
                }
            }
        })


    }


    const sendEmailForChangingPassword = () => {
console.log("send email clicked");

        axios.post("https://pharma-back.onrender.com/api/pharma/changingPassword/", { email: resetPasswordEmail }).then(res => {
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
            axios.post(`https://pharma-back.onrender.com/api/pharma/approuveModif`, { password: resetPasswordForm.password, id: idpharma })
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
        if (signForm.email !== "" && signForm.phoneNumber !== "" && signForm.password !== "" && signForm.confirmation !== "") {
            axios.post("https://pharma-back.onrender.com/api/pharma/signup/v1", signForm)
                .then(res => {
                    if (res.data != null) {
                        if (res.data.message === "Registered successfully") {
                            alert("Bravo ! Inscription complétée avec succès.");
                            toast('Confirmez votre compte avec votre email.');
                            setTriggerNavigateLogin(true);
                        } else if (res.data.error === "Email or phoneNumber already registered") {
                            alert("L'email ou le numéro de téléphone est déjà enregistré.");
                        }
                    }
                })
                .catch(e => {
                    alert('Erreur lors de l\'inscription : ' + e);
                });
        } else {
            alert('Veuillez remplir les zones obligatoires avant de soumettre.');
        }
    }





    return (

        <AuthContext.Provider value={{
            loginForm, setLoginForm,
            handleLoginPost, incorrectAuth,
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