import React, { useEffect, useState } from "react";

import './RaidBossCalculator.scss'
import { useDistance } from "./useDistance";
import Timer from "../Timer/Timer";
const RaidBossCalculator = ({
	boss
}) => {

	const [isRespIsComing, setIsRespIsComing] = useState('before')
	const [minTime, maxTime] = useDistance(boss.published)
	useEffect(() => {
		const now = new Date()
		setIsRespIsComing(now > minTime)
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
		<div className={`calculator__container ${isRespIsComing ? 'active' : 'inactive'} ${boss.name}`} >
		
			<div className={`boss__info `}>
			<h2 className="boss__name">{boss.name}</h2>
				<span>Убит: {intl.format(new Date(boss.published))}</span>
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