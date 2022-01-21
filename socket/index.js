<<<<<<< HEAD
const server = require('./server');

const port = process.env.PORT || 5001;

server.listen(port, () => console.log(`The socket.io server is running on port: ${port}!`));
=======
const gameServer = require('./server');

const port = process.env.PORT || 5001;

gameServer.listen(port, () => console.log(`Game now being served from port ${port}!`));
>>>>>>> df7fe0b33376dcfdf9a56974c682349f61c4b25e
