import React, { useState } from 'react'
import { io } from 'socket.io-client'

export default function FormJoinGame() {
    const [ input, setInput ] = useState({ name: "", roomId: "" })

    function handleSubmit (e) {
        e.preventDefault()
        const s = io('http://localhost:3001')
        s.on('connect', () => {
            console.log(`connected with ID: ${s.id}`)
            s.emit('create-room', input.roomId, input, () => {
                window.location.assign(`http://localhost:3000/game/${input.roomId}`)
            }) 
            
        })}
    
    return (
        <form onSubmit={handleSubmit}>
            {console.log(input)}
            <label htmlFor='name'>Enter a Name</label>
            <input type='text' name='name' value={input.name} onChange={(e) => {setInput({ ...input, name: e.target.value })}} placeholder='' />
            <label htmlFor='roomId'>Enter Room ID</label>
            <input type='text' name='roomId' value={input.roomId} onChange={(e) => {setInput({ ...input, roomId:e.target.value })}} placeholder='' />
            <input type="submit" value='Join Game'/>
        </form>
    )
} 
