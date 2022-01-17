class Game {
    constructor(data) {
      this.id = data._id;
      this.name = data.name;
      this.questions = data.results.map((result) => ({
        category: result.category,
        difficulty: result.difficulty,
        type: result.type,
        question: result.question,
        possible_answers: result.incorrect_answers.concat([result.correct_answer]).sort(() => Math.random() - 0.5)
      })
      this.scores = data.scores
    }  
}

module.exports = { Game };