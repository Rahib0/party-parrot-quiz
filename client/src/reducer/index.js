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
        
        case 'UPDATE_PLAYER_LIST':
            return ({
                    ...state, 
                    players: action.payload
            })
        
        case 'LOAD_QUESTIONS':
            return ({
                ...state,
                questions:[...action.payload],
              }) 
        
        case 'ADD_ANSWER':
            return ({
                ...state,
                answers: state.answers.concat([action.payload])
        })

        case 'SET_ERROR':
                return 'error'
        
        default:
            return state


    }
}

export default gameReducer