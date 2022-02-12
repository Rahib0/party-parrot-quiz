const axios = require('axios')
const httpServer = require("http").createServer();

const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

let gamesArray = []

function addPlayer(lobbyId, name, socketId) {
    try{
        const game = gamesArray.find(game => game.lobbyId == lobbyId)
        game.players.push({ name, socketId, ready: false, score: 0 })
        console.log("new array: ", gamesArray)
        console.log(game.players)
    } catch {
        console.log("whoops something went wrong adding someone")
    }
}

function removePlayer( lobbyId, socketId) {
    if (!gamesArray) {return}
    const game = gamesArray.find(game => game.lobbyId == lobbyId)
    let players = game.players.filter(player => player.socketId != socketId)
    game.players = players
    console.log(gamesArray, "Player removed")

    // console.log("player info: ", player)
    // console.log("game info: ", game)

    // console.log("id is:", socketId)
    // const newGamesArr = gamesArray.filter(game => {
    //     const newPlayersArray = game.players.filter(player => {
    //         console.log(player.socketId != socketId)
    //         // return (player.socketId != socketId)
    //     })
    //     game = { ...game, players: newPlayersArray }
    // })
    // gamesArray = [ ...newGamesArr ]
    // console.log(newGamesArr)
    // console.log(gamesArray)
    // let newArr = []
    // gamesArray.forEach(game => {
    //     if (!game) {return}
    //     console.log("players1:", game.players)
    //     game.players[ game.players.filter(player => player.socketId != socketId)]
    //     console.log("players2:", game.players)
    //     newArr.push(game)
    // })
    // gamesArray = [ ...newArr.filter(game => game.players) ]
    // console.log(gamesArray)
    // console.log(game.players)
    // game.players.filter(player => player.socketId !== socketId)
    // console.log(game.players)
    // if (game.player.length === 0) {
    //     const index = gamesArray.findIndex(game => game.lobbyId == lobbyId)
    //     gamesArray.splice(index, 1)
    // }
    // console.log("new array: ", gamesArray)
}

function changePlayerName(lobbyId, name, socketId) {
    const game = gamesArray.find(game => game.lobbyId == lobbyId)
    let player = game.players.find(player => player.socketId == socketId)
    const index = game.players.findIndex(player => player.socketId == socketId)
    player = { ...player, name: name }
    game.players[index] = player 
    // console.log("player info: ", player)
    // console.log("game info: ", game)
}

function playerArray(lobbyId) {
    const game = gamesArray.find(game => game.lobbyId == lobbyId)
    // console.log(game.players)
    return game.players
}

function togglePlayerReady(lobbyId, socketId, ready=true) {
    const game = gamesArray.find(game => game.lobbyId == lobbyId)
    let player = game.players.find(player => player.socketId == socketId)
    const index = game.players.findIndex(player => player.socketId == socketId)
    player = { ...player, ready: ready }
    game.players[index] = player 
    console.log("player info: ", player)
    console.log("game info: ", game)
}

function readyCheck(aGame){
    console.log("CHECKING IF EVERYONE HAS READIED UP IN GAME")
    let readyPlayerAmount = 0
    for(let i = 0; i<aGame.players.length ;i++){
        if( aGame.players[i].ready == true){
            readyPlayerAmount++;
        }
    }
    if(readyPlayerAmount === aGame.players.length){
        console.log("TRUE")
        return (true)
    }
    else{
        console.log("FALSE")
        return (false)
    }
}



io.on('connection', socket => {
    socket.on('create-room', (lobbyId, input, cb) => {
        socket.join(lobbyId)
        gamesArray.push({ lobbyId, players: [ ], totalQuestions: input.questions, currentQuestion: 0, answerHolder: [], category: input.topic, difficulty: input.difficulty })
        cb()
    })

    socket.on('join-lobby', (lobbyId, name) => {
        console.log(`lobby id is [${lobbyId}], name is ${name}`)
        socket.join(lobbyId)
        addPlayer(lobbyId, name, socket.id)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
    })

    socket.on('disconnecting', () => {
        console.log("disconnected:", socket.id)
        lobbyId = [...socket.rooms][1]
        removePlayer( lobbyId, socket.id )
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        // removePlayer( socket.id )
        // io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        if (gamesArray) {
            const game = gamesArray.find(game => game.lobbyId == lobbyId)
            setTimeout(() => {
                if (game.players.length == 0) {
                    console.log(game.players.length)
                    gamesArray = gamesArray.filter(gam => gam.lobbyId !== game.lobbyId)
                    console.log(gamesArray)
                }
            }, 5000) 
        }
        console.log(gamesArray)
    })





    socket.on('change-name', (lobbyId, name) => {
        // console.log(lobbyId, name)
        changePlayerName(lobbyId, name, socket.id)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
    })

    socket.on('ready-up', (lobbyId, cb) => {
        console.log(`${socket.id} HAS READIED UP`)
        togglePlayerReady(lobbyId, socket.id)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        cb()
        let game = gamesArray.find(game => game.lobbyId == lobbyId)
        let index = gamesArray.findIndex(game => game.lobbyId == lobbyId)
        console.log(readyCheck(game))
        if (readyCheck(game)) {
            console.log("EVERYONE HAS READIED UP")
            axios.get(`https://opentdb.com/api.php?amount=${game.totalQuestions}&category=${game.category}&difficulty=${game.difficulty}&type=multiple`)
            .then(res => {
                // console.log(res.data.results)
                game = { ...game, questionsHolder: res.data.results }
                gamesArray[index] = game
                console.log(game)
                console.log(game.questionsHolder[0])
                const q = game.questionsHolder[0]
                loadedQuestion = { question: q.question, possibleAnswers: q.incorrect_answers.concat([q.correct_answer]).sort(() => Math.random() - 0.5) }
                console.log(loadedQuestion)
                io.in(lobbyId).emit('game-start', loadedQuestion)
            })
            // socket.to(lobbyId).emit('game-start', () => {

            // })
        }


    })

    socket.on('ready-down', (lobbyId, cb) => {
        togglePlayerReady(lobbyId, socket.id, false)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        cb()
    })

    socket.on('submit-answer', (lobbyId, answer, cb) => {
        let game = gamesArray.find(game => game.lobbyId == lobbyId)
        game.answerHolder.push({ socketId: socket.id, answer: answer })
        cb()
        if (game.answerHolder.length === game.players.length) {
            console.log("ALL ANSWERS SUBMITTED")
            game.answerHolder.forEach(submit => {
                // console.log(game)
                // console.log(game.questionsHolder)
                // console.log(game.currentQuestion)
                if (submit.answer == game.questionsHolder[game.currentQuestion].correct_answer) {
                    let player = game.players.find(player => player.socketId == submit.socketId)
                    let score = player.score + 10
                    player = { ...player, score }
                    console.log(player)
                    let index = game.players.findIndex(player => player.socketId == submit.socketId)
                    game.players[index] = player
                }
            })
            console.log(game.players)
            // console.log(game.currentQuestion)
            io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
            game.answerHolder = []
            game.currentQuestion = game.currentQuestion + 1
            if (game.currentQuestion == (game.totalQuestions)) {
                console.log("GAME IS STOPPING")
                io.in(lobbyId).emit('game-summary', game.questionsHolder)
            } else {
                console.log('NEXT QUESTION!')
                // console.log(game.questionsHolder[game.currentQuestion])
                const q = game.questionsHolder[game.currentQuestion]
                loadedQuestion = { question: q.question, possibleAnswers: q.incorrect_answers.concat([q.correct_answer]).sort(() => Math.random() - 0.5) }
                // console.log(loadedQuestion)
                io.in(lobbyId).emit('next-question', loadedQuestion)
            }
        }

    })

})

// io.on('connection', socket => {
//     console.log(socket.id)
//     // custom event say-hello, msg parameter
//     socket.on('say-hello', msg => {
//         // send to all sockets
//         // io.emit('recieve-message', msg)
//         // send to all sockets except the one that initially sent the request
//         socket.broadcast.emit('recieve-message', msg)
//         // send to everyone in specific room except the socket that intially sent request
//         // socket.to(room).emit('event', parameters...)
//         console.log(msg)
//     })

//     socket.on('join-room', room, cb => {
//         // join socket into room "room"
//         socket.join(room)
//         // callback function that executes on client socket to socket that requested
//         cb(`joined ${room}`)
//     })
// })


module.exports = httpServer;