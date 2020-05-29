require('dotenv').config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const messageReceiver = process.env.RECEIVER_PHONE_NUMBER;

const sendMessageAsSms = (messageReceiver, selectedMessage) => {
  const client = require('twilio')(twilioAccountSid, twilioAuthToken);
  client.messages
    .create({
      body: selectedMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: messageReceiver
    })
    .then(message => console.log(message.sid));
}

module.exports = sendMessageAsSms;