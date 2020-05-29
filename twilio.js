const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (phone, message) => {
  const client = require('twilio')(twilioAccountSid, twilioAuthToken);
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    })
    .then(message => console.log(message.sid));
}

module.exports = sendMessageAsSms;