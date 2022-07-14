import React, { useEffect, useState, useContext } from 'react';
import './FormExp.css'
import Pic from '../assets/page-3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { NotificationContext } from '../Notifications/NotificationProvider';


const FormExp = () => {
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
        if(!formDataValid.levelOfKnowledgeValid) {
            makeDispatch("level of knowledge")
        }
        if(!formDataValid.characterValid) {
            makeDispatch("character")
        }
    }

    const dataKnowledge = [
        {   
            id: 1, 
            label: "Beginner"
        }, 
        {
            id: 2, 
            label: "Intermediate"
        },
        {
            id: 3, 
            label: "Professional"
        }
    ];

    const [isOpenKnowlegde, setIsOpenKnowledge] = useState(false);
    const [isOpenCharacter, setIsOpenCharacter] = useState(false)
    const [itemsKnowledge, setItemKnowledge] = useState(dataKnowledge);
    // const [itemsCharacter, setItemCharacter] = useState(dataCharacter);
    const [selectedItemKnowledge, setSelectedItemKnowledge] = useState(null);
    const [selectedItemCharacter, setSelectedItemCharacter] = useState(null);
    
    const toggleDropdownKnowledge = () => {
        setIsOpenKnowledge(!isOpenKnowlegde);
    }
    const toggleDropdownCharacter = () => {
        setIsOpenCharacter(!isOpenCharacter);
    }
    
    const handleItemClickKnowledge = (label) => {
        selectedItemKnowledge === label ? setSelectedItemKnowledge(null) : setSelectedItemKnowledge(label);
        setIsOpenKnowledge(!isOpenKnowlegde)
        setFormData(prevState => {
            return {
                ...prevState,
                levelOfKnowledge: label === "Intermediate" ? "normal" : label.toLowerCase()
            }
        })
        setFormDataValid(prevState => {
            return {
                ...prevState,
                levelOfKnowledgeValid: true
            }
        })
    }
    const handleItemClickCharacter = (id) => {
        selectedItemCharacter == id ? setSelectedItemCharacter(null) : setSelectedItemCharacter(id);
        setIsOpenCharacter(!isOpenCharacter)
        setFormData(prevState => {
            return {
                ...prevState,
                character: id
            }
        })
        setFormDataValid(prevState => {
            return {
                ...prevState,
                characterValid: true
            }
        })
    }

    const checkProgress = () => {
        var stepElement = document.getElementById("second-step");
        if(isOpenKnowlegde || 
            isOpenCharacter ||
            formDataValid.levelOfKnowledgeValid ||
            formDataValid.characterValid)
        {
            stepElement.classList.add("progress");
        }else {
            stepElement.classList.remove("progress");
        }
    }

    const [apiData, setApiData] = useState()
        
    const [formData, setFormData] = useState(
        {
            levelOfKnowledge: "",
            character: null,
            prevParticipation: true
        }
    )

    const [formDataValid, setFormDataValid] = useState(
        {
            levelOfKnowledgeValid: false,
            characterValid: false,
            prevParticipation: true
        }
    )

    const [expDone, setExpDone] = useState(false)

    const validateField = () => {
        if(formDataValid.levelOfKnowledgeValid && formDataValid.characterValid){
            setExpDone(true)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        const boolValue = value === "yes" ? true : false
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: boolValue
            }
        })
    }

    const storedFormData = JSON.parse(localStorage.getItem('formDataExpLS'))
    const storedFormDataValid = JSON.parse(localStorage.getItem('formDataValidExpLS'))
    
    const getItemsFromLS = (storedFormData, storedFormDataValid) => {
        if(storedFormData) {
            setFormData({...storedFormData})
        }
        if(storedFormDataValid) {
            setFormDataValid(prevState => {
                return {
                    ...prevState,
                    levelOfKnowledgeValid: storedFormDataValid.levelOfKnowledgeValid,
                    characterValid: storedFormDataValid.characterValid
                }
            })
        }
    }

    const updateLS = () => {
        localStorage.setItem('formDataExpLS', JSON.stringify(formData))
        localStorage.setItem('formDataValidExpLS', JSON.stringify(formDataValid))
    }

    useEffect(() => {
        getItemsFromLS(storedFormData, storedFormDataValid)   
    }, [])

    useEffect(() => {
        validateField()
    }, [formDataValid])

    useEffect(() => {
        updateLS()
    }, [formData])

    useEffect(() => {
        checkProgress()
    }, [isOpenCharacter, isOpenKnowlegde, formDataValid.levelOfKnowledgeValid,
        formDataValid.characterValid])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://chess-tournament-api.devtest.ge/api/grandmasters");
                setApiData(response.data)
                setSelectedItemKnowledge(storedFormData.levelOfKnowledge === "normal"
                                ? "Intermediate" 
                                : storedFormData.levelOfKnowledge.charAt(0).toUpperCase()+storedFormData.levelOfKnowledge.substr(1))
                setSelectedItemCharacter(storedFormData.character)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <div className="form-exp">
            <div className="main-img-container section-left">
                <img className="main--img" src={Pic} alt="chess" /> 
                <h2 className="testimonial quote ">“Many have become chess masters <br />no one has become the master of chess.”</h2>
                <h2 className="testimonial author">- Siegbert Tarrasch</h2>
            </div>

            <div className="info--container section-right">
                <h4 className="title">{formDataValid.levelOfKnowledgeValid && formDataValid.characterValid 
                                        ? "Almost done! " 
                                        : "First step is done, continue to finish onboarding"}</h4>
                <div className="step-info">
                    <div className="step first">
                        <h3 className="step-info--start step--container progress" id="first-step">
                            <FontAwesomeIcon style={{color: "#3BAF77"}} icon={faCheck} />
                        </h3>
                    </div>
                    <div className="line" />
                    <div className="step second">
                        <h3 className="step-info--finish step--container" id="second-step">2</h3>
                    </div>
                </div>
                <div className="form-title">
                    <div>Chess experience</div>
                    <div className="subtitle">This is basic information fields</div>
                </div>
                <div className="input-container flex">

                    


                    <div className="dropdown knowledge">
                        <div id="levelOfKnowledge" className="dropdown-header" onClick={toggleDropdownKnowledge}>
                            {selectedItemKnowledge ? selectedItemKnowledge : "level of knowledge"}
                            {selectedItemKnowledge === null && <span className="asterisk asterisk-knowledge">*</span>}
                            <FontAwesomeIcon icon={faChevronRight} className={`icon ${isOpenKnowlegde && "open"}`}></FontAwesomeIcon>
                        </div>
                        <div className={`dropdown-body ${isOpenKnowlegde && 'open'}`}>
                            {itemsKnowledge.map(item => (
                            <div className="dropdown-item" onClick={e => handleItemClickKnowledge(item.label)}  key={v4()}>
                                <div className="dropdown-item-text">
                                    {item.label}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="dropdown character">
                        <div id="character" className="dropdown-header" onClick={toggleDropdownCharacter}>
                            {selectedItemCharacter ? apiData.find(item => item.id == selectedItemCharacter).name : "Choose your character"}
                            {selectedItemCharacter === null && <span className="asterisk asterisk-character">*</span>}
                            <FontAwesomeIcon icon={faChevronRight} className={`icon ${isOpenCharacter && "open"}`}></FontAwesomeIcon>
                        </div>
                        <div className={`dropdown-body ${isOpenCharacter && "open"}`}>
                            <div className="total">(Total {apiData && apiData.length})</div>
                            {apiData && apiData.map(item => (
                            <div className="dropdown-item" onClick={e => handleItemClickCharacter(item.id)} id={item.id} key={v4()}>
                                <div className="dropdown-item-text">
                                    {item.name}
                                </div>
                                <div className="dropdown-item-image">
                                    <img className="dropdown-image" alt="character" src={`https://chess-tournament-api.devtest.ge${item.image}`} />
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="radio">
                        
                    <legend>Have you participated in the Redberry Championship? <span className="asterisk asterisk-participation">*</span></legend>
                    <div className="answers">
                        <div className="yes">
                            <input 
                                type="radio"
                                id="yes"
                                name="prevParticipation"
                                value="yes"
                                checked={formData.prevParticipation}
                                onChange={handleChange}
                            />
                            <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="no">
                            <input 
                                type="radio"
                                id="no"
                                name="prevParticipation"
                                value="no"
                                checked={!formData.prevParticipation}
                                onChange={handleChange}
                            />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>

                <div className="btn-nav-contanier">
                    <div className="btn-nav">
                        <Link to="/info-basic"><button className="btn--container secondary">Back</button></Link>
                        {expDone ? 
                        <Link to="/completion"><button 
                            onClick={() => {
                                handleNewNotification()
                            }} 
                            className="btn--container main btn-main">
                            Next
                            <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                        </button></Link> :
                        <button 
                            onClick={() => {
                                handleNewNotification()
                            }} 
                            className="btn--container main btn-main">
                            Next
                            <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormExp;