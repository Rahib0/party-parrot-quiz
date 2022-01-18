const io = require('socketio')(3000)

io.on('connection',socket=>{console.log(socket.id)})