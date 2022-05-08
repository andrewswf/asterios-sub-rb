import { addHours } from 'date-fns'
import { useEffect, useState, useMemo } from 'react'


const useDistance = (targetDate) => {
    const defaultTime = useMemo(()=>new Date(targetDate), [targetDate])
    const minDelay = 18;
    const maxDelay = 30;
    const [minTime, setMinTime] = useState(addHours(defaultTime, minDelay))
    const [maxTime, setMaxTime] = useState(addHours(defaultTime, maxDelay))
    useEffect(() => {
        setMinTime(addHours(defaultTime, minDelay))
        setMaxTime(addHours(defaultTime, maxDelay))
    }, [defaultTime])

    return [minTime, maxTime]
}

export { useDistance }