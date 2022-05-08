import React, { useEffect, useState } from "react";
import addHours from "date-fns/addHours";

import './RaidBossCalculator.scss'
const RaidBossCalculator = ({
    bossName,
    killedAt
})=>{

    const [respFrom, setRespFrom] = useState('')
    const [respTo, setRespTo] = useState('')
    const [isRespIsComing, setIsRespIsComing] = useState(false)
    useEffect(()=>{
        setRespFrom(addHours(new Date(killedAt), 18))
        setRespTo(addHours(new Date(killedAt), 30))
        const now = new Date()
        console.log('now ', now)
        console.log('From ', respFrom, now>respFrom)
        console.log('To ', respTo, now<respTo)
        console.log('respStatus:: ', now>=respFrom && now<=respTo)
        setIsRespIsComing(now>respFrom && now<respTo)
    }, [killedAt])
    const intl = new Intl.DateTimeFormat('RU-ru', {
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric',
        hour12: false
    })
   
    return (
        <div className={`calculator__container ${isRespIsComing?'active':''} `}>
            <h2 className="boss__name">{bossName}</h2>
            <div className={`boss__info `}>
                <span>Убит: {intl.format(new Date(killedAt))}</span>
                <span>Начало респа: {intl.format(respFrom)}</span> 
                <span>Конец респа: {intl.format(respTo)}</span>
               
            </div>
           
        </div>
    )
}

export default RaidBossCalculator