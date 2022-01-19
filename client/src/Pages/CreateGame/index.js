import React from 'react'
import { Back, FormCreateGame } from '../../components'
import '../../Styles/createGame/creategame.css';
import { parrot } from '../../Styles/manyparrots';


export default function CreateGame() {
    return (
        <div className='create-game'>
            <table>
                <tbody>
                    <td><img src={parrot} alt='party-parrot' /></td>                    
                    <td>            
                        <h1>Create your Game</h1>
                    </td>
                    <td><img src={parrot} alt='party-parrot' /></td>
                </tbody>
            </table>
            <FormCreateGame />
            <div className='bck-btn'>
                <Back />
            </div>
        </div>
        
    )
}
