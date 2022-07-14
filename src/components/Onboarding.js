import React, { useEffect } from "react";
import "./Onboarding.css"
import Pic from "../assets/page-4.jpg";
import Rocket from "../assets/success-rocket.png";
import axios from "axios";

const Onboarding = () => {
    const storedFormDataExp = JSON.parse(localStorage.getItem('formDataExpLS'))
    const storedFormData = JSON.parse(localStorage.getItem('formDataLS'))

    useEffect(() => {
        (async () => {
            try {
                await axios.post("https://chess-tournament-api.devtest.ge/api/register", {
                    name: storedFormData.name ,
                    email: storedFormData.email ,
                    phone: storedFormData.phoneNumber ,
                    date_of_birth: storedFormData.dateOfBirth ,
                    experience_level: storedFormDataExp.levelOfKnowledge ,
                    already_participated: storedFormDataExp.prevParticipation ,
                    character_id: storedFormDataExp.character
                });
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <div className="onboarding">
            <div className="main-img-container section-left">
                <img src={Pic} alt="chess" /> 
            </div>

            <div className="section-right">
                <div className="img-text-container">
                    <img src={Rocket} alt="rocket" />
                    <div className="text">
                        Onboarding completed!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Onboarding;