import React, { useCallback, useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom"; // Commented out for artifact compatibility
import { AiOutlinePushpin } from "react-icons/ai";
import { toast } from 'react-toastify';
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
    const [showFullImage, setShowFullImage] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    // const navigate = useNavigate(); // Commented out for artifact compatibility

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
        
        // Reset image states when notification changes
        setImageError(false);
        setImageLoaded(false);
    }, [selectedNotification]);

    // Enhanced formatPhoneForDisplay function
    function formatPhoneForDisplay(phone) {
        if (!phone || phone === '') {
            return "Numéro non disponible";
        }

        const phoneStr = String(phone).trim();
        
        if (phoneStr.startsWith('+')) {
            return phoneStr;
        }
        
        const parts = phoneStr.split(";").map(p => p.trim()).filter(Boolean);
        
        if (parts.length < 2) {
            const singlePart = parts[0] || phoneStr;
            if (/^\d+$/.test(singlePart)) {
                return `+${singlePart}`;
            }
            return singlePart || "Format invalide";
        }

        const countryCode = parts[0];
        let nationalNumber = parts[1];
        nationalNumber = nationalNumber.replace(/\D/g, "");
        
        if (!nationalNumber.startsWith("0")) {
            nationalNumber = "0" + nationalNumber;
        }

        return `+${countryCode} ${nationalNumber}`;
    }

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

    // [Previous helper functions remain the same - addFrequency, minusFrequency, etc.]
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

    /* Number of products */
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
    const [comment, setComment] = useState(selectedNotification?.comment || '');

    const togglePin = () => {
        if (isPinned == null) return;

        if (isPinned) {
            unpinNotif(selectedNotification.idnotifications);
        } else {
            pinNotif({
                ...selectedNotification,
                comment: comment,
                timestamp: Date.now(),
            });
        }
        setIsPinned(!isPinned);
    }

    const cancelPinAction = () => {
        setPinDialogShowing(false);
    };

    const pinAction = () => {
        togglePin();
        setPinDialogShowing(false);
        onClose();
        // navigate("/"); // Commented out for artifact compatibility
        toast.success('Commande épinglée', {
            duration: 3000,
            position: 'top-right',
        });
    };

    const handlePinOnClick = () => {
        setPinDialogShowing(true);
    };

    const onCommentChange = (value) => {
        setComment(value);
    };

    // New function to handle viewing full image
    const handleViewImage = () => {
        if (selectedNotification.url) {
            setShowFullImage(true);
        }
    };

    // Helper function to check if URL is a PDF
    const isPdfFile = (url) => {
        if (!url) return false;
        return url.toLowerCase().includes('.pdf') || url.toLowerCase().includes('pdf');
    };

    if (!isOpen) return null;

    // Full Image/PDF Modal
    if (showFullImage) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 select-none">
                <div className="relative max-w-4xl max-h-4xl w-full h-full p-4">
                    <button 
                        onClick={() => setShowFullImage(false)}
                        className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
                    >
                        ×
                    </button>
                    
                    {isPdfFile(selectedNotification.url) ? (
                        // PDF Viewer using react-pdf
                        <div className="w-full h-full flex justify-center items-center overflow-y-auto" ref={setContainerRef}>
                            <Document file={selectedNotification.url} onLoadSuccess={onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages), (_el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        className="my-2"
                                        pageNumber={index + 1}
                                        width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                    />
                                ))}
                            </Document>
                        </div>
                    ) : (
                        // Image Viewer
                        <img 
                            src={selectedNotification.url} 
                            alt="Full prescription" 
                            className="max-w-full max-h-full object-contain"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-40 select-none">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Confirmer l'achat?
                        </h2>
                        <button 
                            onClick={handleOnClose}
                            className="text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Image Preview Section */}
                        <div className="flex items-start space-x-3 mb-4">
                            {/* File Preview Thumbnail */}
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                                {isPdfFile(selectedNotification.url) ? (
                                    <div className="w-full h-full overflow-hidden flex items-center justify-center">
                                        <Document file={selectedNotification.url} onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page
                                            pageNumber={1}
                                            width={64} // roughly 16 * 4 (to fit your 16x16 box)
                                            height={64}
                                        />
                                        </Document>
                                    </div>
                                    ) : imageError ? (
                                    <div className="text-gray-400 text-xs text-center px-1">
                                        Image<br />Error
                                    </div>
                                    ) : !imageLoaded ? (
                                    <div className="text-gray-400 text-xs text-center">
                                        Loading...
                                    </div>
                                    ) : null}
                                
                                {!isPdfFile(selectedNotification.url) && (
                                    <img 
                                        src={selectedNotification.url} 
                                        alt="Prescription preview"
                                        className={`w-full h-full object-cover ${imageError ? 'hidden' : ''}`}
                                        onLoad={() => setImageLoaded(true)}
                                        onError={(e) => {
                                            console.error('Image failed to load:', selectedNotification.url);
                                            setImageError(true);
                                        }}
                                        style={{ display: imageError ? 'none' : 'block' }}
                                    />
                                )}
                            </div>
                            
                            {/* Info Section */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-base font-medium text-gray-900 truncate">
                                            {selectedNotification.firstname}
                                        </p>
                                        <p className="text-sm text-gray-900 pt-3">
                                            {formatPhoneForDisplay(selectedNotification?.phoneNumber || selectedNotification?.phone)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <button 
                                            onClick={handleViewImage}
                                            className="text-sm text-green-300 hover:text-green-400 font-medium"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={handlePinOnClick}
                                            className="flex items-center space-x-1 px-3 py-2 text-sm"
                                        >
                                            {isPinned ? (
                                            <AiFillPushpin className="text-green-300" />
                                            ) : (
                                            <AiOutlinePushpin className="text-gray-500" />
                                            )}
                                            <span className="text-green-300 hover:text-green-400 font-medium">
                                            {isPinned ? 'Épinglé' : 'Épingle'}
                                            </span>
                                            </button>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center p-4 border-t">
                         <button className="w-full mr-2 text-grey-900 px-4 py-2 border border-red-500 rounded-md hover:bg-red-400 text-sm"
                            onClick={() => {
                                // First unpin if it's pinned
                                if (isPinned) {
                                    unpinNotif(selectedNotification.idnotifications);
                                }
                                
                                if (selectedNotification.posioFlag !== undefined || selectedNotification.prix !== undefined) {
                                    // Vente refusal
                                    onRefuseConfirmation(selectedNotification.idnotifications);
                                } else {
                                    // Commande refusal
                                    onRefuse(selectedNotification.idnotifications);
                                }
                            }}
                        >
                            Refuser
                        </button>
                        <button
                                onClick={() => {
                                    if (isPinned) {
                                        unpinNotif(selectedNotification.idnotifications);
                                    }
                                    onConfirm(selectedNotification.idprescription, selectedNotification.idClient, isOn);
                                }}
                                className="w-full bg-green-400 text-gray-900 px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                            >
                                Confirm
                            </button>
                    </div>
                </div>
            </div>

            {/* Pin Dialog Modal */}
            {pinDialogShowing && (
                <TailwindCommentModal
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
                />
            )}
        </>
    );
}

export default ConfirmationModal;