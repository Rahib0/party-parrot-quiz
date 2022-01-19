const initState = { game: { lobbyId: "", myScore: 0, myAnswers: [], players: [], currentQuestionNumber: 1 }, name: "Guest"}

const gameReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADD_SOCKET':
            return ({
                ...state, 
                socket: action.payload
            })
        
        case 'CREATE_LOBBY':
            return ({
                ...state.game,
                lobbyId: action.payload.lobbyId,
                players: [{ name: action.payload.name }],
                name: action.payload.name
            })
        
        case 'ADD_PLAYER':
            return ({
                    ...state, 
                    players: action.payload.map(player => ({player: player, ready:false}))
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