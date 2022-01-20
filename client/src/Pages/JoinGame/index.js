import React, {useState, useEffect} from 'react'
import { Back, FormJoinGame } from '../../components';
import '../../Styles/joinGame/joingame.css';
import { p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30 } from '../../Styles/manyparrots';

export default function JoinGame() {
    
    return (
        <div className='join-game'>
            <table>
                <td><img className='title-parrot' src={p1} alt='party-parrot' /></td>
                <td>
                    <h1>Join a Game</h1>
                </td>
                <td><img className='title-parrot' src={p2} alt='party-parrot' /></td>
            </table>
            <FormJoinGame />
            <br></br>
            <Back />
            <br></br>
                <img className='phone' src={p3}/>
            <br></br>
        </div>
    )
}
