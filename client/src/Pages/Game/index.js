import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { addSocket, changeName, updatePlayer, changeGameState } from '../../actions'

export default function Game() {
    const { lobbyid: lobbyId } = useParams()
    const [rdy, setRdy] = useState(" not_ready")
    const [ playerSelectOption, setPlayerSelectOption ] = useState()
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
        console.log(state.players.find(player => player.socketId == socket.id))
        const ready = state.players.find(player => player.socketId == socket.id).ready
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
            {(!state.gameState) ? 
            <>
                <h1>Waiting Area</h1>
                <form onSubmit={handleSubmit}>
                    <input required type='text' value={changeNameVar} onChange={(e) => {setChangeNameVar(e.target.value)}} placeholder='enter name' />
                    <input type="submit" value="Change Name" />
                </form>
                <h3>{`Game Id - ${lobbyId}`}</h3>
                <ul>
                    {state.players.map((player, n) => <li key={n}>{player.name} - {player.ready ? "Ready" : "Not Ready"}</li>)}
                </ul>

                <button className={`butt${rdy}`} onClick={handleReady}>Ready Up</button>
                <button className={`butt${rdy}`} onClick={() => dispatch(changeGameState(1))}>start game dev</button>
            </> :
            (state.gameState === 1) ?
            <>
                {console.log(state.gameState)}
                <h1>GAME STARTED</h1>
                <p className='question'>The question for each round will be displayed here</p>
                <p>{playerSelectOption && `Option ${playerSelectOption} has been picked`}</p>
                <div>
                    <button onClick={() => setPlayerSelectOption(1)}>Option 1</button>
                    <button onClick={() => setPlayerSelectOption(2)}> Option 2</button>
                    <button onClick={() => setPlayerSelectOption(3)}>Option 3</button>
                    <button onClick={() => setPlayerSelectOption(4)}>Option 4</button>
                </div>
                <button className={`butt${rdy}`} onClick={() => dispatch(changeGameState(2))}>start game dev</button>
                
            </> :
            <>
                {console.log(state.gameState)}
                <h1>Game Summary</h1>
                <ul>
                    {state.players.map((player, n) => <li key={n}>{player.name} - Score will be displayed here</li>)}
                </ul>
            </>
            }
                
        </>
    )
}
