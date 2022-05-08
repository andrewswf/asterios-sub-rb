import React, { useEffect, useState } from "react";
import RaidBossCalculator from "../RaidBossCalculator/RaidBossCalculator";
import { groupBy, maxBy } from "lodash";
import { read } from 'feed-reader'
import './Wrapper.scss'

import hallate from '../../assets/hallate.png'
import kernon from '../../assets/kernon.jpg'
import cabrio from '../../assets/cabrio.jpg'
import golkonda from '../../assets/golkonda.jpg'

const Wrapper = () => {

  const [rss, setRss] = useState('');
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [bossInfo, setBossInfo] = useState([]);
  const bossNames = [
    {
      name:'Golkonda',
      img: golkonda,
      address: '',
      extraInfo: ''
    },
    {
      name:'Hallate',
      img: hallate,
      address: '',
      extraInfo: ''
    },
    {
      name:'Kernon',
      img: kernon,
      address: '',
      extraInfo: ''
    },
    {
      name:'Cabrio',
      img: cabrio,
      address: '',
      extraInfo: ''
    }]
  
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

  const filterFeed = (feed, bossNames) => {
    const { entries } = feed
    var rx = new RegExp(bossNames.map(x=>x.name).join('|'))
    let bosses = []
    entries.forEach(entry => {
      const match = entry.title.match(rx)
      if(match){
        entry.name = match[0]
        const matchedBoss = bossNames.find(x=>x.name === match[0])
        entry.img = matchedBoss.img;
        entry.address = matchedBoss.address
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
          <RaidBossCalculator key={boss.name} boss={boss} className="calc" />
        )
      )
    }
  </div>
  )
}

export default Wrapper