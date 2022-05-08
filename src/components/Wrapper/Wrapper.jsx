import React, { useEffect, useState } from "react";
import RaidBossCalculator from "../RaidBossCalculator/RaidBossCalculator";
import { read } from 'feed-reader'
import './Wrapper.scss'
const Wrapper = () => {

    const [rss, setRss] = useState('');
    const [bossInfo, setBossInfo] = useState([]);
    const bossIds = [
        {
            id: '4195',
            name: 'Golkonda'
        },
        {
            id: '4192',
            name: 'Hallate'
        },
        {
            id: '4186',
            name: 'Kernon'
        },
        {
            id: '4179',
            name: 'Cabrio'
        },
    ]
    useEffect(() => {
        const url = ' https://lit-badlands-25495.herokuapp.com/https://asterios.tm/index.php?cmd=rss&serv=3&filter=all&out=xml'
        async function getFeed(url){
            let feed = await read(url)
            console.log(feed)
           setRss(feed)
           filterFeed(feed,bossIds)
        }
        getFeed(url)  
    }, [])

    const filterFeed = (feed, bossIds) => {
        console.log('filtering feed')
        const { entries } = feed
        
        var rx =  new RegExp(bossIds.map(v => v.id).join('|'))
        let bosses = entries.filter(
            x => {
                return rx.test(x.link)
            })
        bosses.forEach(boss=>{
            boss.id = boss.link.split('id=')[1]
            boss.name = bossIds.find(x=>x.id==boss.id).name
        })
        console.log(bosses)
        setBossInfo(bosses)
    }

    return (
        <div className="wrapper">

        {
            bossInfo.map(boss=>
                (
                    <RaidBossCalculator bossName={boss.name} killedAt={boss.published} className="calc"/>
                )
        )}

        </div>
    )
}

export default Wrapper