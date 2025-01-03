import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

const NotificationModal = ({ isOpen, onClose, onRefuse, onAccept, selectedNotification }) => {

    if (!isOpen) return null;

    const [isImageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState("");
    const handleOnClose = () => {
        setError("");
        onClose();
    };

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
                        <div className="w-[33vw] h-[33vw] flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                    {error !== "" && (
                        <span className="text-lg text-red-500">{error}</span>
                    )}
                    {error === "" && (<img
                        src={selectedNotification.url}
                        alt="Perscription"
                        className={`${isImageLoading ? 'w-[1ch] h-[1ch]' : 'w-[33vw] h-[33vw]'} object-cover rounded-md`}
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

export default NotificationModal;