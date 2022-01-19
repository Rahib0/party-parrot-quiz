import React from 'react'
import { LeaderBoard, Back } from '../../components'
import '../../Styles/leaderboard/leaderboard.css'

export default function Leaderboards() {
    return (
        <div className='lbpage'>
            <div className='leaderboard'>
                <LeaderBoard />
            </div>
            <div className='bck-btn'>
                <Back />
            </div>

        </div>
    )
}
