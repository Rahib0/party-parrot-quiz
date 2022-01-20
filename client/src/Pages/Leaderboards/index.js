import React from 'react'
import { LeaderBoard, Back } from '../../components'
import '../../Styles/leaderboard/leaderboard.css';
import { p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30 } from '../../Styles/manyparrots';


export default function Leaderboards() {

    
    return (
        <div className='lbpage'>

            <div className='leaderboard'>
                <LeaderBoard />
            </div>
            <div className='bck-btn'>
                <Back />
            </div>
            <img className='phone' src={p25}/>
            <br></br>

        </div>
    )
}
