import React, { useState } from 'react'
import { useAuthContext } from '../../Context/AuthProvider.jsx'
import { validateEmail, validatePhoneNumber,validatePasswordLength,stringComparisonMatching,areAllTrue } from '../../Utils/Functions.jsx'
import { useNavigate } from 'react-router-dom'
function SignUp() {
    const [stepFormSing, setStepFormSign] = useState({ 1: true, 2: false, 3: false })
    const [couter, setConter] = useState(1)
    const navigate = useNavigate()
    const [validationForm, setValidationForm] = useState({

        storeName: true,
        nameOwner: true,
        password: true,



        phoneNumber: true,
        phonePharmacy: true,
        description: true,
        email: true,
        latitude: true,
        longitude: true,
        adresse: true,
        confirmation: true
    })

    const nextPage = (e) => {

        e.preventDefault()
        if (couter < 3) {
            setConter(prev => {

                setStepFormSign((data) => ({ ...data, [prev + 1]: true }))
                return prev + 1
            })
        }



    }
    const previousPage = (e) => {
        e.preventDefault()
        if (couter > 1) {
            setConter(prev => {

                setStepFormSign((data) => ({ ...data, [prev]: false }))
                return prev - 1
            })
        }
        else navigate("/")



    }


    const { signForm, setSignForm,signRequest } = useAuthContext()

    const Onchange = (e) => {

        const { value, name } = e.target

        setSignForm(prev => ({ ...prev, [name]: value }))

        if (name == "phoneNumber") {
            setValidationForm(prev => ({ ...prev, "phoneNumber": validatePhoneNumber(value) }))
        }
        if (name == "email") {
            setValidationForm(prev => ({ ...prev, "email": validateEmail(value) }))
        }
        if (name == "phonePharmacy") {
            setValidationForm(prev => ({ ...prev, "phonePharmacy": validatePhoneNumber(value) }))
        }
        if (name == 'password')
            setValidationForm(prev => ({ ...prev, password: validatePasswordLength(value) }))
        if (name == 'confirmation') {
          setValidationForm(prev=>({...prev,confirmation:stringComparisonMatching(signForm.password,value)}))
      }
    }

    return (
        <div className="login-root">
            <div
                className="box-root flex-flex flex-direction--column"
                style={{ height: "100vh", flexGrow: 1 }}
            >
                <div className="loginbackground box-background--white ">
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
                    className="box-root  flex-flex flex-direction--column"
                    style={{ flexGrow: 1, zIndex: 9 }}
                >
                    <div className="box-root  padding-bottom--24 flex-flex flex-justifyContent--center">

                    </div>

                    <main className='firstContainer  w-[100vw] h-[100vh]  flex justify-center items-center overflow-hidden '>

                        <div className='bg-white w-[80%] min-h-[80%] drop-shadow-xl rounded-md flex flex-col py-10 justify-between items-center'>

                            <div className='progressBar  flex w-[70%] items-center justify-between '>
                                <div className={`step1 w-10 h-10 bg-primary text-white text-center rounded-sm flex items-center justify-center transition duration-500`} ><span>1</span></div>
                                <span className={`h-[1px] w-[30%]  ${stepFormSing[2] ? "bg-primary" : "bg-gray-400"} transition duration-500 `}></span>
                                <div className={`step1 w-10 h-10 ${stepFormSing[2] ? "bg-primary" : "bg-gray-400"} transition duration-500 text-white text-center rounded-sm flex items-center justify-center`}><span>2</span></div>
                                <span className={`h-[1px] w-[30%]  ${stepFormSing[3] ? "bg-primary" : "bg-gray-400"} transition duration-500`}></span>
                                <div className={`step1 w-10 h-10  ${stepFormSing[3] ? "bg-primary" : "bg-gray-400"} transition duration-500 text-white text-center rounded-sm flex items-center justify-center`}><span>3</span></div>

                            </div>
                            <div className='main w-full flex flex-col items-center justify-center relative duration-500 '>
                                <div className='header m-auto  text-xl font-bold text-[#494949] flex flex-col justify-center items-center gap-5'>
                                    <h1>Bienvenue sur PharmaExpress !</h1>
                                    <h2 className='text-sm text-[#868686] font-medium '>Remplissez le formulaire et rejoignez-nous dans cette aventure entièrement innovante.</h2>
                                
                                </div>
                                

                                <form className={` ${couter != 1 ? "absolute right-[2000px] " : ""} grid grid-cols-2 gap-4 w-full   justify-items-center py-5 transition duration-1000`}>
                                    <div className="flex flex-col gap-2 "> <label className='font-semibold text-[#494949]'>Nom complet</label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' name='nameOwner' value={signForm.nameOwner} onChange={Onchange}  /></div>
                                    <div className="flex flex-col  gap-2 "> <label className='font-semibold text-[#494949]'>Adresse email</label>
                                        <input type='malito' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.email} name='email' />
                                        {!validationForm.email ? <span className='incorrect-style-left'>L'adresse Email est inccorecte</span> : null}
                                    </div>
                                    <div className="flex flex-col  gap-2 ">  <label className='font-semibold text-[#494949]'>Numéro de téléphone <span className='text-[#7e7e7e] text-sm'>(personnel)</span></label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.phoneNumber} name='phoneNumber' />
                                        {!validationForm.phoneNumber ? <span className='incorrect-style-left text-sm'>Le Numero de telephone est inccorect</span> : null}
                                    </div>
                                    <div className="flex flex-col  gap-2 ">  <label className='font-semibold text-[#494949]'>Adresse complète</label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange}  value={signForm.adresse} name='adresse' /></div>


                                </form>


                                <form className={` ${couter != 2 ? "absolute left-[2000px]" : ""} grid grid-cols-2 gap-4 w-full  justify-items-center py-5 transition duration-1000`} >
                                    <div className="flex flex-col gap-2 "> <label className='font-semibold text-[#494949]'>Nom de votre Boutique</label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.storeName} name='storeName' /></div>
                                    <div className="flex flex-col  gap-2 "> <label className='font-semibold text-[#494949]'>Adresse boutique</label>
                                        <input type='malito' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.adressStore} name='adressStore' /></div>
                                    <div className="flex flex-col  gap-2 ">  <label className='font-semibold text-[#494949]'>Numéro de téléphone <span className='text-[#7e7e7e] text-sm'>(pharmacie)</span></label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.phonePharmacy} name='phonePharmacy' />
                                        {!validationForm.phonePharmacy ? <span className='incorrect-style-left text-sm'>Le Numero de telephone est inccorect</span> : null}
                                    </div>
                                    <div className="flex flex-col  gap-2 ">  <label className='font-semibold text-[#494949]'>Latitude</label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.latitude} name='latitude' /></div>

                                    <div className="flex flex-col  gap-2 ">  <label className='font-semibold text-[#494949]'>Longitude</label>
                                        <input type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md 'onChange={Onchange} value={signForm.longitude} name='longitude' /></div>

                                    <div className="flex flex-col  gap-2  ">  <label className='font-semibold text-[#494949]'>Description</label>
                                        <textarea type='text' className='w-[250px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.description} name='description'  /></div>





                                </form>


                                <form className={` ${couter != 3 ? "absolute left-[2000px]" : ""} grid grid-cols-1 gap-4 w-full  justify-items-center py-5 transition  duration-1000`}>
                                    <div className="flex flex-col gap-2 "> <label className='font-semibold text-[#494949]'>Mot de Passe</label>
                                        <input type='password' className='w-[350px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' onChange={Onchange} value={signForm.password} name='password' />
                                        {!validationForm.password ? <span className='incorrect-style-left'>Le Mot de Passe est trop Court.</span> : null}</div>
                                    <div className="flex flex-col  gap-2 "> <label className='font-semibold text-[#494949]'>Confirmer Votre Mot de Passe</label>
                                        <input type='password' className='w-[350px] px-[8px] py-[8px] border border-[#bebebe] outline-[#4693c7]  rounded-md ' value={signForm.confirmation} name='confirmation' onChange={Onchange} />
                                        {!(validationForm.confirmation) ? <span className='incorrect-style-left w-[350px] '>Le Mot de Passe est incorrect. </span> : null}</div>
                                    <div className="flex flex-col  gap-2 ">  <label className='font-semibold text-[#494949]'>accepter les conditions d'utilisation de  <span className='text-[#7e7e7e] text-sm'>© PharmaExpress</span></label>
                                        <input type='checkbox' /></div>




                                </form>

                            </div>

                            <div className='bottom--buttons  w-[90%] flex gap-4 flex-row-reverse  ' >
                                <button className='py-[8px] px-5 text-white font-semibold rounded-md bg-primary'
                                    onClick={(e) => {
                                        if (couter === 3) {
                                            if (areAllTrue(validationForm)) signRequest()
                                            else alert("veuillez verifier les champs saisies ")
                                            
                                            
                                        }

                                            
                                            else  nextPage(e)
                                            
                                        
                                   
                                }}
                                
                              >{couter === 3 ? "S'inscrire" : "Suivant"}</button>
                                <button className='py-[8px] px-5 text-white font-semibold rounded-md bg-slate-400' onClick={previousPage}>precedent</button>
                            </div>
                        </div>




                    </main>


                </div>
            </div>
        </div>
    )
}

export default SignUp