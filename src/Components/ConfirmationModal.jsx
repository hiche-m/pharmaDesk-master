import React, { useCallback, useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import { AiOutlinePushpin } from "react-icons/ai";
import { AiFillPushpin } from "react-icons/ai";
import DropdownMenu from './DropDownMenu.jsx';
import { useStateContext } from '../Context/ContextProvider.jsx';
import { Document, Page } from 'react-pdf';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import TailwindCommentModal from './TailwindCommentModal.jsx';



const resizeObserverOptions = {};

const maxWidth = 600;

const ConfirmationModal = ({ isOpen, onClose, onRefuse, onConfirm, selectedNotification }) => {

    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();
    const [isPinned, setIsPinned] = useState(false);


    const onResize = useCallback((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
        setImageLoading(false);
    }

    const { posioData, setPosiodata,
        selectedFrequency,
        selectedPortion,
        quantityPortion, frequency,
        pinNotif, unpinNotif, pinnedNotifs,
    } = useStateContext();

    const daysPortion = 15;

    const [isImageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState("");
    const handleOnClose = () => {
        setError("");
        onClose();
    };

    /* Enable Posiologie */
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        const isPinned = pinnedNotifs.some((pin) => pin.idnotifications === selectedNotification.idnotifications);
        setIsPinned(isPinned);

        setComment(selectedNotification.comment || '');

    }, [selectedNotification]);

    /* Frequency */

    const frequencyObjects = {
        'heur': 'Par heur',
        'jour': 'Par jour',
        'mois': 'Par mois',
        'autre': 'Autre',
    }

    const frequencyTypes = {
        'heur': 'h',
        'jour': 'j',
        'mois': 'm',
        'autre': null,
    };

    const toggleSwitch = () => {
        /* setIsOn(!isOn); */
    };

    const addFrequency = () => {
        setPosiodata([
            ...posioData.slice(0, formIndex),
            {
                ...posioData[formIndex],
                frequence: posioData[formIndex].frequence + 1,
            },
            ...posioData.slice(formIndex + 1)
        ]);
    }

    const minusFrequency = () => {
        if (posioData[formIndex].frequence > 1) {
            setPosiodata([
                ...posioData.slice(0, formIndex),
                {
                    ...posioData[formIndex],
                    frequence: posioData[formIndex].frequence - 1,
                },
                ...posioData.slice(formIndex + 1)
            ]);
        }
    }

    const handleFrequencyChange = (value) => {
        const number = parseInt(value);
        if (!isNaN(number) && number > 0) {
            setPosiodata([
                ...posioData.slice(0, formIndex),
                {
                    ...posioData[formIndex],
                    frequence: number,
                },
                ...posioData.slice(formIndex + 1)
            ]);
        }
    };

    const handleFrequencyTypeChange = (value) => {
        setPosiodata([
            ...posioData.slice(0, formIndex),
            {
                ...posioData[formIndex],
                frequenceDetails: value,
            },
            ...posioData.slice(formIndex + 1)
        ]);
    };

    /* Portion/Quantity */

    const portionObjects = {
        'take': 'Par prise',
        'volume': 'Par volume',
        'weight': 'Par poids',
        'c_cafe': 'Par cuillère à caffé',
        'c_soup': 'Par cuillère à soupe',
        'autre': 'Autre'
    }

    const portionValues = {
        'take': 1,
        'volume': 10,
        'weight': 10,
        'c_cafe': 1,
        'c_soup': 1,
        'autre': null,
    };

    const portionTypes = {
        'take': '',
        'volume': 'ml',
        'weight': 'g',
        'c_cafe': '',
        'c_soup': '',
        'autre': null,
    };

    const addQuantity = () => {
        setPosiodata([
            ...posioData.slice(0, formIndex),
            {
                ...posioData[formIndex],
                quantite: posioData[formIndex].quantite + 1,
            },
            ...posioData.slice(formIndex + 1)
        ]);
    };

    const minusQuantity = () => {
        if (posioData[formIndex].quantite > 1) {
            setPosiodata([
                ...posioData.slice(0, formIndex),
                {
                    ...posioData[formIndex],
                    quantite: posioData[formIndex].quantite - 1,
                },
                ...posioData.slice(formIndex + 1)
            ]);
        }
    };

    const handleQuantityChange = (value) => {
        let number = parseInt(value);
        if (!isNaN(number) && number > 0) {
            number = number / portionValues[posioData[formIndex].quantiteDetails];
            setPosiodata([
                ...posioData.slice(0, formIndex),
                {
                    ...posioData[formIndex],
                    quantite: number,
                },
                ...posioData.slice(formIndex + 1)
            ]);
        }
    };

    const handleQuantityTypeChange = (value) => {
        setPosiodata([
            ...posioData.slice(0, formIndex),
            {
                ...posioData[formIndex],
                quantiteDetails: value,
            },
            ...posioData.slice(formIndex + 1)
        ]);
    };


    /* When to take? */
    const timingList = {
        ajeun: "À jeun",
        avantRepas: "Avant Repas",
        pendantRepas: "Pendant Repas",
        apresRepas: "Après Repas",
    };

    const handleTiming = (index) => {
        setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
            ...item,
            ajeun: index === 0 ? 1 : 0,
            avantRepas: index === 1 ? 1 : 0,
            pendantRepas: index === 2 ? 1 : 0,
            apresRepas: index === 3 ? 1 : 0,
        } : item));
    };

    const addDays = () => {
        setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
            ...item,
            duree: item.duree + daysPortion
        } : item));
    };

    const minusDays = () => {
        setPosiodata(prev => prev.map((item, i) => i === formIndex && item.duree > daysPortion ? {
            ...item,
            duree: item.duree - daysPortion
        } : item));
    };


    /*   Number of products */

    const [formIndex, setFormIndex] = useState(0);

    const addProduct = () => {
        setPosiodata(prev => [
            ...prev,
            {
                "nomPils": '',
                "quantite": quantityPortion,
                "quantiteDetails": selectedPortion,
                "ajeun": 1,
                "avantRepas": 0,
                "pendantRepas": 0,
                "apresRepas": 0,
                "matin": 0,
                "apresMidi": 0,
                "soire": 0,
                "duree": daysPortion,
                "frequence": frequency,
                "frequenceDetails": selectedFrequency,
            }
        ]);
        navigateNext();
    };

    const deleteProduct = () => {
        if (posioData.length > 1) {
            const currentIndex = formIndex;
            if (currentIndex > 0) {
                navigatePrevious();
            }
            setPosiodata(prev => prev.filter((_, i) => i !== currentIndex));
        }
    }

    const navigateNext = () => {
        if (posioData.length === 1) {
            return;
        }

        if (formIndex === posioData.length - 1) {
            setFormIndex(0);
        } else {
            setFormIndex(prev => prev + 1);
        }
    }

    const navigatePrevious = () => {
        if (posioData.length === 1) {
            return;
        }

        if (formIndex === 0) {
            setFormIndex(posioData.length - 1);
        } else {
            setFormIndex(prev => prev - 1);
        }
    }

    const currentForm = posioData[formIndex];
    /* DIALOG */
    const [pinDialogShowing, setPinDialogShowing] = useState(false);

    const [comment, setComment] = useState(selectedNotification.comment || '');

    const togglePin = () => {
        if (isPinned == null) return;

        if (isPinned) {
            unpinNotif(selectedNotification.idnotifications);
        }
        else {
            console.log(selectedNotification);
            
            pinNotif({
                ...selectedNotification,
                comment: comment,
                timestamp: Date.now(),
            });
        }
        setIsPinned(!isPinned);
    }

    const cancelPinAction = () => {
        /* Closes Dialog */
        setPinDialogShowing(false);
    };

    const pinAction = () => {
        /* Disconnect */
        /* handleLogout();
        navigate(0); */
        togglePin();
        setPinDialogShowing(false);
    };

    const handlePinOnClick = () => {
        /* Open Dialog */
        setPinDialogShowing(true);
    };

    const onCommentChange = (value) => {
        setComment(value);
    };

    if (!isOpen) return null;

    return (<>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-40 select-none`}>
            <div className="bg-white w-max rounded-lg p-6 shadow-lg">
                <div className="inline-flex w-max h-max space-x-4">
                    {/* {isImageLoading && (
                        <div className="w-[33vw] h-[33vw] flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    )} */}
                    {error !== "" && (
                        <span className="text-lg text-red-500">{error}</span>
                    )}
                    {/* PDF */}
                    <div className="max-h-[33vw] h-[33vw] max-w-[33vw] w-[33vw] flex justify-center items-center overflow-y-auto my-2" ref={setContainerRef}>
                        <Document file={selectedNotification.url} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (_el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    className={"my-2"}
                                    pageNumber={index + 1}
                                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                />
                            ))}
                        </Document>
                    </div>

                    <div className="flex flex-col justify-between items-start">
                        {/* Info */}
                        <div className="flex flex-col justify-start items-start space-y-2">
                            <span className='inline-flex grow justify-between items-center'>
                                <h2 className="text-lg font-bold p-0">Confirmer l'achat ?</h2>
                                <div className='ml-2' onClick={() => handlePinOnClick()}>
                                    {isPinned ?
                                        (<AiFillPushpin className={`text-[1.5rem] text-primary`} />) :
                                        (<AiOutlinePushpin className='text-[1.5rem] cursor-pointer text-textSecoundary' />)}
                                </div>
                            </span>
                            <span className="text-gray-600 font-medium">
                                {`${selectedNotification.firstname} ${selectedNotification.lastname}`} | {`0${selectedNotification.phoneNumber.split(";")[1]}`}
                            </span>
                            <p className="text-gray-600">
                                Confirmez l'achat et envoyer la posologie des médicaments au client.
                            </p>
                            <div className={`flex flex-col space-y-2 pt-4 ${!isOn ? 'pointer-events-none cursor-default' : ''}`}>
                                {/* Line 1 */}
                                <div className="">
                                    <div className="inline-flex flex-row space-x-2 items-center justify-between">
                                        <span className='opacity-35'>Posologie ?</span>
                                        <ToggleSwitch value={isOn} toggleSwitch={toggleSwitch} className='pointer-events-auto opacity-35' />
                                        <div className='inline-flex justify-center items-center space-x-1'>
                                            <MdDeleteForever className={`text-[1.5rem] ${isOn && posioData.length > 1 ? 'cursor-pointer text-red-500' : 'text-gray-500'} opacity-35`} onClick={() => deleteProduct()} />
                                            {posioData.length > 1 && (<GrFormPrevious className="bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl" onClick={() => navigatePrevious()} />)}
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg opacity-35'>Med {formIndex + 1}</span>
                                            {posioData.length > 1 && (<MdNavigateNext className='bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl' onClick={() => navigateNext()} />)}
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary opacity-35' onClick={() => addProduct()} />
                                        </div>
                                        <span className='text-textSecoundary italic'>
                                            Bientôt disponible
                                        </span>
                                    </div>
                                </div>

                                {/* Line 2 */}
                                <div className="opacity-35">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>{'Fréquence de prise: '}</span>
                                        {frequencyTypes[posioData[formIndex].frequenceDetails] != null && (<div className='inline-flex justify-center items-center space-x-1'>
                                            <FaMinus className={`text-[1.2rem] ${posioData[formIndex].frequence > 1 ? 'text-textSecoundary cursor-pointer' : 'text-disabled'}`} onClick={() => minusFrequency()} />
                                            <span>{'Chaque '}</span>
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg inline-flex'><input className='outline-none bg-transparent w-10 text-center' value={currentForm["frequence"]} onChange={(event) => handleFrequencyChange(event.target.value)} />{frequencyTypes[posioData[formIndex].frequenceDetails]}</span>
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addFrequency()} />
                                        </div>)}
                                        <DropdownMenu options={Object.entries(frequencyObjects).map(([key, value]) => ({
                                            value: key,
                                            label: value
                                        }))} label={frequencyObjects[posioData[formIndex].frequenceDetails]} selectedValue={posioData[formIndex].frequenceDetails} onSelect={(value) => handleFrequencyTypeChange(value)}
                                            disabled={!isOn}
                                        />
                                    </div>
                                </div>

                                {/* Line 3 */}
                                <div className="opacity-35">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>Quelle quantité par prise?</span>
                                        {portionValues[posioData[formIndex].quantiteDetails] != null && (<div className='inline-flex justify-center items-center space-x-1'>
                                            <FaMinus className={`text-[1.2rem] ${posioData[formIndex].quantite > 1 ? 'text-textSecoundary cursor-pointer' : 'text-disabled'}`} onClick={() => minusQuantity()} />
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg inline-flex'><input className='outline-none bg-transparent w-10 text-center' value={currentForm["quantite"] * portionValues[posioData[formIndex].quantiteDetails]} onChange={(event) => handleQuantityChange(event.target.value)} />{portionTypes[posioData[formIndex].quantiteDetails]}</span>
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addQuantity()} />
                                        </div>)}
                                        <DropdownMenu options={Object.entries(portionObjects).map(([key, value]) => ({
                                            value: key,
                                            label: value
                                        }))} label={portionObjects[posioData[formIndex].quantiteDetails]} selectedValue={posioData[formIndex].quantiteDetails} onSelect={(value) => handleQuantityTypeChange(value)}
                                            disabled={!isOn}
                                        />
                                    </div>
                                </div>

                                {/* Line 4 */}
                                <div className="flex flex-col space-x-2 opacity-35">
                                    <span className='mb-2'>Quand prendre?</span>
                                    {Object.entries(timingList).map(([key, value], index) => (<div className='flex flex-row justify-start items-center space-x-1 mx-1' key={`timing-key-${index}`}>
                                        <input
                                            type="radio"
                                            className={`${isOn ? 'accent-primary' : 'accent-gray-500'} cursor-pointer`}
                                            value={index}
                                            checked={currentForm[key]}
                                            onChange={() => handleTiming(index)} />
                                        <span>{value}</span>
                                    </div>))}
                                </div>

                                {/* Line 5 */}
                                <div className=" mt-4 opacity-35">
                                    <span className='mr-2'>Durée de traitement: </span>
                                    <div className='inline-flex justify-center items-center space-x-1'>
                                        <FaMinus className='text-[1.2rem] text-textSecoundary cursor-pointer' onClick={() => minusDays()} />
                                        <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{currentForm["duree"]}j</span>
                                        <IoMdAdd className='text-[1.5rem] text-textSecoundary cursor-pointer' onClick={() => addDays()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Spacer */}
                        <div className="flex grow h-full w-full" />
                        {/* Actions */}
                        <div className="flex justify-between w-full">
                            <button
                                onClick={handleOnClose}
                                className="text-gray-400 px-4 py-2 rounded hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <div className="inline-flex">
                                <button
                                    onClick={() => onRefuse(selectedNotification.idnotifications)}
                                    className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                                >
                                    Refuser
                                </button>
                                <button
                                    onClick={() => onConfirm(selectedNotification.idprescription, selectedNotification.idClient, isOn)}
                                    className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {pinDialogShowing && (<TailwindCommentModal
            className="absolute z-[100]"
            title={isPinned ? "Retirer l'épingle de cette notification ?" : "Épingler cette notification ?"}
            comment={comment}
            isPinned={isPinned}
            onCommentChange={onCommentChange}
            color={isPinned ? 'red-600' : 'primary'}
            actionLabel={isPinned ? "Retirer" : "Épingler"}
            cancelLabel="Annuler"
            actionFunction={pinAction}
            cancelAction={cancelPinAction}
        />)}
    </>
    );
}


export default ConfirmationModal;