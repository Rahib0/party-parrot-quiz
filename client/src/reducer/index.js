const initState = {players: [], answers: []}

const gameReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADD_SOCKET':
            return ({
                ...state, 
                socket: action.payload
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