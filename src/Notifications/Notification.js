import React, { useState } from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Notification = (props) => {
    const [exit, setExit] = useState(false)
    const [timeNum, setTimeNum] = useState(0)
    const [intervalID, setIntervalID] = useState(null);
    const handleStartTimer = () => {
        const id = setInterval(() => {
            setTimeNum(prev => {
                if(prev < 100) return prev + 0.5
                clearInterval(id)
                return prev
            })
        }, 20)
        setIntervalID(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalID)
    }

    const handleCloseNotification = () => {
        handlePauseTimer()
        setExit(true)
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    }

    React.useEffect(() => {
        if(timeNum === 100) handleCloseNotification()
    }, [timeNum])

    React.useEffect(() => {
        handleStartTimer()
    }, [])

    return (
        <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item ${exit ? "exit" : ""}`}>
            <div className="top-item">
                <div className="red">
                    <FontAwesomeIcon style={{width:"20px", height:"20px", color: "#DC3545"}} icon={faCircleExclamation} />
                    <p className="top-message" style={{color: "#DC3545"}}>{props.type === "ERROR" && "Invalid "}{props.message}</p>
                </div>
                <div onClick={() => setExit(true)} className="close-btn">
                    <FontAwesomeIcon style={{color: "#95939A"}} icon={faXmark} />
                </div>
            </div>
            <p className="bottom-message" >Please enter valid {props.message === "email" ? "email address" : props.message}</p>
        </div>
    )
}

export default Notification;