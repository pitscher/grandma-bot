#!/bin/bash

docker run --rm --name grandmabot \
-e TWILIO_ACCOUNT_SID="<yourValueHere>" \
-e TWILIO_AUTH_TOKEN="<...>" \
-e TWILIO_PHONE_NUMBER="<...>" \
-e RECEIVER_PHONE_NUMBER="<...>" \
-e MIN_MSG_AMMOUNT="<...>" \
-e PERFORM_MESSAGE_TEST="<...>" \
grandmabot:1.0