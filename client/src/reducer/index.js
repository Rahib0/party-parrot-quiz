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

        case 'PLAYER_READY':
            const toggle = state.players.find(p => p.player.id === action.payload)
            const readyPlayer = [
                ...state.players.slice(0, state.players.indexOf(toggle)),
                { ...toggle, userReady: !toggle.userReady},
                ...state.players.slice(state.players.indexOf(toggle) + 1)
            ]
            return ({
                 ...state, 
                 player: player
            })
        
        case 'PLAYER_NOT_READY':
            const notReady = [...state.players.map(player => ({ player: player.player, userReady: false}))]
            return ({
                ...state, 
                player: notReady
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