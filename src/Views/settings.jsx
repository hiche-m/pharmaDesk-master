import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import pfp4 from "../Assets/Images/pfp4.svg"
import SettingsInput from "../Components/SettingsInput.jsx";
import ToggleSwitch from "../Components/ToggleSwitch.jsx";
import { toast } from "react-toastify";
import TailwindAlertModal from "../Components/TailwindAlertModal.jsx";
import { useStateContext } from "../Context/ContextProvider.jsx";
import axios from "axios";
import { HOST, HOST_PORT_SEPARATOR, PORT } from "../Utils/Parameters.jsx";
import useUpdateInfo from "../Services/useUpdateInfo.jsx";
import { BiRefresh, BiSolidImageAdd } from "react-icons/bi";
import { ImUndo } from "react-icons/im";

const Settings = () => {

    const { notificationSettings, updateNotificationSettings, setNotificationSettings } = useStateContext()

    const [selectedIndex, setSelectedIndex] = useState(0);

    const settingsTiles = ["Compte Pharmacie", /* "Compte Personnel",  */"Sécurité", "Notifications"/* , "Profils" */];

    const [settingsInfo, setSettingsInfo] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(null);

    const handleEditClick = () => {
        console.log('Edit');

    };

    const handleAccountClick = () => {
        console.log('Account');
        /* setSelectedIndex(settingsTiles.indexOf('Profils')); */
    };

    const handleDropdownClick = () => {
        console.log('Open dropdown');
    };

    const handleMenuSwitch = (index) => {
        setSelectedIndex(index);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Effects

    useEffect(() => {
        if (settingsInfo) {
            setPharmacyForm({
                storeName: settingsInfo ? settingsInfo.storeName : '',
                adress: settingsInfo ? settingsInfo.adresse : '',
                phone: settingsInfo ? settingsInfo.phoneNumber : '',
                description: settingsInfo ? settingsInfo.description : '',
                latitude: settingsInfo ? settingsInfo.latitude : null,
                longitude: settingsInfo ? settingsInfo.longitude : null,
            });

            /* setPersonalForm({
                lastName: settingsInfo ? settingsInfo.nameOwner.split(' ')[0] : '',
                firstName: settingsInfo ? settingsInfo.nameOwner.split(' ')[1] : '',
                phone: settingsInfo ? settingsInfo.phoneNumber : '',
                adress: settingsInfo ? settingsInfo.adresse : '',
            }); */

            setSecurityForm({
                ...securityForm,
                ['email']: settingsInfo.email,
            });
        }
    }, [settingsInfo])

    useEffect(() => {
        if (!settingsInfo) {
            const pharmaId = localStorage.getItem('idpharma');
            if (pharmaId) {
                axios.get(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/accountInfo/${pharmaId}`).then((res) => {
                    if (!res || !res.data) {
                        console.log('There was a problem fetching settings information...' + res);
                        setHasError('There was a problem fetching settings information');
                    } else {
                        const temp = res.data.data;
                        setSettingsInfo(res.data.data);

                        console.log("DATA");
                        console.log(res.data.data);


                        setdefaultPharmacyForm({
                            storeName: temp ? temp.storeName : '',
                            adress: temp ? temp.adresse : '',
                            phone: temp ? temp.phoneNumber : '',
                            description: temp ? temp.description : '',
                            latitude: temp ? temp.latitude : null,
                            longitude: temp ? temp.longitude : null,
                        });

                        /* setDefaultPersonalForm({
                            lastName: temp ? temp.nameOwner.split(' ')[0] : '',
                            firstName: temp ? temp.nameOwner.split(' ')[1] : '',
                            phone: temp ? temp.phoneNumber : '',
                            adress: temp ? temp.adresse : '',
                        }); */

                        setDefaultSecurityForm({
                            ...defaultSecurityForm,
                            ['email']: temp.email,
                        });

                        if (hasError) {
                            setHasError(null);
                        }
                    }
                });
            }
            setNotificationSettings(null);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (notificationSettings) {
            setNotificationForm(notificationSettings)
        }
    }, [notificationSettings]);

    const { profileUpdateLoading, profileUpdateError, setProfileUpdateError, updateProfile, updatePassword } = useUpdateInfo();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Forms Section
    ////////////////////////////////////////////////// Pharmacy Settings
    const [defaultPharmacyForm, setdefaultPharmacyForm] = useState({
        storeName: '',
        adress: '',
        phone: '',
        description: '',
        latitude: null,
        longitude: null,
    });

    const [pharmacyForm, setPharmacyForm] = useState(defaultPharmacyForm);

    const changePharmacyFormValue = (key, value) => {
        if (value != null) {
            setPharmacyForm({
                ...pharmacyForm,
                [key]: value,
            });
        }
    };

    const resetPharmacyForm = () => {
        setPharmacyForm(defaultPharmacyForm);
    }

    const handlePharmacyFormSave = () => {
        const form = {};

        let count = 0;
        for (let key in pharmacyForm) {
            // Check if the property exists in both pharmacyForm and defaultPharmacyForm
            if (pharmacyForm.hasOwnProperty(key)) {
                // If the value in pharmacyForm is different from defaultPharmacyForm, keep the value
                // Otherwise, set it to null
                if (pharmacyForm[key] !== defaultPharmacyForm[key]) {
                    form[key] = pharmacyForm[key];
                    count += 1;
                } else {
                    form[key] = null;
                }
            }
        }

        if (count > 0) {
            console.log('Sending request...');
            updateProfile(form, {});
        }
    };

    ////////////////////////////////////////////////// Personal Settings
    /* const [defaultPersonalForm, setDefaultPersonalForm] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        adress: '',
    }); */

    /* const [personalForm, setPersonalForm] = useState(defaultPersonalForm); */

    /* const changePersonalFormValue = (key, value) => {
        setPersonalForm({
            ...personalForm,
            [key]: value,
        });
    };

    const resetPersonalForm = () => {
        setPersonalForm(defaultPersonalForm);
    }

    const handlePersonalFormSave = () => {
        const form = {};

        let count = 0;
        for (let key in personalForm) {
            // Check if the property exists in both personalForm and defaultPersonalForm
            if (personalForm.hasOwnProperty(key)) {
                // If the value in personalForm is different from defaultPersonalForm, keep the value
                // Otherwise, set it to null
                if (personalForm[key] !== defaultPersonalForm[key]) {
                    form[key] = personalForm[key];
                    count += 1;
                } else {
                    form[key] = null;
                }
            }
        }

        if (personalForm.firstName !== defaultPersonalForm.firstName || personalForm.lastName !== defaultPersonalForm.lastName) {
            form.firstName = personalForm.firstName;
            form.lastName = personalForm.lastName;
        }

        if (count > 0) {
            console.log('Sending request...');
            updateProfile({}, form);
        }
    }; */

    ////////////////////////////////////////////////// Security Settings
    const [defaultSecurityForm, setDefaultSecurityForm] = useState({
        email: '',
        newPassword: '',
        repeatPassword: '',
        oldPassword: '',
    });

    const [securityForm, setSecurityForm] = useState(defaultSecurityForm);

    const changeSecurityFormValue = (key, value) => {
        setSecurityForm({
            ...securityForm,
            [key]: value,
        });
    };

    const resetSecurityForm = () => {
        setSecurityForm(defaultSecurityForm);
    }

    const handleSecurityFormSave = () => {

        if (securityForm.newPassword === '' || securityForm.repeatPassword === '' || securityForm.oldPassword === '') {
            setProfileUpdateError('Tous les champs sont obligatoires!');
            console.log('Tous les champs sont obligatoires!');
        } else if (securityForm.newPassword !== securityForm.repeatPassword) {
            setProfileUpdateError('Le nouveau mot de passe et la confirmation ne correspondent pas!');
            console.log('Le nouveau mot de passe et la confirmation ne correspondent pas!');
        } else {
            if (profileUpdateError) {
                setProfileUpdateError(null);
            }
            console.log('Sending request...');
            updatePassword(securityForm);
        }
    };

    ////////////////////////////////////////////////// Notification Settings

    const [notificationForm, setNotificationForm] = useState(notificationSettings);

    const toggleNotificationFormValue = (key) => {
        setNotificationForm({
            ...notificationForm,
            [key]: !notificationForm[key],
        });
    };

    const resetNotificationForm = () => {
        setNotificationForm(notificationSettings);
    }

    ////////////////////////////////////////////////// Profile Settings
    /* const roleObject = {
        'admin': 'Administrateur',
        'seller': 'Vendeur'
    };

    const initialProfiles = [
        {
            name: 'Harrison Pfannerstill',
            role: Object.keys(roleObject)[0],
            url: null,
        },
    ];

    const [profileList, setProfileList] = useState(initialProfiles);

    const addNewProfile = () => {
        setProfileList([...profileList, {
            name: '',
            role: Object.keys(roleObject)[1],
            url: null,
        }]);
    };

    const removeProfileByIndex = (index) => {
        const numOfAdmins = profileList.filter(profile => profile.role === Object.keys(roleObject)[0]);
        if (numOfAdmins.length > 1 || profileList[index].role !== Object.keys(roleObject)[0]) {
            setProfileList([
                ...profileList.slice(0, index),
                ...profileList.slice(index + 1)
            ]);
        } else {
            showAlertDialog('Action impossible!', "Impossible de supprimer tous les profils d'administrateur.", 'Fermer');
        }
    };

    const changeProfileName = (index, value) => {
        setProfileList([
            ...profileList.slice(0, index),
            {
                name: value,
                role: profileList[index].role,
                url: profileList[index].url,
            },
            ...profileList.slice(index + 1)
        ]);
    };

    const changeProfileRole = (index, value) => {
        const numOfAdmins = profileList.filter(profile => profile.role === Object.keys(roleObject)[0]);
        if (numOfAdmins.length > 1 || profileList[index].role !== Object.keys(roleObject)[0]) {
            setProfileList([
                ...profileList.slice(0, index),
                {
                    name: profileList[index].name,
                    role: value,
                    url: profileList[index].url,
                },
                ...profileList.slice(index + 1)
            ]);
        } else {
            showAlertDialog('Action impossible!', "Impossible de supprimer tous les profils d'administrateur.", 'Fermer');
        }
    };

    const resetProfiles = () => {
        setProfileList(initialProfiles);
    }; */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////// Delete Modal Dialog
    /* const [deleteDialogShowing, setDeleteDialogShowing] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const cancelAction = () => {
        setDeleteDialogShowing(false);
    };

    const deleteProfileAction = () => {
        removeProfileByIndex(deleteIndex);
        setDeleteDialogShowing(false);
    };

    const handleDeleteOnClick = (index) => {
        setDeleteIndex(index);
        setDeleteDialogShowing(true);
    }; */
    /////////////////////////////////////////////////////////////////// Alert Modal Dialog
    const [alertDialogShowing, setAlertDialogShowing] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [alertActionLabel, setAlertActionLabel] = useState("D'accord");

    const alertActionFunction = () => {
        setAlertDialogShowing(false);
    };

    const showAlertDialog = (title, content, actionLabel) => {
        if (title) {
            setAlertTitle(title);
        }
        if (content) {
            setAlertContent(content);
        }
        if (actionLabel) {
            setAlertActionLabel(actionLabel);
        }
        setAlertDialogShowing(true);
    };

    ////////////////////////////////////////////////////// Profile Picture

    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureLoading, setProfilePictureLoading] = useState(false);
    const [profilePictureError, setProfilePictureError] = useState(null);
    const [profilePictureSuccess, setProfilePictureSuccess] = useState(false);
    const [profilePictureResponse, setProfilePictureResponse] = useState(null);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    }

    const handleProfilePictureUpload = async () => {
        if (profilePicture) {
            setProfilePictureLoading(true);
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append('id', localStorage.getItem('idpharma'));

            try {
                const response = await axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/setProfilePic`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setProfilePictureResponse(response.data);
                setProfilePictureSuccess(true);
                setProfilePictureError(null)
            } catch (error) {
                console.error('Error uploading file:', error);
                setProfilePictureSuccess(false);
                setProfilePictureError('Error uploading file');
            }
            setProfilePictureLoading(false);
        }
    }

    const handleProfilePictureDelete = async () => {
        try {
            setProfilePictureLoading(true);
            const formData = new FormData();
            formData.append('profilePicture', "");
            formData.append('pharmaId', localStorage.getItem('idpharma'));
            const response = await axios.post(`${HOST}${HOST_PORT_SEPARATOR}${PORT}/api/pharma/setProfilePic`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
        }
        setProfilePicture(null);
        setProfilePictureSuccess(false);
        setProfilePictureResponse(null);
        setProfilePictureLoading(false);
    }

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (profilePicture) {
            handleProfilePictureUpload();
        }
    }, [profilePicture]);

    return (<>
        {alertDialogShowing && (<TailwindAlertModal title={alertTitle} content={alertContent} actionLabel={alertActionLabel} actionFunction={alertActionFunction} />)}
        {/* {deleteDialogShowing && (<TailwindConfirmModal title='Vous êtes sûrs ?' content='Cela supprimera le profil sélectionné, cette action peut ne pas être réversible.' actionLabel='Supprimer' cancelLabel='Annuler' actionFunction={() => deleteProfileAction()} cancelAction={() => cancelAction()} />)} */}
        {/* Profile */}
        <div className="col-span-12 row-span-3 ml-4 inline-flex flex-row justify-start items-center space-x-2">
            <div className="inline-flex flex-row space-x-1">
                <label htmlFor="profilePictureInput" className="hidden sm:block rounded-full cursor-pointer bg-primary p-3 hover:bg-primary/90 text-white active:bg-darkPrimary">
                    <BiSolidImageAdd />
                </label>
                {/* profilePictureLoading
profilePictureError
profilePictureSuccess */}
                <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleProfilePictureChange(event)}
                />
                {/* <span className={`hidden sm:block rounded-full ${selectedIndex === settingsTiles.indexOf('Profils') ? '' : 'cursor-pointer'} ${selectedIndex === settingsTiles.indexOf('Profils') ? 'bg-textSecoundary/70' : 'bg-disabled'} p-3 ${selectedIndex === settingsTiles.indexOf('Profils') ? '' : 'hover:bg-disabled/90'} text-textPrimary active:bg-textSecoundary/70`} onClick={selectedIndex === settingsTiles.indexOf('Profils') ? null : () => handleAccountClick()}><MdManageAccounts /></span>
                <span className="rounded-full cursor-pointer bg-disabled p-3 hover:bg-disabled/90 text-textPrimary active:bg-textSecoundary/70" onClick={() => handleDropdownClick()}><HiDotsHorizontal /></span> */}
            </div>
            <div className="inline-flex flex-row space-x-2 items-center">
                {!profilePictureLoading && (<img className="hidden sm:block h-12 w-12 rounded-full bg-disabled" src={settingsInfo && settingsInfo.userPic ? settingsInfo.userPic : pfp4} />)}
                {profilePictureLoading && (<div className="hidden sm:block h-12 w-12 rounded-full bg-disabled animate-pulse" />)}
                <span className="flex flex-col">
                    <span className="font-medium">{pharmacyForm.storeName}</span>
                    <span className="text-sm text-textSecoundary">{pharmacyForm.adress}</span>
                </span>
                <span className="text-sm flex justify-center items-center">
                    {profilePictureError && (<span className="text-red-500">Un erreur s'est produit, veuillez réessayer plus tard.</span>)}
                    {profilePictureSuccess && (<span className="text-green-500">Photo modifiée avec succès.</span>)}
                    {(profilePictureError || profilePictureSuccess) && (<BiRefresh className="text-textSecoundary text-2xl cursor-pointer" onClick={() => refreshPage()} />)}
                </span>
            </div>
        </div>

        {/* Settings */}
        <span className="col-span-12 row-span-1 text-lg font-bold">Settings</span>

        {/* Content */}
        <div className={`col-span-12 row-span-10 flex flex-col small:inline-flex small:flex-row bg-superClear rounded-xl shadow-md ${profileUpdateLoading ? 'pointer-events-none' : ''} ${profileUpdateLoading ? 'blur-sm' : ''}`}>
            {/* Side Menu */}
            <div className={`bg-lightShapes flex flex-row flex-wrap space-y-0 space-x-4 small:flex small:flex-col small:space-y-4 small:space-x-0 p-4 rounded-tl-xl`}>
                {settingsTiles.map((item, index) => (<span className={`font-medium cursor-pointer ${index === selectedIndex ? 'text-textPrimary' : 'text-textSecoundary'}`} key={`setting-item-tile-${index}-${item}`} onClick={() => handleMenuSwitch(index)}>
                    <span className="sm:hidden small:block hidden" >{item}</span>
                    <span className="sm:block small:hidden hidden" >{item.split(' ').at(-1)}</span>
                    <span className="sm:hidden small:hidden block" >{index + 1}</span>
                </span>))}
            </div>

            {/* Content */}
            <div className="w-full">
                {profileUpdateError && (<span className="p-4 text-red-500 font-medium">{profileUpdateError}</span>)}

                {/* Account Settings */}
                <div className={`${selectedIndex === 0 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Informations sur la pharmacie</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-x-2 small:gap-x-10">
                            <SettingsInput placeholder='Nom du pharmacie...' flexible={true} onChange={(value) => changePharmacyFormValue('storeName', value)} value={pharmacyForm.storeName} />
                            <SettingsInput placeholder='Adresse du pharmacie...' flexible={true} onChange={(value) => changePharmacyFormValue('adress', value)} value={pharmacyForm.adress} />
                            <SettingsInput placeholder='Numéro téléphone pharmacie...' flexible={true} onChange={(value) => changePharmacyFormValue('phone', value)} value={pharmacyForm.phone} />
                            <SettingsInput placeholder='Description...' large={true} flexible={true} onChange={(value) => changePharmacyFormValue('description', value)} value={pharmacyForm.description} />
                            <SettingsInput placeholder='Latitude' flexible={true} onChange={(value) => changePharmacyFormValue('latitude', value)} value={pharmacyForm.latitude} />
                            <SettingsInput placeholder='Longitude' flexible={true} onChange={(value) => changePharmacyFormValue('longitude', value)} value={pharmacyForm.longitude} />
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
                        <button className="text-textSecoundary" onClick={() => resetPharmacyForm()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center underline italic">
                                <ImUndo />
                                <span>Réinitialiser</span>
                            </span>
                        </button>
                        <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 active:bg-darkPrimary" onClick={() => handlePharmacyFormSave()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center px-2 text-white">
                                <FaSave />
                                <span>Sauvegarder</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Personal Info */}
                {/* <div className={`${selectedIndex === 1 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Informations personnelles </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto gap-x-2 small:gap-x-10">
                            <SettingsInput placeholder='Votre nom...' flexible={true} onChange={(value) => changePersonalFormValue('lastName', value)} value={personalForm.lastName} />
                            <SettingsInput placeholder='Votre prénom...' flexible={true} onChange={(value) => changePersonalFormValue('firstName', value)} value={personalForm.firstName} />
                            <SettingsInput placeholder='Votre numéro téléphone...' flexible={true} onChange={(value) => changePersonalFormValue('phone', value)} value={personalForm.phone} />
                            <SettingsInput placeholder='Votre adresse complète...' large={true} flexible={true} onChange={(value) => changePersonalFormValue('adress', value)} value={personalForm.adress} />
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
                        <button className="text-textSecoundary" onClick={() => resetPersonalForm()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center underline italic">
                                <FaTrashAlt />
                                <span>Réinitialiser</span>
                            </span>
                        </button>
                        <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 active:bg-darkPrimary" onClick={() => handlePersonalFormSave()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center px-2 text-white">
                                <FaSave />
                                <span>Sauvegarder</span>
                            </span>
                        </button>
                    </div>
                </div> */}

                {/* Security */}
                <div className={`${selectedIndex === 1 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-medium">Informations de sécurité</span>
                        <div className="grid grid-cols-1 overflow-y-auto mr-2 small:mr-20">
                            <div className="flex flex-col space-y-2 py-2">
                                <span className={`bg-lightShapes p-2 outline-none rounded-md text-textSecoundary`}>{securityForm.email}</span>
                            </div>
                            {/* <SettingsInput placeholder='Adresse mail...' flexible={true} onChange={(value) => changeSecurityFormValue('email', value)} value={securityForm.email} /> */}
                            <span className="col-span-1 h-5" />
                            <SettingsInput placeholder='Nouveau mot de passe...' flexible={true} onChange={(value) => changeSecurityFormValue('newPassword', value)} value={securityForm.newPassword} obscure={true} />
                            <SettingsInput placeholder='Confirmer le nouveau mot de passe...' flexible={true} onChange={(value) => changeSecurityFormValue('repeatPassword', value)} value={securityForm.repeatPassword} obscure={true} />
                            <span className="col-span-1 h-5" />
                            <SettingsInput placeholder='Votre mot de passe actuel...' flexible={true} onChange={(value) => changeSecurityFormValue('oldPassword', value)} value={securityForm.oldPassword} obscure={true} />
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
                        <button className="text-textSecoundary" onClick={() => resetSecurityForm()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center underline italic">
                                <FaTrashAlt />
                                <span>Vider</span>
                            </span>
                        </button>
                        <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 active:bg-darkPrimary" onClick={() => handleSecurityFormSave()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center px-2 text-white">
                                <FaSave />
                                <span>Sauvegarder</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className={`${selectedIndex === 2 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    {!notificationForm && (
                        <div className="h-full w-full flex grow justify-center items-center">Chargement...</div>
                    )}
                    {notificationForm && (<div className="flex flex-col space-y-2">
                        <span className="font-medium">Paramètres de notifications</span>
                        <div className="grid grid-cols-1 overflow-y-auto space-y-2 py-2">
                            {/* First Row */}
                            <div className="inline-flex flex-row w-full justify-between">
                                <span className="flex flex-col">
                                    <span>Émettre un son lorsqu'une nouvelle commande arrive.</span>
                                    <span className="text-textSecoundary italic text-sm">Nouvelle Commande !</span>
                                </span>
                                <ToggleSwitch value={notificationForm.notificationSound} toggleSwitch={() => toggleNotificationFormValue('notificationSound')} />
                            </div>
                            {/* Secound Row */}
                            <div className="inline-flex flex-row w-full justify-between">
                                <span className="flex flex-col">
                                    <span>Émettre un son lorsqu'un client confirme qu'il va venir.</span>
                                    <span className="text-textSecoundary italic text-sm">Un client a choisi votre pharmacie !</span>
                                </span>
                                <ToggleSwitch value={notificationForm.confirmationSound} toggleSwitch={() => toggleNotificationFormValue('confirmationSound')} />
                            </div>
                            {/* Third Row */}
                            <div className="inline-flex flex-row w-full justify-between">
                                <span className="flex flex-col">
                                    <span>Afficher un message lorsqu'une notification arrive.</span>
                                    <span className="text-textSecoundary underline text-sm cursor-pointer" onClick={() => toast('Vide')}>Cliquez ici pour prévisualiser</span>
                                </span>
                                <ToggleSwitch value={notificationForm.showToast} toggleSwitch={() => toggleNotificationFormValue('showToast')} />
                            </div>
                        </div>
                    </div>)}
                    <div className="inline-flex w-full justify-between">
                        <button className="text-textSecoundary" onClick={() => resetNotificationForm()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center underline italic">
                                <ImUndo />
                                <span>Réinitialiser</span>
                            </span>
                        </button>
                        <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 active:bg-darkPrimary" onClick={() => updateNotificationSettings(notificationForm)}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center px-2 text-white">
                                <FaSave />
                                <span>Sauvegarder</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Profiles Settings */}
                {/* <div className={`${selectedIndex === 4 ? 'flex' : 'hidden'} flex-col h-full justify-between p-4 space-y-4`}>
                    <div className="flex flex-col space-y-2">
                        <div className="inline-flex flex-row w-full justify-between items-center py-2">
                            <span className="font-medium">Gestion de profils</span>
                            <IoMdAdd className="text-textSecoundary cursor-pointer" onClick={() => addNewProfile()} />
                        </div>
                        <div className="flex flex-col space-y-2 py-2 max-h-80 overflow-y-auto">
                            {profileList.map((profile, index) => (<div key={`settings-profile-${index}`} className="flex flex-col small:inline-flex small:flex-row w-full justify-between items-start small:items-center">
                                <div className="inline-flex flex-row space-x-2 items-center">
                                    <img className="hidden sm:block h-12 w-12 rounded-full bg-gray-500" src={pfp4} />
                                    <span className="flex flex-col">
                                        <input className="font-medium placeholder:font-normal placeholder:italic" placeholder="Nom du profil" value={profile.name} onChange={(event) => changeProfileName(index, event.target.value)} />
                                        <span className="text-sm text-textSecoundary">{roleObject[profile.role]}</span>
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-0 py-0 sm:space-y-2 sm:py-2 sm:inline-flex sm:flex-row space-x-4 items-center">
                                    <button className="text-red-500 underline text-sm mt-1" onClick={() => handleDeleteOnClick(index)}>Supprimer</button>
                                    <DropdownMenu options={Object.entries(roleObject).map((row, index) => {
                                        return { label: row[1], value: row[0] };
                                    })} label={'Role'} selectedValue={profile.role} onSelect={(value) => changeProfileRole(index, value)} />
                                </div>
                            </div>))}
                        </div>
                    </div>
                    <div className="inline-flex w-full justify-between">
                        <button className="text-textSecoundary" onClick={() => resetProfiles()}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center underline italic">
                                <FaTrashAlt />
                                <span>Réinitialiser</span>
                            </span>
                        </button>
                        <button className="bg-primary p-2 rounded-lg hover:bg-primary/90 active:bg-darkPrimary" onClick={() => console.log(profileList)}>
                            <span className="inline-flex flex-row space-x-2 text-base items-center px-2 text-white">
                                <FaSave />
                                <span>Sauvegarder</span>
                            </span>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    </>);
}

export default Settings;