import React,{useEffect, useState} from 'react'
import "../AuthViews/AuthStyles/PasswordForgoten.css"
import {validateEmail} from '../../Utils/Functions.jsx'
import { useAuthContext } from '../../Context/AuthProvider.jsx'
import { useStateContext } from '../../Context/ContextProvider.jsx'
import { useNavigate } from 'react-router-dom'

export default function PasswordForgoten() {

    const [isEmailvalid, setIsEmailValid] = useState(true)
  const {  sendEmailForChangingPassword, } = useAuthContext()
  
  const {resetPasswordEmail, setResetPasswordEmail,triggerNavigate, setTriggerNavigate } = useStateContext()
  const navigate = useNavigate()
  
    
    const onChange = (e) => {
    
        const { value } = e.target 
        setResetPasswordEmail(value)
       
        setIsEmailValid(prev=>validateEmail(value))
     
    
    
  }
  
  useEffect(() => {
    
    if (triggerNavigate) {
      console.log('im in the trigger ');
      
      navigate('/resetPassword');
      setTriggerNavigate(false);
    }
     
      

  },[triggerNavigate])
    

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
    <div className="formbg-container">
        <div className="formbg-inner padding-horizontal--48">
            <span className="form-text padding-bottom--15">
                Vous ne vous souvenez plus de votre mot de passe ?
            </span>
            <span className='form-description-span padding-bottom--15'>
                Saisissez votre adresse email pour recevoir un message de réinitialisation de votre mot de passe.
            </span>
            <form id="stripe-login">
                <div className="field padding-bottom--24">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" onChange={onChange} value={resetPasswordEmail} className="form-field-input" />
                    {!isEmailvalid && <span className='incorrect-style-left'>Email non valide.</span>}
                </div>

                <div className="field">
                    <input type="submit" name="submit" value="Continue" className="password-reset-submit-button" onClick={(e) => {
                        e.preventDefault();
                        sendEmailForChangingPassword();
                    }} />
                </div>
            </form>
        </div>
    </div>

    <div className="footer-link padding-top--24">
       
        <div className="footer-links-listing padding-top--24 padding-bottom--24 flex-flex center-center">
            <span>
                <a href="#">© PharmaExpress</a>
            </span>
            <span>
                <a href="#">Contact</a>
            </span>
            <span>
                <a href="#">Privacy & terms</a>
            </span>
        </div>
    </div>
</div>


</div>
          </div>
          </div>
  );
}
