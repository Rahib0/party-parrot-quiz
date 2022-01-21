const express = require("express")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("Welcome to the Express server for Parrot Party Quiz!"));

const gamesController = require("./controllers/games")
app.use('/games', gamesController)

module.exports = app;