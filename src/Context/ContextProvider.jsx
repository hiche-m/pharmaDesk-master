import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { getUserData, userSuccess, userFail } from '../Redux/userActions.jsx';
import { userData } from '../Utils/Data/UserData.jsx';
import { toast } from 'react-toastify';
import { HOST, HOST_PORT_SEPARATOR, notification_load_limit, notification_sound_url, PORT } from "../Utils/Parameters.jsx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import sound1 from '../Assets/Sounds/Notification/sound1.wav';
import { formatDateForSql } from '../Utils/Functions.jsx';
import { socket } from '../socket.js';  // Adjust path if needed

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

  /*                                                                                    */////// Variables

  const [connectedPharmacy, setConnectedPharmacy] = useState(null);
  const [triggerNavigate, setTriggerNavigate] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("") ///  email field for reset password

  const [notificationListeRequests, setNotificationListeRequest] = useState([])
  const [isLoadingNotification, setIsLoadingNotifaction] = useState(true)
  const [storeName, setStoreName] = useState(null);

  const [notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation] = useState([])
  const [isLoadingNotificationConfirmation, setIsLoadingNotifactionConfirmation] = useState(true)

  const [isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription] = useState(false) // /to rechange 

  const [selectedPortion, setSelectedPortion] = useState('take');
  const [selectedFrequency, setSelectedFrequency] = useState('heur');
  const [frequency, setFrequency] = useState(1);
  const [timing, setTiming] = useState(0);
  const daysPortion = 15;
  const [days, setDays] = useState(daysPortion);
  const quantityPortion = 1;
  const [dismissedNotifs, setDismissedNotifs] = useState(() => {
    try {
      const saved = localStorage.getItem('dismissedNotifs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading dismissed notifications:', e);
      return [];
    }
  });
  const recentlyRemovedRef = useRef({});

  // Cleanup recentlyRemovedRef periodically to prevent memory leaks
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      const keys = Object.keys(recentlyRemovedRef.current);
      keys.forEach(key => {
        if (now - recentlyRemovedRef.current[key] > 30000) { // 30s cleanup
          delete recentlyRemovedRef.current[key];
        }
      });
    }, 60000); // Run cleanup every minute

    return () => clearInterval(cleanup);
  }, []);

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
  const [todayStats, setTodayStats] = useState(null);
  const [dailyWidgetDate, setDailyWidgetDate] = useState(null);
  const [dailyWidgetData, setDailyWidgetData] = useState(null);
  const [graphWidgetBeginDate, setGraphWidgetBeginDate] = useState(null);
  const [graphWidgetEndDate, setGraphWidgetEndDate] = useState(null);
  const [graphWidgetData, setGraphWidgetData] = useState(null);
  const [idpharma, setIdpharma] = useState(null);
  const [pinnedNotifs, setPinnedNotifs] = useState([]);

  /*                                                                                    */////// Effects
  /* Dashboard */

  useEffect(() => {
    const idpharma = localStorage.getItem('idpharma');
    const storeName = localStorage.getItem('storeName');
    const profilePic = localStorage.getItem('profilePic');

    if (idpharma) {
      axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/accountInfo/${idpharma}`).then((res) => {
        if (!res || !res.data) {
            console.log('There was a problem fetching settings information...' + res);
        } else {
            const temp = res.data.data;
            
            const fetchedStoreName = temp.storeName;
            const fetchedProfilePic = temp.userPic;
  
            if(storeName != fetchedStoreName) {
                localStorage.setItem('storeName', fetchedStoreName);
                setStoreName(fetchedStoreName);
            }
  
            if(profilePic != fetchedProfilePic) {
                localStorage.setItem('profilePic', fetchedProfilePic);
            }
        }
    }).catch(error => {
      console.error('Error fetching account info:', error);
    });
    }
  }, []);

  useEffect(() => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)

    if (idpharma && dailyWidgetDate) {
      axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/dashboard/${idpharma}/sales/${dailyWidgetDate}`).then((res) => {
        if (!res || !res.data) {
          console.log('Error fetching daily widget data.');
        } else {
          setDailyWidgetData(res.data.data);
        }
      }).catch((e) => {
        console.log('Error fetching daily widget data.');
      });
    }
  }, [dailyWidgetDate]);

  useEffect(() => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)

    if (idpharma && graphWidgetBeginDate && graphWidgetEndDate) {
      axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/dashboard/${idpharma}/prescriptions/${graphWidgetBeginDate}/${graphWidgetEndDate}`).then((res) => {
        if (!res || !res.data) {
          console.log('Error fetching graph widget data.');
        } else {
          setGraphWidgetData(res.data.data);
        }
      }).catch((e) => {
        console.log('Error fetching graph widget data.');
      });
    }
  }, [graphWidgetBeginDate, graphWidgetEndDate])

  useEffect(() => {
  // Skip if idpharma not ready (though we'll handle fetching separately)
  if (!idpharma) return;

  console.log('Setting up socket listeners for pharmacy:', idpharma);
  socket.emit('store_connected', { idpharma });

  // Named handlers for easy off
  const onNotificationRemoved = (data) => {
    console.log('Socket: notification_removed', data);
    if (notificationSettings?.showToast) {  // Use notificationSettings instead of cachedNotificationSetting
      toast("Commande annulée !");
    }
    setTimeout(() => {
      removeNotif(data);
      removeNotifComing(data);
    }, 0);
  };

  const onClientConfirmed = (data) => {
    console.log('Socket: client_confirmed_notification', data);
    const { idnotifications, idpharma, idprescription, created_at, url, idClient, firstname, userPic } = data;
    if (notificationSettings?.showToast) {
      toast("Un client a choisi votre pharmacie !");
    }
    if (notificationSettings?.confirmationSound) {
      const sound = new Audio(sound1);
      sound.play();
    }
    // Display the notification in the front
    removeNotif(data);
    addNotifComing(data);
    console.log(`Notification ${idnotifications}: Client ${firstname}:${idClient} is coming!`);
  };

  const onNewPrescription = (data) => {
    console.log('Socket: new_prescription_notification', data);
    if (notificationSettings?.notificationSound) {
      const sound = new Audio(sound1);
      sound.play().catch(e => console.log('Sound play failed:', e));
    }
    if (notificationSettings?.showToast) {
      toast("Nouvelle Commande !");
    }
    setTimeout(() => {
      addNotif(data);
    }, 0);
  };

  const onPrescriptionConfirmed = (data) => {
    console.log('Socket: prescription_confirmed_notification', data);
    if (notificationSettings?.showToast) {
      toast("Posiologie envoyé !");
    }
    setTimeout(() => {
      removeNotifComing(data);
    }, 0);
  };

  const onRestoringPassword = (data) => {
    console.log("Socket: restoring_password", data);
    if (data.idpharma != null) {
      localStorage.setItem('idpharma', data.idpharma);
      setTriggerNavigate(true);
    }
  };

  // Register listeners
  socket.on('notification_removed', onNotificationRemoved);
  socket.on('client_confirmed_notification', onClientConfirmed);
  socket.on('new_prescription_notification', onNewPrescription);
  socket.on('prescription_confirmed_notification', onPrescriptionConfirmed);
  socket.on('restoring_password', onRestoringPassword);

  // Connect manually
  socket.connect();

  // Cleanup
  return () => {
    socket.off('notification_removed', onNotificationRemoved);
    socket.off('client_confirmed_notification', onClientConfirmed);
    socket.off('new_prescription_notification', onNewPrescription);
    socket.off('prescription_confirmed_notification', onPrescriptionConfirmed);
    socket.off('restoring_password', onRestoringPassword);
    socket.disconnect();
  };
}, []);  // Empty deps for one-time setup

  /* Rest */
  useEffect(() => {
  const jsonId = localStorage.getItem('idpharma');
  const parsedId = jsonId ? JSON.parse(jsonId) : null;
  setIdpharma(parsedId);

  if (parsedId) {
    // Move other init here if they depend on idpharma
    getPinnedNotifs();
    updateTodayStats();
    
    const today = new Date();
    setDailyWidgetDate(formatDateForSql(today));

    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    setGraphWidgetBeginDate(formatDateForSql(firstDayOfYear));

    const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
    setGraphWidgetEndDate(formatDateForSql(lastDayOfYear));

    if (storeName == null) {
      const storedName = localStorage.getItem('storeName');
      setStoreName(storedName);
    }
  }
}, []);

  useEffect(() => {
    if (!notificationSettings) {
      const cachedNotificationSetting = JSON.parse(localStorage.getItem('notification'));
      setNotificationSettings(cachedNotificationSetting);
      console.log('Update notification settings.');
    }
  }, [notificationSettings]);

  /*                                                                                    */////// Functions

  const updateTodayStats = () => {
    const idpharma = localStorage.getItem('idpharma');
    const today = new Date();
    const formattedToday = formatDateForSql(today);

    if (idpharma) {
      axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/dashboard/${idpharma}/stats`, {
        "startDate": formattedToday,
        "endDate": null
      }).then((res) => {
        if (!res || !res.data) {
          console.log('Error fetching daily sales.');
        } else {
          setTodayStats(res.data.data);
        }
      }).catch((e) => {
        console.log('Error fetching daily sales.');
      });
    }
  }

  const pinNotif = (notifObject) => {
    const temp = JSON.parse(localStorage.getItem('pinnedNotifs'));
    if (temp != null && notifObject != null) {
      let arr = temp.slice();
      arr.unshift(notifObject);
      localStorage.setItem('pinnedNotifs', JSON.stringify(arr));
      setPinnedNotifs(arr);
    }
  }

  const unpinNotif = (idnotifications) => {
    const temp = JSON.parse(localStorage.getItem('pinnedNotifs'));
    if (temp != null && idnotifications != null) {
      let arr = temp.slice();
      let newArr = arr.filter(elt => elt.idnotifications !== idnotifications);
      localStorage.setItem('pinnedNotifs', JSON.stringify(newArr));
      setPinnedNotifs(newArr);
    }
  }

  const getPinnedNotifs = () => {
    const jsonId = localStorage.getItem('idpharma');
    const idpharma = JSON.parse(jsonId);
    const temp = JSON.parse(localStorage.getItem('pinnedNotifs'));

    if (idpharma == null) {
      setPinnedNotifs([]);
      return "id empty";
    } else if (temp == null) {
      localStorage.setItem('pinnedNotifs', JSON.stringify([]));
      setPinnedNotifs([]);
      return [];
    } else {
      if (temp.length > 0) {
        setPinnedNotifs(temp);
      }
      return temp;
    }
  }

  const fetchNotif = async () => {
    console.log('Fetching Notif!');

    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      console.log("fetchNotif: No idpharma found");
      return "id empty"
    }

    try {
      const res = await axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/demande/${idpharma}`);
      
      if (res.data != null && res.data.data) {
        console.log('fetchNotif: Got notifications:', res.data.data.length);
        
        setNotificationListeRequest(prev => {
          setIsLoadingNotifaction(false);
          const array = res.data.data;
          return array.reverse().slice(0, notification_load_limit);
        });
      } else {
        console.log('fetchNotif: No data received');
        setIsLoadingNotifaction(false);
        setNotificationListeRequest([]);
      }
    } catch (e) {
      console.error('fetchNotif error:', e);
      setIsLoadingNotifaction(false);
    }
  }

  const addNotif = (notifObject) => {
    if (!notifObject || !notifObject.idnotifications) {
      console.log('addNotif: Invalid notification object');
      return;
    }

    console.log('addNotif: Adding notification:', notifObject.idnotifications);

    // Ignore if user already dismissed it
    if (dismissedNotifs.includes(notifObject.idnotifications)) {
      console.log('addNotif: Ignored (already dismissed):', notifObject.idnotifications);
      return;
    }

    // Ignore if it was just removed a moment ago (cooldown to avoid flicker)
    const recent = recentlyRemovedRef.current[notifObject.idnotifications];
    if (recent && (Date.now() - recent) < 5000) { // Reduced to 5s
      console.log('addNotif: Ignored (recently removed):', notifObject.idnotifications);
      return;
    }

    setNotificationListeRequest(prev => {
      const prevArr = Array.isArray(prev) ? prev : [];
      // prevent duplicates
      if (prevArr.some(n => n.idnotifications === notifObject.idnotifications)) {
        console.log('addNotif: Duplicate prevented');
        return prevArr;
      }
      
      const arr = [notifObject, ...prevArr.slice(0, notification_load_limit - 1)];
      console.log('addNotif: Updated list length:', arr.length);
      return arr;
    });
  };

  const removeNotif = (notifObject) => {
    const id = notifObject && notifObject.idnotifications;
    if (!id) {
      console.log('removeNotif: No ID provided');
      return;
    }

    console.log('removeNotif: Removing notification:', id);

    // mark as recently removed to avoid immediate re-add by server/client race
    recentlyRemovedRef.current[id] = Date.now();

    setNotificationListeRequest(prev => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const filtered = prevArr.filter(elt => elt.idnotifications !== id);
      console.log('removeNotif: List length after removal:', filtered.length);
      return filtered;
    });
  };

  const fetchCommingClients = async () => {
    console.log('Fetching Coming Clients!');

    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      console.log("fetchCommingClients: No idpharma found");
      return "id empty"
    }

    try {
      const res = await axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/comming/${idpharma}`);
      
      if (res.data != null && res.data.data) {
        console.log('fetchCommingClients: Got notifications:', res.data.data.length);
        
        setNotificationListeRequestConfirmation(prev => {
          setIsLoadingNotifactionConfirmation(false);
          let array = res.data.data;
          return array.reverse().slice(0, notification_load_limit);
        });
      } else {
        console.log('fetchCommingClients: No data received');
        setIsLoadingNotifactionConfirmation(false);
        setNotificationListeRequestConfirmation([]);
      }
    } catch (e) {
      console.error('fetchCommingClients error:', e);
      setIsLoadingNotifactionConfirmation(false);
    }
  }

  const addNotifComing = (notifObject) => {
  console.log("🔔 addNotifComing called with:", notifObject);

  if (!notifObject || !notifObject.idnotifications) {
    console.log('❌ addNotifComing: Invalid notification object (missing idnotifications):', notifObject);
    return;
  }

  // Ignore if dismissed
  if (dismissedNotifs.includes(notifObject.idnotifications)) {
    console.log('addNotifComing: Ignored (already dismissed):', notifObject.idnotifications);
    return;
  }

  // Ignore if recently removed
  const recent = recentlyRemovedRef.current[notifObject.idnotifications];
  if (recent && (Date.now() - recent) < 5000) {
    console.log('addNotifComing: Ignored (recently removed):', notifObject.idnotifications);
    return;
  }

  setNotificationListeRequestConfirmation(prev => {
    console.log("📋 Current confirmation list before add:", prev);
    const prevArr = Array.isArray(prev) ? prev : [];
    
    if (prevArr.some(n => n.idnotifications === notifObject.idnotifications)) {
      console.log('⚠️ Duplicate confirmation prevented');
      return prevArr;
    }

    const arr = [notifObject, ...prevArr];
    console.log('✅ Confirmation list updated:', arr);
    return arr;
  });
};


  const removeNotifComing = (notifObject) => {
    const id = notifObject && notifObject.idnotifications;
    if (!id) {
      console.log('removeNotifComing: No ID provided');
      return;
    }

    console.log('removeNotifComing: Removing notification:', id);

    setNotificationListeRequestConfirmation(prev => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const filtered = prevArr.filter(elt => elt.idnotifications !== id);
      console.log('removeNotifComing: List length after removal:', filtered.length);
      return filtered;
    });
  }

  const confirmePerscription = (idclient, perscriptionId, isOn) => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma != null) {
      console.log("this is the form posio ", idclient, posioData);

      axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/Confirmation_prescription/${idpharma}/${perscriptionId}`, { idClient: idclient, posiologies: isOn ? posioData : [] })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => console.log(e))
    } else {
      alert('id incorrect please reconnect ')
    }
  }

  const getUserData = () => {
    const idpharma = localStorage.getItem('idpharma');
    const storeName = localStorage.getItem('storeName');
    const profilePic = localStorage.getItem('profilePic');

    return {
      idpharma,
      storeName,
      profilePic
    };
  }

  const updateNotificationSettings = (newSettings) => {
    localStorage.setItem("notification", JSON.stringify(newSettings));
    setNotificationSettings(newSettings);
  }

  const [selectedNot, setSelectedNot] = useState({});
  const [confirmType, setConfirmType] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const openNotification = (notification_data, type) => {
    setConfirmType(type);
    setSelectedNot(notification_data);
    handleOpenModal();
  };

  const dismissNotif = (idnotifications) => {
    if (!idnotifications) return;
    
    console.log('dismissNotif: Dismissing notification:', idnotifications);
    
    setDismissedNotifs(prev => {
      if (prev.includes(idnotifications)) return prev;
      const next = [...prev, idnotifications];
      try {
        localStorage.setItem('dismissedNotifs', JSON.stringify(next));
      } catch (e) {
        console.error('Error saving dismissed notifications:', e);
      }
      return next;
    });
    
    // Also remove it from the live lists
    removeNotif({ idnotifications });
    removeNotifComing({ idnotifications });
  };

  // Optional helper to clear dismissed list (useful on logout)
  const clearDismissedNotifs = () => {
    localStorage.removeItem('dismissedNotifs');
    setDismissedNotifs([]);
    // Clear the recently removed ref as well
    recentlyRemovedRef.current = {};
  };

  // Compute filtered active notifications
  const activeNotifications = (notificationListeRequests || []).filter(n => 
    n && n.idnotifications && !dismissedNotifs.includes(n.idnotifications)
  );
  
  const activeNotificationsComing = (notificationListeRequestsConfirmation || []).filter(n => 
    n && n.idnotifications && !dismissedNotifs.includes(n.idnotifications)
  );

  /*                                                                                    */////// Return

  return (
    <StateContext.Provider value={{
      setIdpharma,
      triggerNavigate, setTriggerNavigate, getUserData, notificationSettings, updateNotificationSettings,
      resetPasswordEmail, setResetPasswordEmail, socket, fetchNotif, setNotificationSettings,
      notificationListeRequests, setNotificationListeRequest, removeNotif,
      isLoadingNotification, setIsLoadingNotifaction, fetchCommingClients,
      notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation,
      isLoadingNotificationConfirmation, setIsLoadingNotifactionConfirmation, storeName,
      confirmePerscription, isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription,
      posioData, setPosiodata, selectedFrequency, setSelectedFrequency, selectedPortion,
      setSelectedPortion, quantityPortion, frequency, setFrequency, timing, setTiming,
      quantity, setQuantity, days, setDays, todayStats, setDailyWidgetDate, dailyWidgetData,
      setGraphWidgetBeginDate, setGraphWidgetEndDate, graphWidgetData, dailyWidgetDate,
      graphWidgetBeginDate, graphWidgetEndDate, getPinnedNotifs, pinNotif, unpinNotif, pinnedNotifs,
      // Raw notification lists (keep for backward compatibility)
      notificationListeRequests, setNotificationListeRequest,
      // Filtered lists (use these in UI)
      activeNotifications,
      activeNotificationsComing,
      // Notification management functions
      dismissNotif,
      clearDismissedNotifs,
      dismissedNotifs,
      // Modal functions
      selectedNot, setSelectedNot, confirmType, isModalOpen, setModalOpen, handleOpenModal, openNotification, 
      updateTodayStats
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext)
