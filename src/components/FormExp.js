import React, { useState } from 'react';
import './FormExp.css'
import Pic from '../assets/page-3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FormExp = () => {
    const [formDataExp, setFormDataExp] = useState(
        {
            levelOfKnowledge: "",
            character: "",
            prevParticipation: ""
        }
    )

    const [formDataValidExp, setFormDataValidExp] = useState(
        {
            levelOfKnowledge: false,
            character: false,
            prevParticipation: false
        }
    )

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

    const dataCharacter = [
        {   
            id: 1, 
            label: "Magnus Carlsen"
        }, 
        {
            id: 2,
            label: "Wilhelm Steinitz"
        },
        {
            id: 3, 
            label: "Bobby Fischer"
        },
        {
            id: 4, 
            label: "Nona Gafrindashvili"
        }
    ];

    const [isOpenKnowlegde, setIsOpenKnowledge] = useState(false);
    const [isOpenCharacter, setIsOpenCharacter] = useState(false)
    const [itemsKnowledge, setItemKnowledge] = useState(dataKnowledge);
    const [itemsCharacter, setItemCharacter] = useState(dataCharacter);
    const [selectedItemKnowledge, setSelectedItemKnowledge] = useState(null);
    const [selectedItemCharacter, setSelectedItemCharacter] = useState(null);
    
    // console.log(itemsKnowledge[selectedItemKnowledge-1])

    const toggleDropdownKnowledge = () => {
        setIsOpenKnowledge(!isOpenKnowlegde);
    }
    const toggleDropdownCharacter = () => {
        setIsOpenCharacter(!isOpenCharacter);
    }
    
    const handleItemClickKnowledge = (id) => {
        selectedItemKnowledge == id ? setSelectedItemKnowledge(null) : setSelectedItemKnowledge(id);
        setIsOpenKnowledge(!isOpenKnowlegde)
    }
    const handleItemClickCharacter = (id) => {
        selectedItemCharacter == id ? setSelectedItemCharacter(null) : setSelectedItemCharacter(id);
        setIsOpenCharacter(!isOpenCharacter)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormDataExp(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

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
                    <div className="subtitle">This is chess informaton fields</div>
                </div>
                <div className="input-container flex">
                    <div className="dropdown knowledge">
                        <div className="dropdown-header" onClick={toggleDropdownKnowledge}>
                            {selectedItemKnowledge ? itemsKnowledge.find(item => item.id == selectedItemKnowledge).label : "level of knowledge"}
                            <FontAwesomeIcon icon={faChevronRight} className={`icon ${isOpenKnowlegde && "open"}`}></FontAwesomeIcon>
                        </div>
                        <div className={`dropdown-body ${isOpenKnowlegde && 'open'}`}>
                            {itemsKnowledge.map(item => (
                            <div className="dropdown-item" onClick={e => handleItemClickKnowledge(item.id)} id={item.id} key={v4()}>
                                <div className="dropdown-item-text">
                                    {item.label}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="dropdown character">
                        <div className="dropdown-header" onClick={toggleDropdownCharacter}>
                            {selectedItemCharacter ? itemsCharacter.find(item => item.id == selectedItemCharacter).label : "Choose your character"}
                            <FontAwesomeIcon icon={faChevronRight} className={`icon ${isOpenCharacter && "open"}`}></FontAwesomeIcon>
                        </div>
                        <div className={`dropdown-body ${isOpenCharacter && "open"}`}>
                            <div className="total">(Total {itemsCharacter.length})</div>
                            {itemsCharacter.map(item => (
                            <div className="dropdown-item" onClick={e => handleItemClickCharacter(item.id)} id={item.id} key={v4()}>
                                <div className="dropdown-item-text">
                                    {item.label}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="prev-part">
                        <legend>Current employment status</legend>
                        <input 
                            type="radio"
                            id="unemployed"
                            name="employment"
                            value="unemployed"
                            checked={formDataExp.employment === "unemployed"}
                            onChange={handleChange}
                        />
                        <label htmlFor="unemployed">Unemployed</label>
                        <br />
                        
                        <input 
                            type="radio"
                            id="part-time"
                            name="employment"
                            value="part-time"
                            checked={formDataExp.employment === "part-time"}
                            onChange={handleChange}
                        />
                        <label htmlFor="part-time">Part-time</label>
                        <br />
                        
                        <input 
                            type="radio"
                            id="full-time"
                            name="employment"
                            value="full-time"
                            checked={formDataExp.employment === "full-time"}
                            onChange={handleChange}
                        />
                        <label htmlFor="full-time">Full-time</label>
                    </div> */}
                    {/* <div className="dropdown character">
                        <div className="dropdown-header" onClick={toggleDropdown("character")}>
                            {selectedItem ? itemsCharacter.find(item => item.id == selectedItem).label : "Choose your character"}
                            <FontAwesomeIcon icon={faChevronRight} className={`icon ${isOpenCharacter && "open"}`}></FontAwesomeIcon>
                        </div>
                        <div className={`dropdown-body ${isOpenCharacter && 'open'}`}>
                            {itemsCharacter.map(item => (
                            <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.id} key={v4()}>
                                <div className="dropdown-item-text">
                                    {item.label}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div> */}

                    {/* <input 
                        type="text" 
                        placeholder="Name " 
                        onChange={handleChange}
                        name="name"
                        value={formData.name}
                        id="name"
                        required  
                        onFocus={(e) => {removeInvalidClass(e)}}  
                    />
                    {formDataValid.name && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}

                    <input 
                        type="email" 
                        placeholder="Email address "
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        id="email"
                    />
                    {formDataValid.email && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}

                    <input 
                        type="tel" 
                        placeholder="Phone number " 
                        onChange={handleChange}
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        id="phoneNumber"
                    />
                    {formDataValid.phoneNumber && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />}

                    <input
                        type="text"
                        onFocus={(e)=> {
                            e.currentTarget.type = "date";
                            e.currentTarget.focus();
                            }
                        }
                        placeholder="Date of birth "
                        onChange={handleChange}
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        id="dateOfBirth"
                    />
                    {formDataValid.dateOfBirth && <FontAwesomeIcon className='input-check' icon={faCircleCheck} />} */}
                </div>
                <div className="btn-nav-contanier">
                    <div className="btn-nav">
                        <Link to="/info-basic"><button className="btn--container secondary">Back</button></Link>
                        <button 
                            // onClick={() => {
                            //     handleNewNotification()
                            //     validateField()
                            // }} 
                            className="btn--container main btn-main">
                            Next
                            <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormExp;