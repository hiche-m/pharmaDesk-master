import React, { useEffect, useState } from 'react'
import './AuthStyles/ResetPassword.css'
import { useAuthContext } from '../../Context/AuthProvider.jsx';
import { validatePasswordLength, stringComparisonMatching } from '../../Utils/Functions.jsx';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    const { resetPasswordForm, setResetPasswordForm,resetPassword,triggerNavigateHome, setTriggerNavigateHome } = useAuthContext()
    const [validationResetForm, setValidationResetForm] = useState({
        password: true,
        confirmation: true,
    })
    
    const navigate= useNavigate()

    useEffect(() => {
        if (triggerNavigateHome) {
            navigate("/")
            setTriggerNavigateHome(false)
        }
    },[triggerNavigateHome])

    const onChange = (e) => {
        const { value, name } = e.target
        setResetPasswordForm(prev => ({ ...prev, [name]: value }))
        if (name == 'password')
            setValidationResetForm(prev => ({ ...prev, password: validatePasswordLength(value) }))
        else setValidationResetForm(prev=>({...prev,confirmation:true}))

    }

    const onClick = (e) => {

        e.preventDefault();
        const check = stringComparisonMatching(resetPasswordForm.password, resetPasswordForm.confirmation)
        if (check) {
            setValidationResetForm(prev => ({ ...prev, confirmation: true }))
            //add postevent 
            resetPassword()
        }
        else {
            setValidationResetForm(prev => ({ ...prev, confirmation: false }))

        }
    }




return (
    <div className="login-root">
        <div
            className="box-root flex-flex flex-direction--column"
            style={{ minHeight: "100vh", flexGrow: 1 }}
        >
            <div className="loginbackground box-background--white padding-top--64">
                <div className="loginbackground-gridContainer">
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "top / start / 8 / end" }}
                    >
                        <div
                            className="box-root"
                            style={{
                                backgroundImage:
                                    "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                                flexGrow: 1,
                            }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "4 / 2 / auto / 5" }}
                    >
                        <div
                            className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "6 / start / auto / 2" }}
                    >
                        <div
                            className="box-root box-background--blue800"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "7 / start / auto / 4" }}
                    >
                        <div
                            className="box-root box-background--blue animationLeftRight"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "8 / 4 / auto / 6" }}
                    >
                        <div
                            className="box-root box-background--gray100 animationLeftRight tans3s"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "2 / 15 / auto / end" }}
                    >
                        <div
                            className="box-root box-background--cyan200 animationRightLeft tans4s"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "3 / 14 / auto / end" }}
                    >
                        <div
                            className="box-root box-background--blue animationRightLeft"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "4 / 17 / auto / 20" }}
                    >
                        <div
                            className="box-root box-background--gray100 animationRightLeft tans4s"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                    <div
                        className="box-root flex-flex"
                        style={{ gridArea: "5 / 14 / auto / 17" }}
                    >
                        <div
                            className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                            style={{ flexGrow: 1 }}
                        ></div>
                    </div>
                </div>
            </div>

            <div
                className="box-root padding-top--24 flex-flex flex-direction--column"
                style={{ flexGrow: 1, zIndex: 9 }}
            >
                <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
    <h1>
        <a href="" rel="dofollow" className="header1">
            PharmaExpress
        </a>
    </h1>
</div>

<div className="formbg-outer">
    <div className="password-reset-container">
        <div className="formbg-inner padding-horizontal--48">
            <span className="password-reset-text padding-bottom--15">
                Récupération de votre Mot de Passe.
            </span>
            <form id="stripe-login">
                <div className="field padding-bottom--24">
                    <label htmlFor="password" className="password-reset-label">Nouveau Mot de Passe</label>
                    <input type="password" name="password" value={resetPasswordForm.password} onChange={onChange} className="password-reset-field-input" />
                    {!validationResetForm.password ? <span className='incorrect-style-left'>Le Mot de Passe est trop Court<br /> (" <i>Le mot de passe ne répond pas à la longueur minimale</i>").</span> : null}
                </div>
                <div className="field padding-bottom--24">
                    <div className="password-reset-grid">
                        <label htmlFor="confirmation" className="password-reset-label">Confirmer Votre Mot de Passe</label>
                    </div>
                    <input type="password" name="confirmation" onChange={onChange} value={resetPasswordForm.confirmation} className="password-reset-field-input" />
                    {!(validationResetForm.confirmation) ? <span className='incorrect-style-left'>Le Mot de Passe est incorrect. </span> : null}
                </div>

                <div className="fieldBOx ">
                    <input type="submit" name="submit" value="Continue" className="password-reset-submit-button" onClick={onClick} />
                </div>
            </form>
        </div>
    </div>

    <div className="footer-link padding-top--24">
        <div className="password-reset-footer-listing padding-top--24 padding-bottom--24 flex-flex center-center">
            <span>
                <a href="#">© PharmaExpress</a>
            </span>
        </div>
    </div>
</div>
            </div>
        </div>
    </div>
)
}
