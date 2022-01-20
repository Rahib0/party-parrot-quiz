import React from 'react'
import { Back, FormCreateGame } from '../../components'
import '../../Styles/createGame/creategame.css';
import { p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30 } from '../../Styles/manyparrots';


export default function CreateGame() {
    return (
        <div className='create-game'>
            <table>
                <tbody>
                    <tr>
                        <td><img src={p22} alt='party-parrot' /></td>                    
                        <td>            
                            <h1>Create your Game</h1>
                        </td>
                        <td><img src={p23} alt='party-parrot' /></td>
                    </tr>
                </tbody>
            </table>
            <FormCreateGame />
            <div className='bck-btn'>
                <Back />
            </div>
            <img className='phone' src={p24}/>
        </div>
        
    )
}
