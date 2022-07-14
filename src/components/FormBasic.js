import React, { useContext } from 'react';
import './FormBasic.css';
import Pic from '../assets/page-2.jpg';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { NotificationContext } from '../Notifications/NotificationProvider';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
// import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const FormBasic = () => {
    const dispatch = useContext(NotificationContext) 

    const makeDispatch = (val) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: v4(),
                type: "ERROR",
                message: val
            }
        })
    }

    const handleNewNotification = () => {
        if(!formDataValid.name) {
            makeDispatch("name")
        }
        if(!formDataValid.email) {
            makeDispatch("email")
        }
        if(!formDataValid.phoneNumber) {
            makeDispatch("phone number")
        }
        if(!formDataValid.dateOfBirth) {
            makeDispatch("date of birth")
        }
    }

    const [firstFormPart, setFirstFormPart] = useState(false);
    const [formData, setFormData] = useState(
        {
            name: "", 
            email: "", 
            phoneNumber: "", 
            dateOfBirth: "",
            // levelOfKnowledge: "",
            // character: "",
            // prevParticipation: ""
        }
    )
    
    const [formDataValid, setFormDataValid] = useState(
        {
            name: false, 
            email: false, 
            phoneNumber: false, 
            dateOfBirth: false,
            // levelOfKnowledge: false,
            // character: false,
            // prevParticipation: false
        }
    )

    const [basicDone, setBasicDone] = useState(false)

    const checkProgress = () => {
        var stepElement = document.getElementById("first-step");
        if(formDataValid.name || 
            formDataValid.email ||
            formDataValid.phoneNumber ||
            formDataValid.dateOfBirth)
        {
            stepElement.classList.add("progress");
        }else {
            stepElement.classList.remove("progress");
        }

        if(formDataValid.name &&
            formDataValid.email &&
            formDataValid.phoneNumber &&
            formDataValid.dateOfBirth)
        {
            setFirstFormPart(true);
        }else {
            setFirstFormPart(false)
        }
    }

    const check = (name, value) => {
        setFormDataValid(prevFormDataValid => {
            return {
                ...prevFormDataValid,
                [name]: value
            }
        })
    }

    const validate = (name, value) => {
        switch(name) {
            case "name":
                if(value.length >= 2) {
                    check(name, true)
                }else {
                    check(name, false);
                }
                break;
            case "email":
                let temp = value.toLowerCase();
                if(temp.length >= 14 && temp.substr(temp.length - 12) === "@redberry.ge") {
                    check(name, true)
                }else {
                    check(name, false);
                }
                break;
            case "phoneNumber":
                var pattern = /^[0-9]{9}$/;
                if(value.match(pattern)) {
                    check(name, true)
                }else {
                    check(name, false);
                }
                break;
            case "dateOfBirth":
                let subNum = parseInt(value.substr(0,4));
                
                if(value.length === 10 && 
                    subNum >= 1922 &&
                    subNum <= 2012) 
                {
                    check(name, true)
                }else {
                    check(name, false)
                }
                break;
            default:
                console.log("validate case default")
                break;
        }
    }

    const handleChange = (event) => {
        let {name, value} = event.target;
        validate(name, value);

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const validateField = () => {
        let nameElem = document.getElementById("name");
        if(formDataValid.name) nameElem.classList.remove("invalid")
        else nameElem.classList.add("invalid")

        let emailElem = document.getElementById("email");
        if(formDataValid.email) emailElem.classList.remove("invalid")
        else emailElem.classList.add("invalid")

        let phoneNumberElem = document.getElementById("phoneNumber");
        if(formDataValid.phoneNumber) phoneNumberElem.classList.remove("invalid")
        else phoneNumberElem.classList.add("invalid")

        let dateOfBirthElem = document.getElementById("dateOfBirth");
        if(formDataValid.dateOfBirth) dateOfBirthElem.classList.remove("invalid")
        else dateOfBirthElem.classList.add("invalid")
    }

    const storedFormData = JSON.parse(localStorage.getItem('formDataLS'))
    const storedFormDataValid = JSON.parse(localStorage.getItem('formDataValidLS'))
    
    const getItemsFromLS = (storedFormData, storedFormDataValid) => {
        if(storedFormData) {
            setFormData({...storedFormData})
        }
        if(storedFormDataValid) {
            setFormDataValid({...storedFormDataValid})
        }
    }
    

    const updateLS = () => {
        localStorage.setItem('formDataLS', JSON.stringify(formData))
        localStorage.setItem('formDataValidLS', JSON.stringify(formDataValid))
    }

    useEffect(() => {
        getItemsFromLS(storedFormData, storedFormDataValid)
    }, [])

    useEffect(() => {
        updateLS()
    }, [formData])

    useEffect(() => {

        checkProgress()
        setBasicDone(() => {
            if(formDataValid.name &&
                formDataValid.email && 
                formDataValid.phoneNumber &&
                formDataValid.dateOfBirth)
            {
                return true
            }else {
                return false
            }
        })
    },[formDataValid.name, 
        formDataValid.email,
        formDataValid.phoneNumber,
        formDataValid.dateOfBirth])
    
    return (
        <div className="form-basic">
            <div className="main-img-container section-left">
                <img className="main--img" src={Pic} alt="chess" /> 
                <h2 className="testimonial quote ">“When you see a good move,<br />look for a better one.”</h2>
                <h2 className="testimonial author">-Emanuel Lasker</h2>
            </div>

            <div className="info--container section-right">
                <div className="right-header">
                    <h4 className="title">Start creating your account</h4>
                </div>
                <div className="step-info">
                    <div className="step first">
                        <h3 className="step-info--start step--container" id="first-step">
                            {firstFormPart ? <FontAwesomeIcon style={{color: "#3BAF77"}} icon={faCheck} /> : 1}
                        </h3>
                    </div>
                    <div className="line" />
                    <div className="step second">
                        <h3 className="step-info--finish step--container" id="second-step">2</h3>
                    </div>
                </div>
                <div className="form-title">
                    <div>Personal information</div>
                    <div className="subtitle">This is basic informaton fields</div>
                </div>
                <div className="input-container">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        onChange={handleChange}
                        name="name"
                        value={formData.name}
                        id="name"
                        required  
                        onFocus={(e) => {e.currentTarget.classList.remove("invalid")}}
                    />
                    {formData.name.length === 0 && <span className="asterisk asterisk-name">*</span>}
                    {formDataValid.name && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}

                    <input 
                        type="email" 
                        placeholder="Email address "
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        id="email"
                        required
                        onFocus={(e) => {e.currentTarget.classList.remove("invalid")}}
                    />
                    {formData.email.length === 0 && <span className="asterisk asterisk-email">*</span>}
                    {formDataValid.email && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}

                    <input 
                        type="tel" 
                        placeholder="Phone number "
                        onChange={handleChange}
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        id="phoneNumber"
                        required
                        onFocus={(e) => {e.currentTarget.classList.remove("invalid")}}
                    />
                    {formData.phoneNumber.length === 0 && <span className="asterisk asterisk-phoneNumber">*</span>}
                    {formDataValid.phoneNumber && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}

                    <input
                        type="text"
                        onFocus={(e)=> {
                            e.currentTarget.type = "date";
                            e.currentTarget.focus();
                            e.currentTarget.classList.remove("invalid");
                            e.currentTarget.min="1922-01-01" 
                            e.currentTarget.max="2012-12-31"
                            }
                        }
                        placeholder="Date of birth "
                        onChange={handleChange}
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        id="dateOfBirth"
                        required
                    />
                    {formData.dateOfBirth.length === 0 && <span className="asterisk asterisk-dateOfBirth">*</span>}
                    {formDataValid.dateOfBirth && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}
                </div>
                <div className="btn-nav">
                    <Link to="/"><button className="btn--container secondary">Back</button></Link>
                    {basicDone ? 
                    <Link className="next-link" to="/info-exp" >
                    <button 
                        onClick={() => {
                            handleNewNotification()
                            validateField()
                        }} 
                        className="btn--container main btn-main">
                        Next
                        <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                    </button>
                    </Link> : 
                    <button 
                        onClick={() => {
                            handleNewNotification()
                            validateField()
                        }} 
                        className="btn--container main btn-main">
                        Next
                        <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default FormBasic;