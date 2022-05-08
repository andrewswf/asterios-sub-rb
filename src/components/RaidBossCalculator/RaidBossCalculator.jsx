import React, { useEffect, useState } from "react";
import addHours from "date-fns/addHours";

import './RaidBossCalculator.scss'
import { useDistance } from "./useDistance";
import Timer from "../Timer/Timer";
const RaidBossCalculator = ({
    bossName,
    killedAt
}) => {

    const [isRespIsComing, setIsRespIsComing] = useState('before')
    const [minTime, maxTime] = useDistance(killedAt)
    useEffect(() => {
        const now = new Date()
        setIsRespIsComing(now > minTime )
    }, [minTime, maxTime])
    const intl = new Intl.DateTimeFormat('RU-ru', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    })
    return (
        <div className={`calculator__container ${isRespIsComing ? 'active' : ''} `}>
            <h2 className="boss__name">{bossName}</h2>
            <div className={`boss__info `}>
                <span>Убит: {intl.format(new Date(killedAt))}</span>
                <span>Начало респа: {intl.format(minTime)}</span>
                <span>Конец респа: {intl.format(maxTime)}</span>

                {
                    isRespIsComing ?
                        (<Timer title="Респ идет. До конца: " targetDate={maxTime} />) :
                        (<Timer title="Респ не начался. До начала: " targetDate={minTime} />)
                }
            </div>

        </div>
    )
}

export default RaidBossCalculator