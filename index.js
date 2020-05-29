//const express = require('express');
//const bodyParser = require('body-parser');
const fs = require('fs');

//const app = express;
//const port = 8000;

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//app.listen(port, () => {
//  console.log(`App running on port ${port}`);
//});

//module.exports = app;

// Read line by line of messages.txt and create an object of all messages
var messages = fs.readFileSync('messages.txt', 'utf8').split('\n');

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}
console.log(getRandomMessage(messages));