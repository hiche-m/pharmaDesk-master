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

const StateContext = createContext();





export const ContextProvider = ({ children }) => {

  /*                                                                                    */////// Variables

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
  const quantityPortion = 1;
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
            setHasError('There was a problem fetching settings information');
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

    const cachedNotificationSetting = JSON.parse(localStorage.getItem('notification'));;

    if (socket) {
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
        }
        removeNotif(data);
        removeNotifComing(data);
        // Display the notification in the front
        console.log(`Notification: ${data}`);


      });


      socket.on('pharmacy_accept_sent', (data) => {
        const { idnotifications } = data;
        if (cachedNotificationSetting.showToast) {
          toast("Commande acceptée !");
        }
        removeNotif(data);
        // Display the notification in the front
        console.log(`Notification accept: ${data}`);


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
          toast("Un client a choisi votre pharmacie !");
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
          toast("Nouvelle Commande !");
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
          toast("Vente confirmée !");
        }
        // Display the notification in the front
        removeNotifComing(data);
      });

      socket.on('restoring_password', (data) => {

        console.log("i'm in the restoring socket out if  ", data);
        if (data.idpharma != null || undefined) {

          console.log("i'm in the restoring socket ", data.idpharma);// set useNavigate() to redirect to the changing page 

          localStorage.setItem('idpharma', data.idpharma)
          setTriggerNavigate(true)
        }
      });
    }

  }, [socket]);

  /* Rest */
  useEffect(() => {

    if (!socket) {

      const varSocket = io(`${HOST}${HOST_PORT_SEPARATOR}${PORT}`);
      setSocket(varSocket);

    }


    console.log('Starting useContextProvider with ID: ' + idpharma);

    if (idpharma == null) {

      const jsonId = localStorage.getItem('idpharma');
      setIdpharma(JSON.parse(jsonId));

    } else {
      console.log("hellllooooo from the socket ");

      const loadPinnedNotifs = async () => {
      await getPinnedNotifs();
    };
    loadPinnedNotifs();

      const today = new Date();
      /* const formattedToday = formatDateForSql(today);

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
      }); */
      updateTodayStats();
      
      setDailyWidgetDate(formatDateForSql(today));

      // Set graphWidgetBeginDate to 7 days ago
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      setGraphWidgetBeginDate(formatDateForSql(lastWeek));

      // Set graphWidgetEndDate to today
      setGraphWidgetEndDate(formatDateForSql(today));
      if (storeName == null) {
        const storeName = localStorage.getItem('storeName');
        setStoreName(storeName);
      }
    }

  }, [idpharma]);

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

  const updateStats = (startDate, endDate) => {
  const idpharma = localStorage.getItem('idpharma');

  axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/dashboard/${idpharma}/stats`, {
    startDate: formatDateForSql(startDate),
    endDate: endDate ? formatDateForSql(endDate) : null,
  })
  .then((res) => {
    if (!res || !res.data) {
      console.log('Error fetching stats.');
    } else {
      setTodayStats(res.data.data);
    }
  })
  .catch((e) => {
    console.log('Error fetching stats.', e);
  });
};


  const pinNotif = async (notifObject) => {
  try {
    const jsonId = localStorage.getItem('idpharma');
    const idpharma = JSON.parse(jsonId);
    
    if (!idpharma || !notifObject) {
      console.error('Invalid idpharma or notifObject');
      return;
    }

    // Fetch fresh data with gen field before pinning
    const response = await axios.get(
      `${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/prescription/${idpharma}/${notifObject.idprescription}`
    );

    let notifToPin = notifObject; // fallback to original

    if (response.data && response.data.success && response.data.data) {
      // Use fresh data with gen field
      notifToPin = {
        ...response.data.data,
        timestamp: Date.now() // Add timestamp for compatibility
      };
      console.log('Pinning with fresh data including gen:', notifToPin.gen);
    } else {
      console.warn('Failed to fetch fresh data, using original notification');
      // Add timestamp to original data if missing
      notifToPin = {
        ...notifObject,
        timestamp: notifObject.timestamp || Date.now()
      };
    }

    // Get existing pinned notifications
    const temp = JSON.parse(localStorage.getItem('pinnedNotifs')) || [];
    
    // Check if already pinned (avoid duplicates)
    const isAlreadyPinned = temp.some(pin => pin.idnotifications === notifToPin.idnotifications);
    if (isAlreadyPinned) {
      console.log('Notification already pinned');
      return;
    }

    // Add to beginning of array
    const newPinnedArray = [notifToPin, ...temp];
    
    // Save to localStorage
    localStorage.setItem('pinnedNotifs', JSON.stringify(newPinnedArray));
    
    // Update state
    setPinnedNotifs(newPinnedArray);
    
    console.log('Successfully pinned notification with gen data');

  } catch (error) {
    console.error('Error in pinNotif:', error);
    
    // Fallback: pin original notification if API call fails
    const temp = JSON.parse(localStorage.getItem('pinnedNotifs')) || [];
    const notifToPin = {
      ...notifObject,
      timestamp: notifObject.timestamp || Date.now()
    };
    
    const newPinnedArray = [notifToPin, ...temp];
    localStorage.setItem('pinnedNotifs', JSON.stringify(newPinnedArray));
    setPinnedNotifs(newPinnedArray);
    
    console.log('Pinned with fallback data (no gen field)');
  }
};

  const unpinNotif = (idnotifications) => {
    const temp = JSON.parse(localStorage.getItem('pinnedNotifs'));
    if (temp != null && idnotifications != null) {
      let arr = temp.slice();
      let newArr = arr.filter(elt => elt.idnotifications !== idnotifications);
      localStorage.setItem('pinnedNotifs', JSON.stringify(newArr));
      setPinnedNotifs(newArr);
    }
  }

  const getPinnedNotifs = async () => {
  const jsonId = localStorage.getItem('idpharma');
  const idpharma = JSON.parse(jsonId);
  const storedPinnedNotifs = JSON.parse(localStorage.getItem('pinnedNotifs')) || [];

  if (idpharma == null) {
    setPinnedNotifs([]);
    return "id empty";
  }

  if (storedPinnedNotifs.length === 0) {
    setPinnedNotifs([]);
    return [];
  }

  try {
    // Fetch fresh data for each pinned notification using getPrescription endpoint
    const freshPinnedNotifs = await Promise.all(
      storedPinnedNotifs.map(async (storedNotif) => {
        try {
          const response = await axios.get(
            `${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/prescription/${idpharma}/${storedNotif.idprescription}`
          );
          
          if (response.data && response.data.success && response.data.data) {
            const freshData = response.data.data;
            // Add timestamp from stored data to maintain compatibility
            return {
              ...freshData,
              timestamp: storedNotif.timestamp || Date.now()
            };
          } else {
            console.warn(`Failed to fetch fresh data for prescription ${storedNotif.idprescription}`);
            return storedNotif; // Fallback to stored data
          }
        } catch (error) {
          console.error(`Error fetching prescription ${storedNotif.idprescription}:`, error);
          return storedNotif; // Fallback to stored data
        }
      })
    );

    // Filter out any null/undefined results and maintain original order
    const validNotifications = freshPinnedNotifs.filter(notif => notif != null);
    
    console.log('Fresh pinned notifications with gen:', validNotifications);
    console.log('Gen data in first notification:', validNotifications[0]?.gen);
    
    setPinnedNotifs(validNotifications);
    return validNotifications;

  } catch (error) {
    console.error('Error fetching fresh pinned notifications:', error);
    // Fallback to cached data if everything fails
    setPinnedNotifs(storedPinnedNotifs);
    return storedPinnedNotifs;
  }
};

  const fetchNotif = async () => {
  console.log("Fetching Notif!");

  try {
    const jsonId = localStorage.getItem("idpharma");
    const idpharma = JSON.parse(jsonId);

    if (!idpharma) {
      console.warn("⚠️ idpharma is empty");
      return;
    }

    const res = await axios.get(
      `${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/demande/${idpharma}`
    );

    if (res.data?.data) {
      const newArray = res.data.data.reverse();
      
      // Merge with existing notifications instead of replacing
      setNotificationListeRequest(prevNotifications => {
        if (!prevNotifications) {
          return newArray.slice(0, notification_load_limit);
        }
        
        // Create a map of existing notifications by ID for faster lookup
        const existingNotificationsMap = new Map(
          prevNotifications.map(notif => [notif.idnotifications, notif])
        );
        
        // Merge new notifications with existing ones
        const mergedNotifications = [...newArray];
        
        // Add existing notifications that aren't in the new array
        prevNotifications.forEach(existingNotif => {
          const existsInNew = newArray.some(
            newNotif => newNotif.idnotifications === existingNotif.idnotifications
          );
          if (!existsInNew) {
            mergedNotifications.push(existingNotif);
          }
        });
        
        // Remove duplicates and sort by most recent first
        const uniqueNotifications = mergedNotifications.filter((notif, index, self) =>
          index === self.findIndex(n => n.idnotifications === notif.idnotifications)
        );
        
        // Sort by creation date or ID (assuming higher ID = more recent)
        uniqueNotifications.sort((a, b) => {
          // If you have a timestamp field, use that instead
          return (b.idnotifications || 0) - (a.idnotifications || 0);
        });
        
        return uniqueNotifications.slice(0, notification_load_limit);
      });
    }

  } catch (e) {
    console.error("❌ Error fetching notifications:", e);
  } finally {
    setIsLoadingNotifaction(false);
  }
};


  const addNotif = (notifObject) => {
    setNotificationListeRequest(prev => {
      let arr = prev.slice(0, -1);
      arr.unshift(notifObject);

      return arr
    });
  }

  const removeNotif = (notificationToRemove) => {
  console.log('Removing notification:', notificationToRemove);
  setNotificationListeRequest(prev => {
    const filtered = prev.filter(notif => 
      notif.idnotifications !== notificationToRemove.idnotifications
    );
    console.log('Notifications after removal:', filtered.length, 'remaining');
    return filtered;
  });
};

  const fetchCommingClients = async () => {
    const jsonId = localStorage.getItem('idpharma')
    const idpharma = JSON.parse(jsonId)
    if (idpharma == null) {
      return "id empty"
    }
    else {
      axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/comming/${idpharma}`).then(res => {

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

  const confirmePerscription = async (idclient, perscriptionId, isOn) => {
  const jsonId = localStorage.getItem('idpharma');
  const idpharma = JSON.parse(jsonId);
  if (!idpharma) {
    alert('id incorrect please reconnect');
    return false;
  }

  const url = `${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/Confirmation_prescription/${idpharma}/${perscriptionId}`;
  const body = { idClient: idclient, posiologies: isOn ? posioData : [] };

  try {
    console.log('CONFIRM POST', url, body);
    const res = await axios.post(url, body);
    // adjust condition depending on your backend's response shape
    if (res.status === 200 && res.data?.success !== false) {
      console.log('confirm res', res.data);
      return true;
    } else if (res.status === 409) {
  console.warn("Prescription already processed");
  return false;
    } else {
      console.error('confirm failed', res.data);
      return false;
    }
  } catch (e) {
    console.error('confirmePerscription error:', e);
    return false;
  }
};


  const getUserData = () => {
    const idpharma = localStorage.getItem('idpharma');
    const storeName = localStorage.getItem('storeName');
    const profilePic = localStorage.getItem('profilePic');

    return {
        idpharma,
        storeName,
        profilePic
    };
};

const updateUserData = (newData) => {
    if (newData.storeName) {
        localStorage.setItem('storeName', newData.storeName);
    }
    if (newData.profilePic) {
        localStorage.setItem('profilePic', newData.profilePic);
    }
    if (newData.idpharma) {
        localStorage.setItem('idpharma', newData.idpharma);
    }
    
    // Dispatch event to notify all components
    window.dispatchEvent(new Event("userDataUpdated"));
};

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






  /*                                                                                    */////// Return

  return (

    <StateContext.Provider value={{
      setIdpharma,
      triggerNavigate, setTriggerNavigate, getUserData, updateUserData, notificationSettings, updateNotificationSettings,
      resetPasswordEmail, setResetPasswordEmail, socket, fetchNotif, setNotificationSettings,
      notificationListeRequests, setNotificationListeRequest, removeNotif,
      isLoadingNotification, setIsLoadingNotifaction, fetchCommingClients,
      notificationListeRequestsConfirmation, setNotificationListeRequestConfirmation
      , isLoadingNotificationConfirmation, setIsLoadingNotifactionConfirmation, storeName,
      confirmePerscription, isLoadingConfirmationPerscription, setIsLoadingConfirmationPerscription,
      posioData, setPosiodata, selectedFrequency, setSelectedFrequency, selectedPortion,
      setSelectedPortion, quantityPortion, frequency, setFrequency, timing, setTiming,
      quantity, setQuantity, days, setDays, todayStats, setDailyWidgetDate, dailyWidgetData,
      setGraphWidgetBeginDate, setGraphWidgetEndDate, graphWidgetData, dailyWidgetDate,
      graphWidgetBeginDate, graphWidgetEndDate, getPinnedNotifs, pinNotif, unpinNotif, pinnedNotifs,
      selectedNot, setSelectedNot, confirmType, isModalOpen, setModalOpen, handleOpenModal, openNotification, updateTodayStats, updateStats
    }}>

      {children}

    </StateContext.Provider>

  );

}


export const useStateContext = () => useContext(StateContext)