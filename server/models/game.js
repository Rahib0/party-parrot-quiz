const { init } = require("../initdb");
const { ObjectId } = require('mongodb'); 
const axios = require('axios')

class Questions {
    constructor(data) {
      this.id = data._id;
      this.questions = data.results.map((result) => ({
        category: result.category,
        difficulty: result.difficulty,
        type: result.type,
        question: result.question,
        possible_answers: result.incorrect_answers.concat([result.correct_answer]).sort(() => Math.random() - 0.5)
      }))
      this.scores = data.scores
    }  
    
}
class Game{
    constructor(data){
    this.id = data.id
    this.name = data.name
    this.answers= data.questions.results}
    static get all() {
      return new Promise(async (resolve, reject) => {
        try {
          const db = await init();
          const collection = await db.collection("games");
          const games = await collection.find({});
          resolve(games.toArray());
        } catch (err) {
          reject(`Error retrieving game: ${err.message}`);
        }
      });
  }
  
  static findById(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const db = await init();
          const collection = await db.collection("games");
          const game = await collection.findOne({ _id: ObjectId(id) });
          resolve(game);
        } catch (err) {
          reject(`Error retrieving game: ${err.message}`);
        }
      });
  }
  
  //Query to retrieve questions from API
  static create(query) {
      return new Promise(async (resolve, reject) => {
        const amount = query.amount;
        const category = query.category;
        const difficulty = query.difficulty;
        const type = query.type;
        try {
          const db = await init();
          const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
          console.log(url);
          let { data } = await axios.get(url);
          if (data.response_code > 0) {
            throw Error("no questions found, try again");
          }
          const newGame = db.collection("games").insertOne({ questions: data });
          resolve(newGame);
        } catch (err) {
          reject(`Error creating game: ${err.message}`);
        }
      });
  }
}

module.exports = { Questions, Game };