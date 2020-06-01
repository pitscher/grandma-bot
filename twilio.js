require('dotenv').config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const sendMessageAsSms = (messageReceiver, selectedMessage) => {
  console.log('[i] Sending message - hold tight...');
  const client = require('twilio')(twilioAccountSid, twilioAuthToken);
  var promise = client.messages
    .create({
      body: selectedMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: messageReceiver
    });

  promise.then(function (message) {
    console.log('[OK] Success! SMS-SID: ' + message.sid);
  }, function (error) {
    console.log('[FAIL] There was an error! Detail:\n' + error.message);
  });

};

module.exports = sendMessageAsSms;