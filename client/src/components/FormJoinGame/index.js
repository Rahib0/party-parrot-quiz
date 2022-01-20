import React, { useState } from 'react'
import '../../Styles/joinGame/joingameform.css';

export default function FormJoinGame() {
    const [ input, setInput ] = useState({ name: "", roomId: "" })
    
    return (
        <form>
            {console.log(input)}
            <label className='name-label' htmlFor='name'>Enter Name:</label>
            <input className='name-input' type='text' name='name' value={input.name} onChange={(e) => {setInput({ ...input, name: e.target.value })}} placeholder='' />
            <div className='dotted-line'><p></p></div>
            <label className='room-label' htmlFor='roomId'>Enter Room ID:</label>
            <input className='room-input' type='text' name='roomId' value={input.roomId} onChange={(e) => {setInput({ ...input, roomId: e.target.value })}} placeholder='' />
            <br></br>
            <div className='dotted-line'><p></p></div>
            <input className='submit-btn' type="submit" value='Join Game'/>
        </form>
    )
} 
