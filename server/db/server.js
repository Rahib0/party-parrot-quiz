const db = connect("mongodb://localhost:27017/games");

db.games.drop();
db.question.insertOne({id:1,question:{category:"Entertainment: Books",difficulty:"medium",question: "In the &quot;The Hobbit&quot;, who kills Smaug?",correct_answer:"Bard",incorrect_answers:["Bilbo Baggins","Gandalf the Grey","Frodo"]}});
