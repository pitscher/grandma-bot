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

// Trigger message test if PERFORM_MESSAGE_TEST=true
if (messageTestMode === "true") {
  console.log('--- Performing message test ---' + '\n' + 'Condition: All messages must contain <160 characters (to avoid sms splitting and multiple billing)' + '\n');
  var messagesToTest = fs.readFileSync(messagesFile, 'utf8').split('\n');

  // validateMessage() gets called forEach message in messages.txt
  function validateMessage(item) {
    if (item.length > 160) {
      var messagePosition = messagesToTest.indexOf(item) + 1; // +1 because counting begins at position 0
      console.log('[FAIL] The following message at line ' + messagePosition + ' in messages.txt is too large:' + '\n\n' + item + '\n');
      process.exit();
    }
  }

  messagesToTest.forEach(validateMessage);
  console.log('[OK] Successfully scanned ' + messagesToTest.length + ' Messages --> All good.' +
    '\n\n' + '--- End of message test ---' + '\n' + '[i] Unset PERFORM_MESSAGE_TEST to not trigger the message test at the next startup.');
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