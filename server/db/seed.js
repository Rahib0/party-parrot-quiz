//const db = connect("mongodb://localhost:27017/games");
const db = connect("mongodb://localhost:27017/dev_db");

db.games.drop();
//db.question.insertOne({id:1,question:{category:"Entertainment: Books",difficulty:"medium",question: "In the &quot;The Hobb bit&quot;, who kills Smaug?",correct_answer:"Bard",incorrect_answers:["Bilbo Baggins","Gandalf the Grey","Frodo"]}});

db.games.insertMany([
    {greeting: 'hello'}
]);