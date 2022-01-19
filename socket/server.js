const io = require("socket.io")(3001, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

let gamesArray = []

function addPlayer(lobbyId, name, socketId) {
    const game = gamesArray.find(game => game.lobbyId == lobbyId)
    
    const index = gamesArray.indexOf(game)
    console.log(game)
    game.players.push({ name, socketId })
    // gamesArray.fill( { ...game, players: [ ...game.players, { name, socketId } ] } )
    console.log("new array: ", gamesArray)
}

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('create-room', (lobbyId, input, cb) => {
        socket.join(lobbyId)
        gamesArray.push({ lobbyId, players: [ ], totalQuestions: input.questions, category: input.topic, difficulty: input.difficulty })
        cb()
        console.log(gamesArray)
    })

    socket.on('join-lobby', (lobbyId, name) => {
        console.log(`lobby id is [${lobbyId}], name is ${name}`)
        socket.join(lobbyId)
        addPlayer(lobbyId, name, socket.id)
        console.log(gamesArray[0].players)
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