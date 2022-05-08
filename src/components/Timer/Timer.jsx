
import React, { useState } from "react";


import './Timer.scss'
import { useCountdown } from "./useCountdown";

const Timer = ({
    title,
    targetDate
}) => {

    const [timer, setTimer] = useState('');

    const [days, hours, minutes, seconds] = useCountdown(targetDate)


    if (hours + minutes + seconds <= 0)
        return (
            <div className="expired">
                Точно реснулся
            </div>
        )
    return (
        <div className="container">
            <span>{title}</span>
            <div className="beauty-timer">
                <div className="value">
                    <div className="number">{days}</div>
                    <div className="title">дней</div>
                </div>
                <span>:</span>
                <div className="value">
                    <div className="number">{hours}</div>
                    <div className="title">часов</div>
                </div>
                <span>:</span>
                <div className="value">
                    <div className="number">{minutes}</div>
                    <div className="title">минут</div>
                </div>
                <span>:</span>
                <div className="value">
                    <div className="number">{seconds}</div>
                    <div className="title">секунд</div>
                </div>
            </div>
        </div>
    )
}

export default Timer