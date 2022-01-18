import React, { useState } from 'react'

export default function FormJoinGame() {
    const [ input, setInput ] = useState({ name: "", roomId: "" })
    
    return (
        <form>
            {console.log(input)}
            <label htmlFor='name'>Enter a Name</label>
            <input type='text' name='name' value={input.name} onChange={(e) => {setInput({ ...input, name: e.target.value })}} placeholder='' />
            <label htmlFor='roomId'>Enter Room ID</label>
            <input type='text' name='roomId' value={input.roomId} onChange={(e) => {setInput({ ...input, roomId: e.target.value })}} placeholder='' />
            <input type="submit" value='Join Game'/>
        </form>
    )
} 
