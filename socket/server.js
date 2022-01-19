const io = require("socket.io")(3001, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

let gamesArray = []

function addPlayer(lobbyId, name, socketId) {
    if (!gamesArray) {return}
    try {
        const game = gamesArray.find(game => game.lobbyId == lobbyId)
        game.players.push({ name, socketId, ready: false })
        console.log("new array: ", gamesArray)
        console.log(game.players)
    } catch {
        e => console.log(e)
    }
    
}

function removePlayer( lobbyId, socketId) {
    try {
        if (!gamesArray) {return}
        const game = gamesArray.find(game => game.lobbyId == lobbyId)
        let players = game.players.filter(player => player.socketId != socketId)
        game.players = players
        console.log(gamesArray)
    } catch {
        e => console.log(e)
    }
    

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
    try {
        const game = gamesArray.find(game => game.lobbyId == lobbyId)
        let player = game.players.find(player => player.socketId == socketId)
        const index = game.players.findIndex(player => player.socketId == socketId)
        player = { ...player, name: name }
        game.players[index] = player 
    } catch {
        e => console.log(e)
    }
    
    // console.log("player info: ", player)
    // console.log("game info: ", game)
}

function playerArray(lobbyId) {
    try {
        const game = gamesArray.find(game => game.lobbyId == lobbyId)
        // console.log(game.players)
        return game.players
    } catch {
        e => console.log(e)
    }
    
}

function togglePlayerReady(lobbyId, socketId, ready=true) {
    const game = gamesArray.find(game => game.lobbyId == lobbyId)
    let player = game.players.find(player => player.socketId == socketId)
    const index = game.players.findIndex(player => player.socketId == socketId)
    player = { ...player, ready: ready }
    game.players[index] = player 
    // console.log("player info: ", player)
    // console.log("game info: ", game)
}

function checkIfEveryoneReady(lobbyId) {

}



io.on('connection', socket => {
    socket.on('create-room', (lobbyId, input, cb) => {
        socket.join(lobbyId)
        gamesArray.push({ lobbyId, players: [ ], totalQuestions: input.questions, category: input.topic, difficulty: input.difficulty })
        cb()
    })

    socket.on('join-lobby', (lobbyId, name) => {
        console.log(`lobby id is [${lobbyId}], name is ${name}`)
        socket.join(lobbyId)
        try {
            addPlayer(lobbyId, name, socket.id)
            io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        } catch {
            e => console.log(e)
        }
        
    })

    socket.on('disconnecting', () => {
        console.log("disconnected:", socket.id)
        lobbyId = [...socket.rooms][1]
        removePlayer( lobbyId, socket.id )
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        // removePlayer( socket.id )
        // io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        
    })





    socket.on('change-name', (lobbyId, name) => {
        // console.log(lobbyId, name)
        changePlayerName(lobbyId, name, socket.id)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
    })

    socket.on('ready-up', (lobbyId, cb) => {
        togglePlayerReady(lobbyId, socket.id)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        cb()
    })

    socket.on('ready-down', (lobbyId, cb) => {
        togglePlayerReady(lobbyId, socket.id, false)
        io.in(lobbyId).emit('update-player-lobby', playerArray(lobbyId))
        cb()
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