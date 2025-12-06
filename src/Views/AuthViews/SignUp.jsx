import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthProvider.jsx';
import { validateEmail, validatePhoneNumber, validatePasswordLength, stringComparisonMatching, areAllTrue } from '../../Utils/Functions.jsx';
import { useNavigate } from 'react-router-dom';
import "./styles/auth.css";
import { toast } from 'react-toastify';
import MapComponent from '../../Components/Map.jsx';
import cities from '../../Utils/cities.json';

function SignUp() {
    const [stepFormSing, setStepFormSign] = useState({ 1: true, 2: false, 3: false });
    const [couter, setConter] = useState(1);
    const [showMap, setShowMap] = useState(true);
    const navigate = useNavigate();
    const [validationForm, setValidationForm] = useState({
        storeName: true,
        password: true,
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
        if (couter < 3) {
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

    const handleSignUpClick = async (e) => {
        e.preventDefault();
        if (couter === 3) {
            if (areAllTrue(validationForm)) {
                const result = await signRequest();
                if (result) {
                    console.log(result);
                    toast.error(result);
                } else {
                    navigate("/");
                }
            } else toast.error("Veuillez verifier les champs saisies !");
        } else {
            nextPage(e);
        }
    }

    return (
        <div className="bg-white flex w-full min-h-screen overflow-hidden">
            <div className="flex flex-col h-screen flex-grow">
                <div className="fixed inset-0 z-0 overflow-hidden bg-white">
                    <div className="loginbackground-gridContainer">
                        {/* Background grid elements remain unchanged */}
                    </div>
                </div>

                <div className="flex flex-col flex-grow z-10">
                    <main className="w-screen h-screen flex justify-center items-center overflow-hidden">
                        <div className="bg-white w-4/5 min-h-[90%] shadow-xl rounded-md flex flex-col py-10 justify-between items-center">
                            <div className="inline-flex w-[70%] items-center justify-center gap-4">
                                <div className={`w-10 h-10 bg-primary text-white text-center rounded-sm flex items-center justify-center transition duration-500`}>
                                    <span>1</span>
                                </div>
                                <span className={`h-[1px] w-[33%] ${stepFormSing[2] ? "bg-primary" : "bg-gray-400"} transition duration-500`}></span>
                                <div className={`w-10 h-10 ${stepFormSing[2] ? "bg-primary" : "bg-gray-400"} transition duration-500 text-white text-center rounded-sm flex items-center justify-center`}>
                                    <span>2</span>
                                </div>
                                <span className={`h-[1px] w-[33%] ${stepFormSing[3] ? "bg-primary" : "bg-gray-400"} transition duration-500`}></span>
                                <div className={`w-10 h-10 ${stepFormSing[3] ? "bg-primary" : "bg-gray-400"} transition duration-500 text-white text-center rounded-sm flex items-center justify-center`}>
                                    <span>3</span>
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-center justify-center relative duration-500">
                                <div className="m-auto text-xl font-bold text-[#494949] flex flex-col justify-center items-center gap-5">
                                    <h1>Bienvenue sur Pharma Express Desktop !</h1>
                                    <h2 className="text-sm text-[#868686] font-medium">Remplissez le formulaire et rejoignez-nous dans cette aventure entièrement innovante.</h2>
                                </div>

                                {/* First Form */}
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
  <select
    className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
    value={signForm.adressStore}
    name="adressStore"
    onChange={(e) => {
  const selectedCity = cities.find(c => c.city === e.target.value);
  const lat = selectedCity ? Number(selectedCity.latitude) : null;
  const lng = selectedCity ? Number(selectedCity.longitude) : null;

  setSignForm(prev => ({
    ...prev,
    adressStore: e.target.value,
    latitude: lat,
    longitude: lng,
  }));
  setValidationForm(prev => ({
    ...prev,
    latitude: !!lat,
    longitude: !!lng,
  }));
}}
  >
    <option value="">-- Sélectionnez une ville --</option>
    {cities.map((c, idx) => (
      <option key={idx} value={c.city}>
        {c.city}
      </option>
    ))}
  </select>
</div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Description</label>
                                        <textarea
                                            className="w-[250px] px-2 py-2 border border-[#bebebe] outline-primary rounded-md"
                                            onChange={Onchange}
                                            value={signForm.description}
                                            name="description"
                                        />
                                    </div>
                                </form>

{couter === 2 && (
  <div className="w-full transition duration-1000 flex flex-col items-center">
    {/* <button
      type="button"
      onClick={() => setShowMap(prev => !prev)}
      className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      {showMap ? "Masquer la carte" : "Afficher la carte"}
    </button> */}

    {showMap && (
    <div className="flex justify-center items-center w-full">
         <div className="w-[80%] max-w-[600px] h-[400px] rounded-md overflow-hidden shadow-md">
    <       MapComponent
                 latitude={signForm.latitude}
                 longitude={signForm.longitude}
                onLocationSelect={(lat, lng) => {
                setSignForm((prev) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
            }));
            setValidationForm((prev) => ({
            ...prev,
            latitude: !!lat,
            longitude: !!lng,
                     }));
                }}
            />
         </div>
        </div>

    )}
  </div>
)}



                                {/* Final Form */}
                                <form className={`${couter != 3 ? "absolute left-[2000px]" : ""} grid grid-cols-1 gap-4 w-full justify-items-center py-5 transition duration-1000`}>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-[#494949]">Adresse email</label>
                                        <input
                                            type="email"
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
                                    onClick={(e) => handleSignUpClick(e)}
                                >
                                    {couter === 3 ? "S'inscrire" : "Suivant"}
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