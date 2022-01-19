import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

export default function Game() {
    const { lobbyid: lobbyId } = useParams()
    const socket = useSelector(state => state.socket)
    const name = useSelector(state => state.name)
    console.log(name)
    
    useEffect(() => {
        const s = io('http://localhost:3001')
        s.on('connect', () => {
            s.emit('join-lobby', lobbyId, name )
        })
    })
    

    return (
        <>
            <h1>Waiting Area</h1>
            <h3>{`Game Id - ${lobbyId}`}</h3>
        </>
    )
}
