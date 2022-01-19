import React from 'react'
import { Back, FormCreateGame } from '../../components'
import '../../Styles/createGame/creategame.css';

export default function CreateGame() {
    return (
        <div className='create-game'>
            <h1>Create your Game</h1>
            <FormCreateGame />
            <div className='bck-btn'>
                <Back />
            </div>
        </div>
        
    )
}
