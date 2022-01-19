import React, { useState, useEffect } from 'react'
import { Categories, QuestionCount } from '..'
import { v4 as uuidv4 } from 'uuid'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { createLobby } from '../../actions'


export default function FormCreateGame() {
    const [ input, setInput ] = useState({ name: "", questions: 10, topic: 0, difficulty: "easy" })
    const socket = useSelector(state => state.socket)
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    // const state = useSelector(state => console.log(state))

    function handleSubmit (e) {
        e.preventDefault()
        const s = io('http://localhost:3001')
        s.on('connect', () => {
            console.log(`connected with ID: ${s.id}`)
            let lobbyId = uuidv4()
            console.log(lobbyId)
            s.emit('create-room', lobbyId, input, () => {
                dispatch(createLobby({ lobbyId: lobbyId, name: input.name }))
                console.log(state)
                window.location.assign(`http://localhost:3000/game/${lobbyId}`)
            }) 
            
        })
        
        // console.log(s.id)
        // socket.on('connect', () => {
        //     console.log(`connected with ID: ${socket.id}`)

        //     let lobbyId = uuidv4()
        //     socket.emit('create-room', lobbyId, input, () => {
        //         dispatch(createLobby({ lobbyId, name: input.name, id: socket.id }))
        //         window.location.assign(`http://localhost:3000/game/${lobbyId}`)
        //     })
        // })
    }

    useEffect(() => {
        console.log(state)
    }, [state])

    // useEffect(() => {
    //     if (!socket) {return}
    //     console.log(socket)
        

    // }, [socket])



    return (
        <div>
            {console.log("input is: ", input)}
            <form onSubmit={handleSubmit}>
                <div>
                    <input required type='text' onChange={(e) => {setInput({ ...input, name: e.target.value })}} placeholder='enter name' />
                </div>
                
                <div>
                    <QuestionCount input={input} setInput={setInput}/>
                </div>

                <div>
                    <Categories input={input} setInput={setInput} />
                </div>

                <div>
                    <label htmlFor="difficulty">Difficulty</label>
                    <select name='difficulty' onChange={(e) => {setInput({ ...input, difficulty: e.target.value })}}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div>
                    <input type="submit" value='Create Game'/>
                    
                </div>
            </form>
        </div>
    )
}
