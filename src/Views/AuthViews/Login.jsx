import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthProvider.jsx';
import { validateEmail, validatePasswordLength } from '../../Utils/Functions.jsx';
import { Link } from 'react-router-dom';
import logo from "../../Assets/SVG/logo_white_bg.svg";
import "./styles/auth.css";

const Login = () => {
  const [isvalideField, setIsValidField] = useState({
    email: true,
    password: true
  });

  const { loginForm, setLoginForm, handleLoginPost, incorrectAuth } = useAuthContext();

  const onChange = (e) => {
    const { value, name } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email")
      setIsValidField(prev => ({ ...prev, email: validateEmail(value) }));
    else
      setIsValidField(prev => ({ ...prev, password: validatePasswordLength(value) }));
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

        <div className="flex flex-col flex-grow z-10 pt-4">
          <div className="flex justify-center pb-4">
            <img src={logo} alt="logo" className="w-40 h-40 bg-white rounded-full shadow-[0_7px_14px_0_rgba(60,66,87,0.12),0_3px_6px_0_rgba(0,0,0,0.12)]" />
          </div>

          <div className="mx-auto w-full">
            <div className="mx-auto w-full max-w-md bg-white rounded-md shadow-[0_7px_14px_0_rgba(60,66,87,0.12),0_3px_6px_0_rgba(0,0,0,0.12)]">
              <div className="px-12 py-12">
                <span className="block text-xl leading-7 text-[#1a1f36] pb-4">
                  Connectez-vous à votre compte.
                </span>
                <form id="stripe-login">
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-semibold mb-2.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={onChange}
                      value={loginForm.email}
                      className="w-full text-base leading-7 px-4 py-2 min-h-11 border-0 rounded shadow-[0_0_0_1px_rgba(60,66,87,0.16)] outline-primary"
                    />
                    {!isvalideField.email && (
                      <span className="text-lg text-left text-red-500/70">Email non valide.</span>
                    )}
                  </div>
                  <div className="mb-6">
                    <div className="grid grid-cols-2 items-center">
                      <label htmlFor="password" className="text-sm font-semibold">Mot de passe</label>
                      <div className="text-right">
                        <Link to={"/passwordForgotten"} className="text-sm font-semibold">Mot de passe oublié ?</Link>
                      </div>
                    </div>
                    <input
                      type="password"
                      name="password"
                      onChange={onChange}
                      value={loginForm.password}
                      className="w-full text-base leading-7 px-4 py-2 min-h-11 border-0 rounded shadow-[0_0_0_1px_rgba(60,66,87,0.16)] outline-primary"
                    />
                    {!isvalideField.password && (
                      <span className="text-lg text-left text-red-500/70">Mot de Passe trop Court</span>
                    )}
                  </div>
                  <div className="mb-6 flex items-center">
                    <label htmlFor="checkbox" className="flex items-center">
                      <input type="checkbox" name="checkbox" className="w-5 h-4 mr-1.5" />
                      <span className="text-sm font-semibold">Restez connecté pendant une semaine</span>
                    </label>
                  </div>
                  <div className="mb-6">
                    <input
                      type="submit"
                      name="submit"
                      value="Continue"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLoginPost();
                      }}
                      className="w-full bg-primary shadow-[0_1px_1px_0_rgba(0,0,0,0.12),0_0_0_0px_rgb(70,147,199),0_2px_5px_0_rgba(60,66,87,0.08)] text-white font-semibold cursor-pointer py-2 px-4 rounded"
                    />
                  </div>
                </form>
                {incorrectAuth && (
                  <span className="text-lg text-center text-red-500/70">Email ou Mot de Passe incorrect</span>
                )}
                <Link to={'/signup'} className="py-3 text-primary text-sm absolute left-1/2 -translate-x-1/2 underline">Crée un Compte</Link>
              </div>
            </div>

            <div className="pt-6">
              <div className="flex justify-center items-center py-6">
                <span className="mx-2.5">
                  <a href="#" className="text-[#697386] font-semibold">© PharmaExpress</a>
                </span>
                <span className="mx-2.5">
                  <a href="#" className="text-[#697386] font-semibold">Contact</a>
                </span>
                <span className="mx-2.5">
                  <a href="#" className="text-[#697386] font-semibold">Privacy & terms</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;