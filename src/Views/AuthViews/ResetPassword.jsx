import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthProvider.jsx';
import { validatePasswordLength, stringComparisonMatching } from '../../Utils/Functions.jsx';
import { useNavigate } from 'react-router-dom';
import "./styles/auth.css";

export default function ResetPassword() {
    const { resetPasswordForm, setResetPasswordForm, resetPassword, triggerNavigateHome, setTriggerNavigateHome } = useAuthContext();
    const [validationResetForm, setValidationResetForm] = useState({
        password: true,
        confirmation: true,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (triggerNavigateHome) {
            navigate("/");
            setTriggerNavigateHome(false);
        }
    }, [triggerNavigateHome, navigate, setTriggerNavigateHome]);

    const onChange = (e) => {
        const { value, name } = e.target;
        setResetPasswordForm(prev => ({ ...prev, [name]: value }));
        if (name === 'password')
            setValidationResetForm(prev => ({ ...prev, password: validatePasswordLength(value) }));
        else
            setValidationResetForm(prev => ({ ...prev, confirmation: true }));
    };

    const onClick = (e) => {
        e.preventDefault();
        const check = stringComparisonMatching(resetPasswordForm.password, resetPasswordForm.confirmation);
        if (check) {
            setValidationResetForm(prev => ({ ...prev, confirmation: true }));
            resetPassword();
        } else {
            setValidationResetForm(prev => ({ ...prev, confirmation: false }));
        }
    };

    return (
        <div className="bg-white flex w-full min-h-screen overflow-hidden">
            <div className="flex flex-col min-h-screen flex-grow">
                <div className="fixed inset-0 z-0 overflow-hidden bg-white pt-16">
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

                <div className="flex flex-col flex-grow z-10 pt-12">
                    <div className="flex justify-center pb-4">
                        <img src={logo} alt="logo" className="w-40 h-40 bg-white rounded-full shadow-[0_7px_14px_0_rgba(60,66,87,0.12),0_3px_6px_0_rgba(0,0,0,0.12)]" />
                    </div>

                    <div className="mx-auto w-full">
                        <div className="mx-auto w-full max-w-md bg-white rounded-md shadow-[0_7px_14px_0_rgba(60,66,87,0.12),0_3px_6px_0_rgba(0,0,0,0.12)]">
                            <div className="px-12 py-12">
                                <span className="block text-xl leading-7 text-[#1a1f36] pb-4">
                                    Récupération de votre Mot de Passe.
                                </span>
                                <form id="stripe-login">
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block text-sm font-semibold mb-2.5">Nouveau Mot de Passe</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={resetPasswordForm.password}
                                            onChange={onChange}
                                            className="w-full text-base leading-7 px-4 py-2 min-h-11 border-0 rounded shadow-[0_0_0_1px_rgba(60,66,87,0.16)] outline-primary"
                                        />
                                        {!validationResetForm.password && (
                                            <span className="text-lg text-left text-red-500/70">
                                                Le Mot de Passe est trop Court<br /> (" <i>Le mot de passe ne répond pas à la longueur minimale</i>").
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <div className="grid grid-cols-1">
                                            <label htmlFor="confirmation" className="block text-sm font-semibold mb-2.5">Confirmer Votre Mot de Passe</label>
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmation"
                                            onChange={onChange}
                                            value={resetPasswordForm.confirmation}
                                            className="w-full text-base leading-7 px-4 py-2 min-h-11 border-0 rounded shadow-[0_0_0_1px_rgba(60,66,87,0.16)] outline-primary"
                                        />
                                        {!validationResetForm.confirmation && (
                                            <span className="text-lg text-left text-red-500/70">Le Mot de Passe est incorrect.</span>
                                        )}
                                    </div>

                                    <div className="overflow-hidden rounded-lg">
                                        <input
                                            type="submit"
                                            name="submit"
                                            value="Continue"
                                            className="w-full bg-primary shadow-[0_1px_1px_0_rgba(0,0,0,0.12),0_0_0_0px_rgb(70,147,199),0_2px_5px_0_rgba(60,66,87,0.08)] text-white font-semibold cursor-pointer py-3 px-4 rounded"
                                            onClick={onClick}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="flex justify-center items-center py-6">
                                <span className="mx-2.5">
                                    <a href="#" className="text-[#697386] font-semibold">© PharmaExpress</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}