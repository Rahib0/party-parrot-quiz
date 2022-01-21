# LAP 3 Project: Quiz App 

A project to create a quiz app. The user can create a quiz with their desired number of questions and topic, the user will then be provided with a unique room key which they can share with their friends to join the game room they have created. Each user will recieve a score depending on the number of correct answers they achieved during the game. Upon completion of the game, users will be shown a ranking of how well each player did inside the game room and a list containing their answers compared to the correct answers. Users scores will be saved to a database and added to a leaderboard based on the category of their game. 

## Installation & Usage 

### Installation 
 
- Clone or download the repository 
- install all required dependencies by running the command `npm i` in the socket, server and client folders. 

### Usage 
- Run command `npm start` in the client folder to run the front end. 
- Run command `npm run start` in the socket folder to run socket.io. 
- Run command `bash _scripts/startDev.sh` in the server folder to run the backend. 

## Technologies 
- HTML/CSS/React for client side 
- Javascript for server/client side 
- Jest for testing 
- Docker
- Socket.io 

## Wins & Challenges 

### Wins 
- All the specified requirements of the project were met. 
- Users can create a game based on their specified requirements of difficulty, topic and number of questions. 
- Users can share their game room with friends. 

### Challenges 
- Getting the api with the database working. 
- Developing working tests for the front end. 
- Deploying app via hosting services. 
