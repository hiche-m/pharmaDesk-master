import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { getUserData, userSuccess, userFail } from '../Redux/userActions.jsx';
import { userData } from '../Utils/Data/UserData.jsx';
import { toast } from 'react-toastify';
import { HOST, notification_load_limit, notification_sound_url } from "../Utils/Parameters.jsx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import sound1 from '../Assets/Sounds/Notification/sound1.wav';

const StateContext = createContext();





export const ContextProvider = ({ children }) => {



  const [connectedPharmacy, setConnectedPharmacy] = useState(null);
  const [triggerNavigate, setTriggerNavigate] = useState(false);
  const [socket, setSocket] = useState(null)
  const [resetPasswordEmail, setResetPasswordEmail] = useState("") ///  email field for reset password

  const [notificationListeRequests, setNotificationListeRequest] = useState(null)
  const [isLoadingNotification, setIsLoadingNotifaction] = useState(true)
  const [storeName, setStoreName] = useState(null);

  const [notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation] = useState(null)
  const [isLoadingNotificationConfirmation, setIsLoadingNotifactionConfirmation] = useState(true)

  const [isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription] = useState(false) // /to rechange 

  const [selectedPortion, setSelectedPortion] = useState('take');
  const [selectedFrequency, setSelectedFrequency] = useState('heur');
  const [frequency, setFrequency] = useState(1);
  const [timing, setTiming] = useState(0);
  const daysPortion = 15;
  const [days, setDays] = useState(daysPortion);
  const quantityPortion = 1 / 2;
  const [quantity, setQuantity] = useState(0);
  const [posioData, setPosiodata] = useState([{

    "nomPils": '',
    "quantite": quantityPortion,
    "quantiteDetails": selectedPortion,
    "ajeun": timing === 0 ? 1 : 0,
    "avantRepas": timing === 1 ? 1 : 0,
    "pendantRepas": timing === 2 ? 1 : 0,
    "apresRepas": timing === 3 ? 1 : 0,
    "matin": 0,
    "apresMidi": 0,
    "soire": 0,
    "duree": daysPortion,
    "frequence": frequency,
    "frequenceDetails": selectedFrequency,
  }]);

  const [notificationSettings, setNotificationSettings] = useState(null);



  useEffect(() => {

    //get ID from localstorage when loading 
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    const cachedNotificationSetting = JSON.parse(localStorage.getItem('notification'));
    /* const idpharma = 1 */
    // Initialize Socket.IO client and set it to state
    const socket = io(HOST);
    setSocket(socket)

    if (idpharma != null) {
      console.log("hellllooooo from the socket ");

      if (storeName == null) {
        const storeName = localStorage.getItem('storeName');
        setStoreName(storeName);
      }

      // Listen for the 'store_connected' event
      socket.emit('store_connected', { idpharma });//// make the id dynamic 


      /* socket.on('prescription_cancelled', (data) => {
        const { idprescription, message } = data;
        toast("un client a annulé sa commande");
        // Display the notification in the front
        console.log(`Notification: ${message, idprescription}`);


      }); */
      socket.on('notification_removed', (data) => {
        const { idnotifications,
          idpharma,
          idprescription,
          created_at,
          url,
          idClient,
          firstname,
          userPic,
          message } = data;
        if (cachedNotificationSetting.showToast) {
          toast("Commande annulé!");
        }
        removeNotif(data);
        removeNotifComing(data);
        // Display the notification in the front
        console.log(`Notification: ${data}`);


      });

      socket.on('client_confirmed_notification', (data) => {
        const { idnotifications,
          idpharma,
          idprescription,
          created_at,
          url,
          idClient,
          firstname,
          userPic,
        } = data;
        if (cachedNotificationSetting.showToast) {
          toast("Un client arrive!");
        }
        if (cachedNotificationSetting.confirmationSound) {
          const sound = new Audio(sound1);
          sound.play();
        }
        // Display the notification in the front
        removeNotif(data);
        addNotifComing(data);
        console.log(`Notification ${idnotifications}: Client ${firstname}:${idClient} is coming!`);
      });


      socket.on('new_prescription_notification', (data) => {
        const { idnotifications,
          idpharma,
          idprescription,
          created_at,
          url,
          idClient,
          firstname,
          userPic,
        } = data;
        if (cachedNotificationSetting.notificationSound) {
          const sound = new Audio(sound1);
          sound.play();
        }
        if (cachedNotificationSetting.showToast) {
          toast("Nouvelle notification!");
        }
        addNotif(data);
        // Display the notification in the front
        console.log(`Notification ${idnotifications}: Perscription ${idprescription} arrived from ${firstname}:${idClient} at ${created_at}`);
      });



      socket.on('prescription_confirmed_notification', (data) => {
        const { idnotifications,
          idpharma,
          idprescription,
          created_at,
          url,
          idClient,
          firstname,
          userPic,
          prix,
          posioFlag,
          message
        } = data;
        if (cachedNotificationSetting.showToast) {
          toast("Posiologie envoyé!");
        }
        // Display the notification in the front
        removeNotifComing(data);
      });




    }

    socket.on('restoring_password', (data) => {

      console.log("i'm in the restoring socket out if  ", data);
      if (data.idpharma != null || undefined) {

        console.log("i'm in the restoring socket ", data.idpharma);// set useNavigate() to redirect to the changing page 

        localStorage.setItem('idpharma', data.idpharma)
        setTriggerNavigate(true)
      }
    })












    // Clean up the socket connection on component unmount
    return () => socket.close();


  }, []);

  useEffect(() => {
    if (!notificationSettings) {
      const cachedNotificationSetting = JSON.parse(localStorage.getItem('notification'));
      setNotificationSettings(cachedNotificationSetting);
      console.log('Update notification settings.');
    }
  }, [notificationSettings]);


  // Listen for the 'prescription_cancelled' event


  const fetchNotif = async () => {
    console.log('Fetching Notif!');

    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      return "id empty"
    }
    else {
      axios.get(`${HOST}/api/demande/${idpharma}`).then(res => {

        if (res.data != null) {

          //console.log(res.data);

          setNotificationListeRequest(prev => {

            setIsLoadingNotifaction(false)
            const array = res.data.data;

            return array.reverse().slice(0, notification_load_limit);
          })



        }



      }).catch(e => {


      })
    }


  }

  const addNotif = (notifObject) => {
    setNotificationListeRequest(prev => {
      let arr = prev.slice(0, -1);
      arr.unshift(notifObject);

      return arr
    });
  }

  const removeNotif = (notifObject) => {
    setNotificationListeRequest(prev => {
      let arr = prev.slice();
      let idnotifications = notifObject.idnotifications;

      let newArr = arr.filter(elt => elt.idnotifications !== idnotifications);
      return newArr;
    });
  };

  const fetchCommingClients = async () => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      return "id empty"
    }
    else {
      axios.get(`${HOST}/api/comming/${idpharma}`).then(res => {

        if (res.data != null) {



          setNotificationListeRequestConfirmation(prev => {

            setIsLoadingNotifactionConfirmation(false)
            let array = res.data.data


            return array.reverse().slice(0, notification_load_limit)
          })



        }



      }).catch(e => {


      })
    }


  }

  const addNotifComing = (notifObject) => {
    setNotificationListeRequestConfirmation(prev => {
      let arr = prev;
      arr.unshift(notifObject);
      return arr
    });
  }

  const removeNotifComing = (notifObject) => {
    setNotificationListeRequestConfirmation(prev => {
      let arr = prev.slice();
      let idnotifications = notifObject.idnotifications;

      let newArr = arr.filter(elt => elt.idnotifications !== idnotifications);
      return newArr;
    });
  }

  const confirmePerscription = (idclient, perscriptionId, isOn) => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma != null) {

      console.log("this is the form posio ", idclient, posioData);

      axios.post(`${HOST}/api/Confirmation_prescription/${idpharma}/${perscriptionId}`, { idClient: idclient, posiologies: isOn ? posioData : [] })
        .then(res => {
          console.log(res.data);
        })

        .catch(e => console.log(e)
        )

    }
    else alert('id incorrect please reconnect ')

  }


  const getUserData = () => {
    const idpharma = localStorage.getItem('idpharma');
    const storeName = localStorage.getItem('storeName');

    return {
      idpharma,
      storeName
    };
  }

  const updateNotificationSettings = (newSettings) => {
    localStorage.setItem("notification", JSON.stringify(newSettings));
    setNotificationSettings(newSettings);
  }


  return (

    <StateContext.Provider value={{
      triggerNavigate, setTriggerNavigate, getUserData, notificationSettings, updateNotificationSettings,
      resetPasswordEmail, setResetPasswordEmail, socket, fetchNotif, setNotificationSettings,
      notificationListeRequests, setNotificationListeRequest,
      isLoadingNotification, setIsLoadingNotifaction, fetchCommingClients,
      notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation
      , isLoadingNotificationConfirmation, setIsLoadingNotifactionConfirmation, storeName,
      confirmePerscription, isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription,
      posioData, setPosiodata,
      selectedFrequency, setSelectedFrequency,
      selectedPortion, setSelectedPortion,
      frequency, setFrequency,
      timing, setTiming,
      quantity, setQuantity,
      days, setDays,
    }}>

      {children}

    </StateContext.Provider>

  );

}


export const useStateContext = () => useContext(StateContext)