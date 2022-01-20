
export const addSocket = (payload) => ({
    type: "ADD_SOCKET",
    payload
})

export const createLobby = (payload) => ({
     type: "CREATE_LOBBY", 
     payload 
    })

export const changeName = (payload) => ({
    type: "CHANGE_NAME", 
    payload 
    })

export const updatePlayer = (payload) => ({
    type: "UPDATE_PLAYER_LIST",
    payload
})

export const changeGameState = (payload) => ({
    type: "UPDATE_GAME_STATE",
    payload
})

export const loadQuestion = (payload) => ({
    type: "LOAD_QUESTION",
    payload
})

export const storeQuestionsList = (payload) => ({
    type: "LOAD_QUESTIONSLIST",
    payload
})

export const storeAnswer = (payload) => ({
    type: "ADD_ANSWER",
    payload
})






















