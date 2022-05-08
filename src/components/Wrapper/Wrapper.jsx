import React, { useEffect, useState } from "react";
import RaidBossCalculator from "../RaidBossCalculator/RaidBossCalculator";
import { groupBy, maxBy } from "lodash";
import { read } from 'feed-reader'
import './Wrapper.scss'
const Wrapper = () => {

  const [rss, setRss] = useState('');
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [bossInfo, setBossInfo] = useState([]);
  const bossNames = ['Golkonda','Hallate','Kernon','Cabrio']
  
  useEffect(() => {
    const url = ' https://lit-badlands-25495.herokuapp.com/https://asterios.tm/index.php?cmd=rss&serv=3&filter=keyboss&out=xml'


    read(url).then(res => {
      setIsLoaded(true)
      filterFeed(res, bossNames)
    },
      error => {
        setIsLoaded(true)
        setError(error)
      })

  }, [])

  const filterFeed = (feed, bossIds) => {
    const { entries } = feed
    var rx = new RegExp(bossNames.join('|'))
    let bosses = []
    entries.forEach(entry => {
      const match = entry.title.match(rx)
      if(match){
        entry.name = match[0]
        bosses.push(entry)
      }
    })
    const bossLists = Object.values(groupBy(bosses, 'name'))
    const finalList = []

    for(let i = 0; i < bossLists.length; i++){
      finalList.push(maxBy(bossLists[i],(x)=>{return new Date(x.published).getTime()}))
    }

    setBossInfo(finalList)
  }
  


  if (!isLoaded)
    return (
      <h2>Loading</h2>
    )
  else if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <span> {error.message}</span>
      </div>
    )
  }
  else return (
    <div className="wrapper">
    { 
      bossInfo.map(boss =>
        (
          <RaidBossCalculator key={boss.name} bossName={boss.name} killedAt={boss.published} className="calc" />
        )
      )
    }
  </div>
  )
}

export default Wrapper