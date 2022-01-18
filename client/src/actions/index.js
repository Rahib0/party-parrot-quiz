import axios from 'axios';

export const addSocket = (payload) => ({
    type: "ADD_SOCKET",
    payload
})

export const addPlayer = (payload) => ({
    type: "ADD_PLAYER",
    payload
})

export const storeQuestions = (payload) => ({
    type: "LOAD_QUESTIONS",
    payload
})

export const storeAnswer = (payload) => ({
    type: "ADD_ANSWER",
    payload
})




















