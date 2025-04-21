import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthProvider.jsx';
import { validateEmail, validatePhoneNumber, validatePasswordLength, stringComparisonMatching, areAllTrue } from '../../Utils/Functions.jsx';
import { useNavigate } from 'react-router-dom';
import "./styles/auth.css";

function SignUp() {
    const [stepFormSing, setStepFormSign] = useState({ 1: true, 2: false });
    const [couter, setConter] = useState(1);
    const navigate = useNavigate();
    const [validationForm, setValidationForm] = useState({
        storeName: true,
        /* nameOwner: true, */
        password: true,
        /* phoneNumber: true, */
        phonePharmacy: true,
        description: true,
        email: true,
        latitude: true,
        longitude: true,
        adresse: true,
        confirmation: true
    });

    const nextPage = (e) => {
        e.preventDefault();
        if (couter < 2) {
            setConter(prev => {
                setStepFormSign((data) => ({ ...data, [prev + 1]: true }));
                return prev + 1;
            });
        }
    };

    const previousPage = (e) => {
        e.preventDefault();
        if (couter > 1) {
            setConter(prev => {
                setStepFormSign((data) => ({ ...data, [prev]: false }));
                return prev - 1;
            });
        } else navigate("/");
    };

    const { signForm, setSignForm, signRequest } = useAuthContext();

    const Onchange = (e) => {
        const { value, name } = e.target;
        setSignForm(prev => ({ ...prev, [name]: value }));

        /* if (name === "phoneNumber") {
            setValidationForm(prev => ({ ...prev, "phoneNumber": validatePhoneNumber(value) }));
        } */
        if (name === "email") {
            setValidationForm(prev => ({ ...prev, "email": validateEmail(value) }));
        }
        if (name === "phonePharmacy") {
            setValidationForm(prev => ({ ...prev, "phonePharmacy": validatePhoneNumber(value) }));
        }
        if (name === 'password')
            setValidationForm(prev => ({ ...prev, password: validatePasswordLength(value) }));
        if (name === 'confirmation') {
            setValidationForm(prev => ({ ...prev, confirmation: stringComparisonMatching(signForm.password, value) }));
        }
    };

    return (
        <div className="bg-white flex w-full min-h-screen overflow-hidden">
            <div className="flex flex-col h-screen flex-grow">
                <div className="fixed inset-0 z-0 overflow-hidden bg-white">
                    <div className="loginbackground-gridContainer">
                        <div className="flex" style={{ gridArea: "top / start / 8 / end" }}>
                            <div className="flex-grow bg-gradient-to-b from-white to-[rgb(247,250,252)] to-[33%]"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
                            <div className="flex-grow shadow-[inset_0_0_0_2px_#e3e8ee] animate-left-right-3s"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "6 / start / auto / 2" }}>
                            <div className="flex-grow bg-darkPrimary"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "7 / start / auto / 4" }}>
                            <div className="flex-grow bg-primary animate-left-right"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
                            <div className="flex-grow bg-gray-100 animate-left-right-3s"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "2 / 15 / auto / end" }}>
                            <div className="flex-grow bg-selection animate-right-left-4s"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "3 / 14 / auto / end" }}>
                            <div className="flex-grow bg-primary animate-right-left"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
                            <div className="flex-grow bg-gray-100 animate-right-left-4s"></div>
                        </div>
                        <div className="flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
                            <div className="flex-grow shadow-[inset_0_0_0_2px_#e3e8ee] animate-right-left-3s"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-grow z-10">
                    <main className="w-screen h-screen flex justify-center items-center overflow-hidden">
                        <div className="bg-white w-4/5 min-h-[80%] shadow-xl rounded-md flex flex-col py-10 justify-between items-center">
                            <div className="flex w-[70%] items-center justify-between">
                                <div className={`w-10 h-10 bg-primary text-white text-center rounded-sm flex items-center justify-center transition duration-500`}>
                                    <span>1</span>
                                </div>
                                <span className={`h-[1px] w-[30%] ${stepFormSing[2] ? "bg-primary" : "bg-gray-400"} transition duration-500`}></span>
                                <div className={`w-10 h-10 ${stepFormSing[2] ? "bg-primary" : "bg-gray-400"} transition duration-500 text-white text-center rounded-sm flex items-center justify-center`}>
                                    <span>2</span>
                                </div>
                                {/* <span className={`h-[1px] w-[30%] ${stepFormSing[3] ? "bg-primary" : "bg-gray-400"} transition duration-500`}></span>
                                <div className={`w-10 h-10 ${stepFormSing[3] ? "bg-primary" : "bg-gray-400"} transition duration-500 text-white text-center rounded-sm flex items-center justify-center`}>
                                    <span>3</span>
                                </div> */}
                            </div>

                            <div className="w-full flex flex-col items-center justify-center relative duration-500">
                                <div className="m-auto text-xl font-bold text-[#494949] flex flex-col justify-center items-center gap-5">
                                    <h1>Bienvenue sur Pharma Express Desktop !</h1>
                                    <h2 className="text-sm text-[#868686] font-medium">Remplissez le formulaire et rejoignez-nous dans cette aventure entièrement innovante.</h2>
                                </div>

                                {/* <form className={`${couter != 1 ? "absolute right-[2000px]" : ""} grid grid-cols-2 gap-4 w-full justify-items-center py-5 transition duration-1000`}>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Nom complet</label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            name="nameOwner"
                                            value={signForm.nameOwner}
                                            onChange={Onchange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Adresse email</label>
                                        <input
                                            type="malito"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.email}
                                            name="email"
                                        />
                                        {!validationForm.email && <span className="text-lg text-left text-red-500/70">L'adresse Email est inccorecte</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Numéro de téléphone <span className="text-[#7e7e7e] text-sm">(personnel)</span></label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.phoneNumber}
                                            name="phoneNumber"
                                        />
                                        {!validationForm.phoneNumber && <span className="text-lg text-left text-red-500/70 ">Le Numero de telephone est inccorect</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Adresse complète</label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.adresse}
                                            name="adresse"
                                        />
                                    </div>
                                </form> */}

                                <form className={`${couter != 1 ? "absolute left-[2000px]" : ""} grid grid-cols-2 gap-4 w-full justify-items-center py-5 transition duration-1000`}>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Nom de votre Officine</label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.storeName}
                                            name="storeName"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Numéro de téléphone</label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.phonePharmacy}
                                            name="phonePharmacy"
                                        />
                                        {!validationForm.phonePharmacy && <span className="text-lg text-left text-red-500/70">Le Numero de téléphone est incorrect</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Adresse d'officine</label>
                                        <input
                                            type="malito"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.adressStore}
                                            name="adressStore"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Description</label>
                                        <textarea
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.description}
                                            name="description"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Latitude</label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.latitude}
                                            name="latitude"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Longitude</label>
                                        <input
                                            type="text"
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.longitude}
                                            name="longitude"
                                        />
                                    </div>
                                </form>

                                <form className={`${couter != 2 ? "absolute left-[2000px]" : ""} grid grid-cols-1 gap-4 w-full justify-items-center py-5 transition duration-1000`}>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Adresse email</label>
                                        <input
                                            type="malito"
                                            className="w-[350px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.email}
                                            name="email"
                                        />
                                        {!validationForm.email && <span className="text-lg text-left text-red-500/70">L'adresse Email est incorrecte</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Mot de Passe</label>
                                        <input
                                            type="password"
                                            className="w-[350px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.password}
                                            name="password"
                                        />
                                        {!validationForm.password && <span className="text-lg text-left text-red-500/70">Le Mot de Passe est trop Court.</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Confirmer Votre Mot de Passe</label>
                                        <input
                                            type="password"
                                            className="w-[350px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            value={signForm.confirmation}
                                            name="confirmation"
                                            onChange={Onchange}
                                        />
                                        {!validationForm.confirmation && <span className="text-lg text-left text-red-500/70 w-[350px]">Le Mot de Passe est incorrect.</span>}
                                    </div>
                                    <div className="inline-flex gap-2">
                                        <input type="checkbox" />
                                        <label className="font-semibold text-[#494949]">Accepter les conditions d'utilisation de <span className="text-[#7e7e7e] text-sm">Pharma Express ©</span></label>
                                    </div>
                                </form>
                            </div>

                            <div className="w-[90%] flex gap-4 flex-row-reverse">
                                <button
                                    className="py-2 px-5 text-white font-semibold rounded-md bg-primary"
                                    onClick={(e) => {
                                        if (couter === 2) {
                                            if (areAllTrue(validationForm)) signRequest();
                                            else alert("Veuillez verifier les champs saisies ");
                                        } else {
                                            nextPage(e);
                                        }
                                    }}
                                >
                                    {couter === 2 ? "S'inscrire" : "Suivant"}
                                </button>
                                <button className="py-2 px-5 text-white font-semibold rounded-md bg-slate-400" onClick={previousPage}>Précédent</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SignUp;