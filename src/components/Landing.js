import React from 'react';
import './Landing.css';
import Pic from '../assets/page-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing">
            <div className="main-img-container section-left">
                <img className="main--img" src={Pic} alt="chess" /> 
            </div>
            <div className="section-right-container">
                <div className="landing--container section-right">
                    <h2>chess says <span className="small">a lot about</span><br /> who we are</h2>
                    <Link to="info-basic">
                    <button className='btn-main'>
                        <div className="btn--container ">
                            Get Started 
                            <FontAwesomeIcon className='icon' icon={faCircleArrowRight} />
                        </div>
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;