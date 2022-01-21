import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { addSocket, changeName, updatePlayer, changeGameState, loadQuestion, storeAnswer, storeQuestionsList } from '../../actions'
import { Back } from '../../components';
import '../../Styles/Game/game.css';
import { p1 } from '../../Styles/manyparrots';

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
            s.on('game-start', firstQuestion => {
                console.log("I am being run wahoo!")
                console.log(firstQuestion)
                dispatch(loadQuestion(firstQuestion))
                dispatch(changeGameState(1))
                console.log(firstQuestion)
                s.on('next-question', nextQuestion => {
                    console.log("OMG ANOTHER QUESTION?!?")
                    console.log(nextQuestion)
                    setPlayerSelectOption("")
                    dispatch(loadQuestion(nextQuestion))
                })
                s.on('game-summary', questionsList => {
                    dispatch(changeGameState(2))
                    console.log(questionsList)
                    dispatch(storeQuestionsList(questionsList))

                })
                

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

    useEffect(() => {
        console.log(playerSelectOption)
    }, [playerSelectOption])
    

    function handlePickAnswer(e) {
        console.log(e.target.value)
        // console.log(e.value)
        // console.log(e)
        setPlayerSelectOption(e.target.value)
    }

    function handleFinalAnswer(e) {
        console.log(playerSelectOption)
        if (!playerSelectOption) {return}
        socket.emit('submit-answer', lobbyId, playerSelectOption, () => {
            console.log("server has recieved msg")
            dispatch(storeAnswer(playerSelectOption))
        })
    }

    return (
        <div className='game'>
            {(!state.gameState) ? 
            <>
                <table>
                    <tbody>
                        <tr>
                            <td><img className='title-parrot' src={p1} alt='party-parrot' /></td>
                            <td><h1 className='wait-title'>Waiting Area</h1></td>
                            <td><img className='title-parrot' src={p1} alt='party-parrot' /></td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                    <input className='wait-name' required type='text' value={changeNameVar} onChange={(e) => {setChangeNameVar(e.target.value)}} placeholder='enter name' />
                    <input className='name-button' type="submit" value="Change Name" />
                </form>
                <h3 className='game-id'>{`Game Id - ${lobbyId}`}</h3>
                <ul className='wait-list'>
                    {state.players.map((player, n) => <li key={n}>{player.name} - {player.ready ? "Ready" : "Not Ready"}
                    <img className='wait-list-parrot' src={p1} alt='party-parrot' /></li>)}
                </ul>
                <h3>The Parrots are waiting!!</h3>

                <button className={`butt${rdy}`} onClick={handleReady}>Ready Up</button>
                <button className={`butt${rdy}`} onClick={() => dispatch(changeGameState(1))}>start game dev</button>
                <table>
                    <tbody>
                        <tr>
                            <td><img className='wait-parrot-1' src={p1} alt='party-parrot' /></td>
                            <td><img className='wait-parrot-2' src={p1} alt='party-parrot' /></td>
                            <td><img className='wait-parrot-3' src={p1} alt='party-parrot' /></td>
                            <td><img className='wait-parrot-phone' src={p1} alt='party-parrot' /></td>
                            <td><img className='wait-parrot-3' src={p1} alt='party-parrot' /></td>
                            <td><img className='wait-parrot-2' src={p1} alt='party-parrot' /></td>
                            <td><img className='wait-parrot-1' src={p1} alt='party-parrot' /></td>
                        </tr>
                    </tbody>
                </table>
            </> :
            (state.gameState === 1) ?
            <>
                {console.log(state.gameState)}
                <table>
                    <tbody>
                        <tr>
                            <td><img className='wait-parrot-1' src={p1} alt='party-parrot' /></td>
                            <td><h1 className='game-title'>THE PARTY HAS STARTED</h1></td>
                            <td><img className='wait-parrot-1' src={p1} alt='party-parrot' /></td>
                        </tr>
                    </tbody>
                </table>
                <h3 className='question'>{state.question}</h3>
                <div className='q-dotted'><p></p></div>
                <p className='selected'>{playerSelectOption && `${playerSelectOption} has been picked`}</p>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><button className='answer' onClick={handlePickAnswer} value={state.answers[0]}> {state.answers[0]}</button><img className='answer-parrot' src={p1} alt='party-parrot' /></td>
                                <td><button className='answer' onClick={handlePickAnswer} value={state.answers[1]} > {state.answers[1]} </button><img className='answer-parrot' src={p1} alt='party-parrot' /></td>
                            </tr>
                            <tr>
                                <td><button className='answer' onClick={handlePickAnswer} value={state.answers[2]} > {state.answers[2]} </button><img className='answer-parrot' src={p1} alt='party-parrot' /></td>
                                <td><button className='answer' onClick={handlePickAnswer} value={state.answers[3]} > {state.answers[3]} </button><img className='answer-parrot' src={p1} alt='party-parrot' /></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className='q-dotted'><p></p></div>
                    
                    
                </div>
                <button className='sbmt-answr' onClick={handleFinalAnswer} >FINALIZE</button>
                <button className={`butt${rdy}`} onClick={() => dispatch(changeGameState(2))}>start game dev</button>
                
            </> :
            <>
                
                {console.log(state.gameState)}
                <table>
                    <tbody>
                        <tr>
                            <td><img className='summary-parrot' src={p1} alt='party-parrot' /></td>
                            <td><h1 className='summary-title'>Game Summary</h1></td>
                            <td><img className='summary-parrot' src={p1} alt='party-parrot' /></td>
                        </tr>
                    </tbody>
                </table>
                <ul className='player-result-table'>
                    {state.players.map((player, n) => <li key={n}>{player.name} - {player.score} pts <img className='result-parrot' src={p1} alt='party-parrot' /></li>)}
                    
                </ul>
                <div className='q-dotted'><p></p></div>
                <br></br>
                <ol className='answer-table'>
                    {state.questionsList && state.questionsList.map((question, n) => <li key={n}>
                        <span>{question.question}</span>
                        <p>{question.correct_answer}</p>
                        <p>You Answered: {state.myAnswers[n]}</p>
                    </li>)}
                </ol>
                <div className='q-dotted'><p></p></div>
                <br></br>
                <img className='summary-phone-parrot' src={p1} alt='party-parrot' />
                <br></br>
                <Back />
            </>
            }
                
        </div>
    )
}
