require('dotenv').config();
const fs = require('fs');
const sendMessageAsSms = require('./twilio');
const messageReceiver = process.env.RECEIVER_PHONE_NUMBER;
const messageTestMode = process.env.PERFORM_MESSAGE_TEST;
const messagesFile = './messages.txt';

// Check if messages.txt file exists and can be accessed
if (fs.existsSync(messagesFile)) {
  //messages.txt exists. All fine.
} else {
  throw new Error('The messages.txt file does not exist or could not be accessed');
}

if (messageTestMode === "true") {
  console.log('--- Performing message test ---' + '\n' + 'Condition: All messages must contain <160 characters (to avoid sms splitting and multiple billing)');
  var messagesToTest = fs.readFileSync(messagesFile, 'utf8').split('\n');
  messagesToTest.forEach(element => {
    if (element.length > 160) {
      console.log('The following message is too large:' + '\n' + console.log(element));
    }
  });
  console.log('Successfully scanned ' + messagesToTest.length + ' Messages --> All good.' + '\n' + 'End of message test. Set PERFORM_MESSAGE_TEST=false to send a sms.');
  process.exit();
}

// Read line by line of messages.txt and create an object of all messages
var messages = fs.readFileSync(messagesFile, 'utf8').split('\n');

function getRandomMessage(messages) {
  console.log('Selecting 1 message of ' + messages.length + ' available')
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
    throw new Error('Message length is too large');
  }
}

checkMessageLength(selectedMessage);

//sendMessageAsSms(messageReceiver, selectedMessage);