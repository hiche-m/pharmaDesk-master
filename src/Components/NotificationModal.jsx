import React, { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaMinus } from "react-icons/fa6";
import DropdownMenu from './DropDownMenu.jsx';
import { useStateContext } from '../Context/ContextProvider.jsx';

const Modal = ({ isOpen, onClose, onRefuse, onAccept, onConfirm, selectedNotification, confirmType }) => {

    const { posioData, setPosiodata } = useStateContext()
    

    if (!isOpen) return null;

    const [isImageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState("");
    const handleOnClose = () => {
        setError("");
        onClose();
    };

    if (confirmType) {

        const portionObjects = {
            'take': 'Par prise',
            'volume': 'Par volume',
            'weight': 'Par poids',
            'c_cafe': 'Par cuillère à caffé',
            'c_soup': 'Par cuillère à soupe',
            'autre': 'Autre'
        }

        const portionTypes = {
            'take': 1,
            'volume': 10,
            'weight': 10,
            'c_cafe': 1,
            'c_soup': 1,
            'autre': null,
        };

        const [selectedPortion, setSelectedPortion] = useState('take');
        /* Quantity Per Take */
        const quantityPortion = 1 / 2;
        const [quantity, setQuantity] = useState(0);


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

        const [selectedFrequency, setSelectedFrequency] = useState('heur');

        const [frequency, setFrequency] = useState(1);

        /* Enable Posiologie */
        const [isOn, setIsOn] = useState(false);

        const toggleSwitch = () => {
            setIsOn(!isOn);
        };


        const addFrequency = () => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                frequence: item.quantite + 1
            } : item));
        }

        const minusFrequency = () => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex && item.quantite > quantityPortion ? {
                ...item,
                frequence: item.quantite - 1
            } : item));
        }

        const addQuantity = () => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex ? {
                ...item,
                quantite: item.quantite + portionTypes[selectedPortion]
            } : item));
        };

        const minusQuantity = () => {
            setPosiodata(prev => prev.map((item, i) => i === formIndex && item.quantite > quantityPortion ? {
                ...item,
                quantite: item.quantite - portionTypes[selectedPortion]
            } : item));
        };


        /* When to take? */
        const timingList = {
            ajeun: "À jeun",
            avantRepas: "Avant Repas",
            pendantRepas: "Pendant Repas",
            apresRepas: "Après Repas",
        };
        const [timing, setTiming] = useState(0);

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
        const daysPortion = 15;
        const [days, setDays] = useState(daysPortion);

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
        
        setPosiodata([{
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
        }])
             

        
        
        const [formIndex, setFormIndex] = useState(0);

        /* const addProduct = () => {
            setForm(prev => {
                const form = [...prev, {
                    "nomPils": '',
                    "quantite": quantityPortion,
                    "avantRepas": timing === 0 ? 1 : 0,
                    "apresRepas": timing === 1 ? 1 : 0,
                    "ajeun": timing === 2 ? 1 : 0,
                    "matin": often.matin ? 1 : 0,
                    "apresMidi": often.apresMidi ? 1 : 0,
                    "soire": often.soire ? 1 : 0,
                    "duree": daysPortion
                }];
                return form;
            });
            navigateNext();
        } */

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

        /* const updateForm = () => {
            setForm(prev => prev.map((item, index) => (index === formIndex ? {
                "nomPils": '',
                "quantite": quantity,
                "avantRepas": timing === 0 ? 1 : 0,
                "apresRepas": timing === 1 ? 1 : 0,
                "ajeun": timing === 2 ? 1 : 0,
                "matin": often.matin ? 1 : 0,
                "apresMidi": often.apresMidi ? 1 : 0,
                "soire": often.soire ? 1 : 0,
                "duree": days
            }
                : item)));
            console.log(form);
        } */

        /* useEffect(() => {
            updateForm();
        }, [quantity, timing, often, days]); */

        const currentForm = posioData[formIndex];
        console.log("this is the current form",currentForm);
        
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
                            <div className={`grid grid-cols-6 grid-rows-5 space-y-2 my-4 ${!isOn ? 'pointer-events-none cursor-default' : ''}`}>
                                {/* Line 1 */}
                                <div className="row-span-1 col-span-6">
                                    <div className="inline-flex flex-row space-x-2 items-center justify-between">
                                        <span>Posiologie?</span>
                                        <ToggleSwitch value={isOn} toggleSwitch={toggleSwitch} className='pointer-events-auto' />
                                        <div className='inline-flex justify-center items-center space-x-1'>
                                            <MdDeleteForever className={`text-[1.5rem] cursor-pointer ${isOn ? 'text-red-500' : 'text-gray-500'}`} onClick={() => deleteProduct()} />
                                            <GrFormPrevious className="bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl" onClick={() => navigatePrevious()} />
                                            <span className='text-textPrimary px-2 py-1 bg-lightShapes rounded-lg'>{formIndex + 1}</span>
                                            <MdNavigateNext className='bg-transparent cursor-pointer p-1 text-[2rem] text-textSecoundary hover:bg-lightShapes hover:rounded-xl' onClick={() => navigateNext()} />
                                            <IoMdAdd className='text-[1.5rem] cursor-pointer text-textSecoundary' onClick={() => addProduct()} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row-span-1 col-span-6">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>Fréquence de prise</span>
                                        {frequencyTypes[selectedFrequency] != null && (<div className='inline-flex justify-center items-center space-x-1'>
                                            <FaMinus className='text-[1.2rem] cursor-pointer text-textSecoundary' onClick={() => minusFrequency()} />
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

                                {/* Line 2 */}
                                <div className="row-span-1 col-span-6">
                                    <div className="inline-flex flex-row space-x-2 items-center">
                                        <span>Quelle quantité par prise?</span>
                                        {portionTypes[selectedPortion] != null && (<div className='inline-flex justify-center items-center space-x-1'>
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

                                {/* Line 3 */}
                                <div className="row-span-1 col-span-6 space-x-2">
                                    <span className='mb-2'>Quand prendre?</span>
                                    {Object.entries(timingList).map(([key, value], index) => (<div className='flex justify-start items-start space-x-1 mx-1' key={`timing-key-${index}`}>
                                        <input
                                            type="radio"
                                            className={`${isOn ? 'accent-primary' : 'accent-gray-500'} cursor-pointer`}
                                            value={index}
                                            checked={currentForm[key]}
                                            onChange={() => handleTiming(index)} />
                                        <span>{value}</span>
                                    </div>))}
                                </div>

                                {/* Line 4 */}
                                {/* <div className="row-span-1 col-span-6 space-x-2">
                                    <span className='mr-2'>À quelle fréquence?</span>
                                    {Object.entries(oftenList).map(([key, value], index) => (
                                        <span key={`often-key-${index}`} onClick={() => handleOften(key)} className={`${currentForm[key] ? 'text-white' : 'text-textPrimary'} px-2 py-1 ${currentForm[key] ? isOn ? 'bg-primary' : 'bg-gray-500' : 'bg-lightShapes'} rounded-lg cursor-pointer select-none`}>{value}</span>
                                    ))}
                                </div> */}

                                {/* Line 5 */}
                                <div className="row-span-1 col-span-6 mt-4">
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
                                        onClick={() => onConfirm(selectedNotification.idprescription, selectedNotification.idClient, isOn ? posioData : [])}
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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 select-none">
            <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
                <div className="flex flex-col items-center">
                    {isImageLoading && (
                        <div className="w-32 h-32 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                    {error !== "" && (
                        <div className="flex justify-center items-center">
                            <span className="text-lg text-red-500">{error}</span>
                        </div>
                    )}
                    {error === "" && (<img
                        src={selectedNotification.url}
                        alt="Perscription"
                        className="mb-4 w-96 h-96 object-cover rounded-md"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setError("Image unavailable!")}
                    />)}

                    {/* Info */}
                    <h2 className="text-lg font-bold mb-2">Accepter l'ordonnance?</h2>
                    <p className="text-gray-600 mb-4 text-center">
                        <b>{selectedNotification.firstname}</b> a envoyé une ordonnance.
                    </p>

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
                                onClick={() => onAccept(selectedNotification.idprescription, selectedNotification.idClient)}
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;