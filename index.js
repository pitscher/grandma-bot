require('dotenv').config();
const fs = require('fs');
const sendMessageAsSms = require('./twilio');
const messageReceiver = process.env.RECEIVER_PHONE_NUMBER;

// Read line by line of messages.txt and create an object of all messages
var messages = fs.readFileSync('messages.txt', 'utf8').split('\n');

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

var selectedMessage = getRandomMessage(messages);
console.log('Selected message:' + '\n' + selectedMessage);

// SMS messages should be <160 chars to avoid splitting and multiple billing
function checkMessageLength(selectedMessage) {
  if (selectedMessage.length < 160) {
    console.log('Message length (' + selectedMessage.length + ') < 160 chars --> OK');
  } else {
    console.log('Message length (' + selectedMessage.length + ') > 160 chars --> NOT OK');
    throw new Error('Message length is too large')
  }
}

checkMessageLength(selectedMessage);

//sendMessageAsSms(messageReceiver, selectedMessage);