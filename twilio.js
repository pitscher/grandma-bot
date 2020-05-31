require('dotenv').config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const sendMessageAsSms = (messageReceiver, selectedMessage) => {
  console.log('[i] Sending message - hold tight...');
  const client = require('twilio')(twilioAccountSid, twilioAuthToken);
  client.messages
    .create({
      body: selectedMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: messageReceiver
    })
    .then(message => console.log(message.sid + '\n' + '[i] Message sent successfully to ' + message.to));
};

module.exports = sendMessageAsSms;