import React, { useState } from 'react'
import { io } from 'socket.io-client'
import '../../Styles/joinGame/joingameform.css';

export default function FormJoinGame() {
    const [ input, setInput ] = useState({ roomId: "" })

    function handleSubmit (e) {
        e.preventDefault()
        const s = io('http://localhost:5001')
        s.on('connect', () => {
            console.log(`connected with ID: ${s.id}`)
            s.emit('create-room', input.roomId, input, () => {
                window.location.assign(`http://localhost:3000/game/${input.roomId}`)
            }) 
            
        })}
    
    return (
        <form onSubmit={handleSubmit}>
            {console.log(input)}
            <div className='dotted-line'><p></p></div>
            <label className='room-label' htmlFor='roomId'>Enter Room ID:</label>
            <input className='room-input' type='text' name='roomId' value={input.roomId} onChange={(e) => {setInput({ ...input, roomId: e.target.value })}} placeholder='' />
            <br></br>
            <div className='dotted-line'><p></p></div>
            <input className='join-btn' type="submit" value='Join Game'/>
        </form>
    )
} 
