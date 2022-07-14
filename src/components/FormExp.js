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
// import { NotificationContext } from '../Notifications/NotificationProvider';


const FormExp = () => {
    // const dispatch = useContext(NotificationContext) 

    // const makeDispatch = (val) => {
    //     dispatch({
    //         type: "ADD_NOTIFICATION",
    //         payload: {
    //             id: v4(),
    //             type: "ERROR",
    //             message: val
    //         }
    //     })
    // }

    // const handleNewNotification = () => {
    //     if(!formDataValid.levelOfKnowledgeValid) {
    //         makeDispatch("level of knowledge")
    //         console.log("movedi")
    //     }
    //     if(!formDataValid.characterValid) {
    //         makeDispatch("character")
    //     }
    // }

    // useEffect(() => {
    //     handleNewNotification()
    // }, [formDataValid])


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
    
    const handleItemClickKnowledge = (id) => {
        selectedItemKnowledge == id ? setSelectedItemKnowledge(null) : setSelectedItemKnowledge(id);
        setIsOpenKnowledge(!isOpenKnowlegde)
        // console.log(itemsKnowledge.find(item => item.id == selectedItemKnowledge).label)
        // dataKnowledge.map(item => item.id === selectedItemKnowledge && console.log("movedi"))
    }
    const handleItemClickCharacter = (id) => {
        selectedItemCharacter == id ? setSelectedItemCharacter(null) : setSelectedItemCharacter(id);
        setIsOpenCharacter(!isOpenCharacter)
    }

    const checkProgress = () => {
        var stepElement = document.getElementById("second-step");
        var knowledgeElem = document.getElementById("levelOfKnowledge").innerText
        var characterElem = document.getElementById("character").innerText
        if(isOpenKnowlegde || 
            isOpenCharacter ||
            (!knowledgeElem.includes("*") && knowledgeElem !== "") ||
            (!characterElem.includes("*") && characterElem !== ""))
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

    console.log("data", formData)
    console.log("valid", formDataValid)

    const handleNextClick = () => {
        const knowledgeText = document.getElementById("levelOfKnowledge").innerText.toLowerCase()
        console.log(formData)
        if(!knowledgeText.includes("*")){
            setFormDataValid(prevFormDataValid => {
                return {
                    ...prevFormDataValid,
                    levelOfKnowledgeValid: true
                }
            })
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    levelOfKnowledge: knowledgeText === "intermediate" ? "normal" : knowledgeText
                }
            })
        }

        const characterText = document.getElementById("character").innerText
        if(!characterText.includes("*")){
            let characterID;
            apiData.map(item => { if(item.name === characterText) characterID = item.id })
            setFormDataValid(prevFormDataValid => {
                return {
                    ...prevFormDataValid,
                    characterValid: true
                }
            })
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    character: characterID
                }
            })
        }
    }

    const [expDone, setExpDone] = useState(false)

    const validateField = () => {

        if(formData.levelOfKnowledge !== "" && formData.character !== null){
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

    

    // const storedFormData = JSON.parse(localStorage.getItem('formDataExpLS'))
    // const storedFormDataValid = JSON.parse(localStorage.getItem('formDataValidExpLS'))
    
    // const getItemsFromLS = (storedFormData, storedFormDataValid) => {
    //     if(storedFormData) {
    //         setFormData({...storedFormData})
    //     }
    //     if(storedFormDataValid) {
    //         setFormDataValid({...storedFormDataValid})
    //     }
    // }

    // const updateLS = () => {
    //     localStorage.setItem('formDataExpLS', JSON.stringify(formData))
    //     localStorage.setItem('formDataValidExpLS', JSON.stringify(formDataValid))
    // }

    // useEffect(() => {
    //     getItemsFromLS(storedFormData, storedFormDataValid)
    // }, [])

    // useEffect(() => {
    //     updateLS()
    // }, [formData])





    useEffect(() => {
        checkProgress()
    }, [isOpenCharacter, isOpenKnowlegde])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://chess-tournament-api.devtest.ge/api/grandmasters");
                setApiData(response.data)
                
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
                <h4 className="title">First step is done, continue to finish onboarding</h4>
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
                            {selectedItemKnowledge ? itemsKnowledge.find(item => item.id == selectedItemKnowledge).label : "level of knowledge"}
                            {selectedItemKnowledge === null && <span className="asterisk asterisk-knowledge">*</span>}
                            <FontAwesomeIcon icon={faChevronRight} className={`icon ${isOpenKnowlegde && "open"}`}></FontAwesomeIcon>
                        </div>
                        <div className={`dropdown-body ${isOpenKnowlegde && 'open'}`}>
                            {itemsKnowledge.map(item => (
                            <div className="dropdown-item" onClick={e => handleItemClickKnowledge(item.id)}  key={v4()}>
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
                                    <img className="dropdown-image" src={`https://chess-tournament-api.devtest.ge${item.image}`} />
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
                                // handleNewNotification()
                                // validateField()

                                handleNextClick()
                                validateField()
                                // handleNewNotification()
                            }} 
                            className="btn--container main btn-main">
                            Next
                            <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                        </button></Link> :
                        <button 
                            onClick={() => {
                                handleNextClick()
                                validateField()
                                
                                // handleNewNotification()
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