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
    }  
    
}
class Game {
    constructor(data) {
      this.id = data.id
      this.name = data.name
      this.answers= data.questions.results
    }
      
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

  //Function to calaulate scores for each player
  static addAnswers(id, player, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const answers = data.answers
        const name = data.name
        const db = await init();
        const gameToUpdate = await db
          .collection("games")
          .findOne({ _id: ObjectId(id) });
        const quiz = gameToUpdate.questions.quiz;
        const difficulty = quiz[0].difficulty;
        const type = quiz[0].type;
        const res = quiz.map((r, i) => ({
          correct_answer: r.correct_answer,
		      player_answer: answers[i],
		      player_correct: answers[i] === r.correct_answer,
        }));
        const count = res.filter((r) => r.player_correct === true).length;
        const score = await db.collection("scores").insertOne({
          name,
          count,
          difficulty,
          type
        });
        resolve(score)
      } catch (err) {
        reject(`Could not add answers: ${err.message}`);
      }
    });
  }

  //Get function to add scores to leaderboard
  static get totalScores() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const collection = await db.collection("leaderboard");
        const data = (await collection.find({}).toArray()).map((r) => ({
          name: r.name,
          category: result.category,
          difficulty: result.difficulty,
          score: r.score,
        }));
        resolve(data);
      } catch (err) {
        reject(`Error retrieving scores: ${err.message}`);
      }
    });
  }
}

module.exports = { Questions, Game };