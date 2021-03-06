require('dotenv').config();
const fs = require('fs');
const sendMessageAsSms = require('./twilio');
const messageReceiver = process.env.RECEIVER_PHONE_NUMBER;
const messageTestMode = process.env.PERFORM_MESSAGE_TEST;
const minMsgAmmount = process.env.MIN_MSG_AMMOUNT;
const messagesFile = './messages.txt';

// Check if messages.txt file exists and can be accessed
if (!fs.existsSync(messagesFile)) {
  throw new Error('The messages.txt file does not exist or could not be accessed');
}

// ##### START PERFORM MESSAGE TEST RELATED CODE #####
// Trigger message test if PERFORM_MESSAGE_TEST=true
if (messageTestMode === "true") {
  console.log('--- PERFORMING MESSAGE TEST ---' + '\n' + 'Condition: All messages must contain <160 characters (to avoid sms splitting and multiple billing)' + '\n');
  var messagesToTest = fs.readFileSync(messagesFile, 'utf8').split('\n');

  // Warn user if number of provided messages is too low
  if (messagesToTest.length < minMsgAmmount) {
    console.log('[INFO] Low number of messages!' + '\n' +
      'You should provide more messages because this tool relies on a random selection. To always send the same message is not a good idea.' + '\n');
  }

  // validateMessage() gets called forEach message in messages.txt
  function validateMessage(item) {
    var messagePosition = messagesToTest.indexOf(item) + 1; // +1 because counting begins at position 0

    // Ensure there is no empty message in messages.txt
    if (item.length == 0) {
      console.log('[FAIL] The message at line ' + messagePosition + ' in messages.txt is empty' + '\n');
      console.log('--- ENDING MESSAGE TEST ---');
      process.exit();
    }

    // Ensure there is no oversized message in messages.txt
    if (item.length > 160) {
      console.log('[FAIL] The following message at line ' + messagePosition + ' in messages.txt is too large:' + '\n\n' + item + '\n');
      console.log('--- ENDING MESSAGE TEST ---');
      process.exit();
    }
  }

  // Inform user if messages are good and exit
  messagesToTest.forEach(validateMessage);
  console.log('[OK] Successfully scanned ' + messagesToTest.length + ' Messages --> All good.' +
    '\n\n' + '--- ENDING MESSAGE TEST ---' + '\n' + '[i] Unset PERFORM_MESSAGE_TEST to not trigger the message test at the next startup.');
  process.exit();
}
// ##### END PERFORM MESSAGE TEST RELATED CODE #####

// Read line by line of messages.txt and create an object of all messages
var messages = fs.readFileSync(messagesFile, 'utf8').split('\n');

function getRandomMessage(messages) {
  console.log('Selecting 1 message of ' + messages.length + ' available');
  return messages[Math.floor(Math.random() * messages.length)];
}

// Ensure selectedMessage is not empty despite the user could already has used the message test mode
var selectedMessage = getRandomMessage(messages);
if (selectedMessage.length == 0) {
  console.log('\n');
  throw new Error('[FAIL] The selected message is empty');
}
console.log('Selected message:' + '\n' + selectedMessage);

// SMS messages should be <160 chars to avoid splitting and multiple billing
function checkMessageLength(selectedMessage) {
  if (selectedMessage.length < 160) {
    console.log('Message length (' + selectedMessage.length + ') < 160 chars --> OK');
  } else {
    console.log('Message length (' + selectedMessage.length + ') > 160 chars --> NOT OK' + '\n');
    throw new Error('Message length is too large');
  }
}

checkMessageLength(selectedMessage);

sendMessageAsSms(messageReceiver, selectedMessage);