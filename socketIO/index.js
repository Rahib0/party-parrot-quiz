const Server = require('./server');
const port = process.env.PORT || 5000;
Server.listen(port, () => console.log(`Game is currently served from port ${port}!`));