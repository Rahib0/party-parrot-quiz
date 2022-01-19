import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { addSocket, changeName, updatePlayer } from '../../actions'

export default function Game() {
    const { lobbyid: lobbyId } = useParams()
    const [rdy, setRdy] = useState(" not_ready")
    const socket = useSelector(state => state.socket)
    const name = useSelector(state => state.name)
    const state = useSelector(state => state)
    const [ changeNameVar, setChangeNameVar ] = useState("Guest")
    console.log(name)
    console.log(state)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const s = io('http://localhost:3001')
        s.on('connect', () => {
            s.emit('join-lobby', lobbyId, name )
            dispatch(addSocket(s))
            s.on('update-player-lobby', playerArray => {
                console.log(playerArray)
                dispatch(updatePlayer(playerArray))
            })
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(changeName(changeNameVar))
        socket.emit('change-name', lobbyId ,changeNameVar)
    }

    function handleReady() {
        const ready = state.players.find(player => player.id == socket.id).ready
        if (!ready) {
            socket.emit('ready-up', lobbyId, () => {
                setRdy(" ready")
            })
            
        } else {
            socket.emit('ready-down', lobbyId, () => {
                setRdy(" notReady")
            })
        }
        
    }

    useEffect(() => {
        console.log(state)
    }, [state])
    

    return (
        <>
            <h1>Waiting Area</h1>
            <form onSubmit={handleSubmit}>
                <input required type='text' value={changeNameVar} onChange={(e) => {setChangeNameVar(e.target.value)}} placeholder='enter name' />
                <input type="submit" value="Change Name" />
            </form>
            <h3>{`Game Id - ${lobbyId}`}</h3>
            <ul>
                {state.players.map((player, n) => <li key={n}>{player.player} - {player.ready ? "Ready" : "Not Ready"}</li>)}
            </ul>

            <button className={`butt${rdy}`} onClick={handleReady}>Ready Up</button>
        </>
    )
}
