import React, { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import DropdownMenu from './DropDownMenu.jsx';
import { useStateContext } from '../Context/ContextProvider.jsx';
import { FaTrashAlt } from "react-icons/fa";

const Modal = ({ isOpen, onClose, onRefuse, onAccept, onConfirm, selectedNotification, confirmType }) => {

    const { posioData, setPosiodata,
        selectedFrequency, setSelectedFrequency,
        selectedPortion, setSelectedPortion,
        frequency, setFrequency,
        timing, setTiming,
        quantity, setQuantity,
        days, setDays,
    } = useStateContext()

    const quantityPortion = 1 / 2;
    const daysPortion = 15;
    if (!isOpen) return null;

    const [isImageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState("");
    const handleOnClose = () => {
        setError("");
        onClose();
    };

    if (confirmType) {


        /* Enable Posiologie */
        const [isOn, setIsOn] = useState(false);


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
            setIsOn(!isOn);
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

        const addQuantity = () => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                quantite: item.quantite + portionValues[selectedPortion]
            } : item));
        };

        const minusQuantity = () => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex && item.quantite > quantityPortion ? {
                ...item,
                quantite: item.quantite - portionValues[selectedPortion]
            } : item));
        };


        /* When to take? */
        const timingList = {
            ajeun: "À jeun",
            avantRepas: "Avant Repas",
            pendantRepas: "Pendant Repas",
            apresRepas: "Après Repas",
        };


        /* const handleTiming = (index) => {
            setTiming(index);
        } */
        /* const handleTiming = (index) => {
            setForm(prev => prev.map((item, i) =>
                i === formIndex ? {
                    ...item,
                    avantRepas: index === 0 ? 1 : 0,
                    apresRepas: index === 1 ? 1 : 0,
                    ajeun: index === 2 ? 1 : 0
                } : item
            ));
        }; */
        const handleTiming = (index) => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                ajeun: index === 0 ? 1 : 0,
                avantRepas: index === 1 ? 1 : 0,
                pendantRepas: index === 2 ? 1 : 0,
                apresRepas: index === 3 ? 1 : 0,
            } : item));
        };


        /* How often? */
        const oftenList = {
            matin: "Matin",
            apresMidi: "Après Midi",
            soire: "Soir",
        };
        const [often, setOften] = useState({
            matin: false,
            apresMidi: true,
            soire: false,
        });

        /* const handleOften = (key) => {
            setOften(prev => {
                const newOften = { ...prev };
                newOften[key] = !newOften[key];
                return newOften;
            });
        } */
        const handleOften = (key) => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                [key]: item[key] === 1 ? 0 : 1
            } : item));
        };


        /* Number of days */

        /* const addDays = () => {
            setDays(prev => prev + daysPortion);
        }

        const minusDays = () => {
            if (days > daysPortion) {
                setDays(prev => prev - daysPortion);
            }
        } */
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
                    "ajeun": 0,
                    "avantRepas": 1,
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


        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 select-none" >
                <div className="bg-white w-max rounded-lg p-6 shadow-lg">
                    <div className="flex flex-row items-center">
                        {isImageLoading && (
                            <div className="w-32 h-32 flex justify-center items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                        {error === "" && (<img
                            src={selectedNotification.url}
                            alt="Perscription"
                            className="mr-4 w-96 h-96 object-cover rounded-md"
                            onLoad={() => setImageLoading(false)}
                            onError={() => setError("Image unavailable!")}
                        />)}
                        <div className="flex flex-col justify-center items-start">
                            {error !== "" && (
                                <div className="flex justify-center items-center">
                                    <span className="text-lg text-red-500">{error}</span>
                                </div>
                            )}

                            {/* Info */}
                            <h2 className="text-lg font-bold mb-2">Confirmer l'achat?</h2>
                            <div className={`flex flex-col space-y-2 my-4 ${!isOn ? 'pointer-events-none cursor-default' : ''}`}>
                                {/* Line 1 */}
                                <div className="">
                                    <div className="inline-flex flex-row space-x-2 items-center justify-between">
                                        <span>Posiologie?</span>
                                        <ToggleSwitch value={isOn} toggleSwitch={toggleSwitch} className='pointer-events-auto' />
                                        <div className='inline-flex justify-center items-center space-x-1'>
                                            <MdDeleteForever className={`text-[1.5rem] ${isOn && posioData.length > 1 ? 'cursor-pointer text-red-500' : 'text-gray-500'}`} onClick={() => deleteProduct()} />
                                            {posioData.length > 1 && (<GrFormPrevious className="bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl" onClick={() => navigatePrevious()} />)}
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>Med {formIndex + 1}</span>
                                            {posioData.length > 1 && (<MdNavigateNext className='bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl' onClick={() => navigateNext()} />)}
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addProduct()} />
                                        </div>
                                    </div>
                                </div>

                                {/* Line 2 */}
                                <div className="">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>Fréquence de prise</span>
                                        {frequencyTypes[selectedFrequency] != null && (<div className='inline-flex justify-center items-center space-x-1'>
                                            <FaMinus className={`text-[1.2rem] cursor-pointer ${posioData[formIndex].frequence > 1 ? 'text-textSecoundary' : 'text-disabled'}`} onClick={() => minusFrequency()} />
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{currentForm["frequence"]}{frequencyTypes[selectedFrequency]}</span>
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addFrequency()} />
                                        </div>)}
                                        <DropdownMenu options={Object.entries(frequencyObjects).map(([key, value]) => ({
                                            value: key,
                                            label: value
                                        }))} label={frequencyObjects[selectedFrequency]} selectedValue={selectedFrequency} onSelect={(value) => {
                                            setSelectedFrequency(value);
                                        }}
                                            disabled={!isOn}
                                        />
                                    </div>
                                </div>

                                {/* Line 3 */}
                                <div className="">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>Quelle quantité par prise?</span>
                                        {portionValues[selectedPortion] != null && (<div className='inline-flex justify-center items-center space-x-1'>
                                            <FaMinus className='text-[1.2rem] cursor-pointer text-textSecoundary' onClick={() => minusQuantity()} />
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{currentForm["quantite"]}</span>
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addQuantity()} />
                                        </div>)}
                                        <DropdownMenu options={Object.entries(portionObjects).map(([key, value]) => ({
                                            value: key,
                                            label: value
                                        }))} label={portionObjects[selectedPortion]} selectedValue={selectedPortion} onSelect={(value) => {
                                            setSelectedPortion(value);
                                        }}
                                            disabled={!isOn}
                                        />
                                    </div>
                                </div>

                                {/* Line 4 */}
                                <div className="flex flex-col space-x-2">
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

                                {/* <div className=" space-x-2">
                                    <span className='mr-2'>À quelle fréquence?</span>
                                    {Object.entries(oftenList).map(([key, value], index) => (
                                        <span key={`often-key-${index}`} onClick={() => handleOften(key)} className={`${currentForm[key] ? 'text-white' : 'text-textPrimary'} px-2 py-1 ${currentForm[key] ? isOn ? 'bg-primary' : 'bg-gray-500' : 'bg-lightShapes'} rounded-lg cursor-pointer select-none`}>{value}</span>
                                    ))}
                                </div> */}

                                {/* Line 5 */}
                                <div className=" mt-4">
                                    <span className='mr-2'>Durée de traitement: </span>
                                    <div className='inline-flex justify-center items-center space-x-1'>
                                        <FaMinus className='text-[1.2rem] text-textSecoundary cursor-pointer' onClick={() => minusDays()} />
                                        <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{currentForm["duree"]}j</span>
                                        <IoMdAdd className='text-[1.5rem] text-textSecoundary cursor-pointer' onClick={() => addDays()} />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between w-full">
                                <button
                                    onClick={handleOnClose}
                                    className="text-gray-400 px-4 py-2 rounded hover:bg-gray-50"
                                >
                                    Ignore
                                </button>
                                <div className="inline-flex">
                                    <button
                                        onClick={() => onRefuse(selectedNotification.idnotifications)}
                                        className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => onConfirm(selectedNotification.idprescription, selectedNotification.idClient, isOn)}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* Commentaire */

    const [comment, setComment] = useState('');

    const onCommentChange = (value) => {
        setComment(value);
    };

    /* Liste Générique */

    const [genList, setGenList] = useState([]);

    const addMed = () => {
        setGenList([
            ...genList,
            false
        ]);
    };

    const removeMed = (index) => {
        setGenList([
            ...genList.slice(0, index),
            ...genList.slice(index + 1)
        ]);
    };

    const toggleMed = (index) => {
        setGenList([
            ...genList.slice(0, index),
            !genList[index],
            ...genList.slice(index + 1)
        ]);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 select-none">
            <div className="bg-white rounded-lg p-4 w-max h-max shadow-lg">
                <div className="inline-flex w-max h-max space-x-4">
                    {isImageLoading && (
                        <div className="w-[33vw] aspect-square flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                    {error !== "" && (
                        <span className="text-lg text-red-500">{error}</span>
                    )}
                    {error === "" && (<img
                        src={selectedNotification.url}
                        alt="Perscription"
                        className="w-[33vw] aspect-square mb-4 object-cover rounded-md"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setError("Image unavailable!")}
                    />)}
                    <div className="flex flex-col items-start space-y-2 max-h-full">
                        {/* Info */}
                        <h2 className="text-lg font-bold m-0 p-0">Accepter l'ordonnance?</h2>
                        <p className="text-gray-600 text-center">
                            <b>{selectedNotification.firstname}</b> a envoyé une ordonnance.
                        </p>

                        {/* Form */}
                        <div className="h-full flex flex-col mt-2">
                            <textarea className="bg-lightShapes rounded-lg outline-none p-2 resize-none" placeholder="Commentaire..." value={comment} onChange={(event) => onCommentChange(event.target.value)} />
                            <div className="w-full inline-flex justify-between mt-4">
                                <span className='text-textSecoundary font-medium'>Disponibilité ({(!genList || genList.length === 0) ? '/' : genList.length})</span>
                                <span className='text-textPrimary'>Générique?</span>
                            </div>
                            <div className="flex flex-col overflow-y-auto max-h-72 space-y-2 mt-2">
                                <span className="flex justify-start items-center text-textSecoundary italic text-sm cursor-pointer">
                                    <IoMdAdd />
                                    <span onClick={() => addMed()}>Cliquer ici pour ajouter un médicament...</span>
                                </span>
                                {(!genList || genList.length === 0) && (<div key={`medicine-modal-gen-(-1)`} className="w-full inline-flex justify-between pointer-events-none">
                                    <div className="inline-flex items-center space-x-2">
                                        <FaTrashAlt className='text-disabled text-sm' />
                                        <span className='text-textSecoundary'>Médicament 1</span>
                                    </div>
                                    <ToggleSwitch className="opacity-35" value={false} toggleSwitch={() => { }} />
                                </div>)}
                                {genList.map((value, index) => (<div key={`medicine-modal-gen-${index}`} className="w-full inline-flex justify-between">
                                    <div className="inline-flex items-center space-x-2">
                                        <FaTrashAlt className='text-textSecoundary text-sm cursor-pointer' onClick={() => removeMed(index)} />
                                        <span className='text-textPrimary'>Médicament {index + 1}</span>
                                    </div>
                                    <ToggleSwitch value={value} toggleSwitch={() => toggleMed(index)} />
                                </div>))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between w-full">
                            <button
                                onClick={handleOnClose}
                                className="text-gray-400 px-4 py-2 rounded hover:bg-gray-50"
                            >
                                Ignore
                            </button>
                            <div className="inline-flex">
                                <button
                                    onClick={() => onRefuse(selectedNotification.idnotifications)}
                                    className="text-red-500 px-4 py-2 rounded hover:bg-red-50"
                                >
                                    Refuse
                                </button>
                                <button
                                    onClick={() => onAccept(selectedNotification.idprescription, selectedNotification.idClient, comment, genList)}
                                    className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;