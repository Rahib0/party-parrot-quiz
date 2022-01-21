const initState = {  lobbyId: "", myScore: 0, myAnswers: [], players: [], currentQuestionNumber: 1, name: "Guest"}

const gameReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADD_SOCKET':
            return ({
                ...state, 
                socket: action.payload
            })
        case "CHANGE_NAME":
            return ({
                ...state,
                name: action.payload
            })
        
        case 'CREATE_LOBBY':
            console.log(action.payload)
            console.log(action.payload.lobbyId)
            console.log(action.payload.name)
            return ({
                ...state,
                name: action.payload.name,
                lobbyId: action.payload.lobbyId
            })
        
        case 'UPDATE_GAME_STATE':
            console.log("starting game")
            return({
                ...state,
                gameState: action.payload
            })
        
        case 'LOAD_QUESTION':
            console.log("loading the question!")
            return({
                ...state,
                question: action.payload.question,
                answers: action.payload.possibleAnswers
            })
        
        case 'UPDATE_PLAYER_LIST':
            return ({
                    ...state, 
                    players: action.payload
            })

        // case 'PLAYER_READY':
        //     const toggle = state.players.find(p => p.player.id === action.payload)
        //     const readyPlayer = [
        //         ...state.players.slice(0, state.players.indexOf(toggle)),
        //         { ...toggle, userReady: !toggle.userReady},
        //         ...state.players.slice(state.players.indexOf(toggle) + 1)
        //     ]
        //     return ({
<<<<<<< HEAD
        //          ...state
=======
        //          ...state, 
        //          player: player
>>>>>>> df7fe0b33376dcfdf9a56974c682349f61c4b25e
        //     })
        
        case 'LOAD_QUESTIONSLIST':
            return ({
                ...state,
                questionsList:[...action.payload],
              }) 
        
        case 'ADD_ANSWER':
            return ({
                ...state,
                myAnswers: [ ...state.myAnswers, action.payload ]
        })

        case 'SET_ERROR':
                return 'error'
        
        default:
            return state


    }
}

export default gameReducer