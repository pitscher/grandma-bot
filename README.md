# Grandma Bot

Grandma Bot is written in JavaScript/NodeJS and can send a randomly chosen message specified in a TXT file and send it as an SMS via the Twilio API.

## Prerequisites

- Active [Twilio Account][twilio-account]

- NodeJS/npm installed on the machine you want to use

## Setup

You can run the Grandma Bot in many configurations:

- Natively

- Inside a Docker container

- On a Kubernetes Cluster

- As a Cloud Function (like Azure Functions)

### Needed variables

| Variable               | Description                                                                                   	  | Default |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| TWILIO_ACCOUNT_SID     | The SID of your Twilio account, check the Twilio Dashboard.                                 	 	  | -       |
| TWILIO_AUTH_TOKEN      | The Auth Token of your Twilio account, check the Twilio Dashboard.                            	  | -       |
| TWILIO_PHONE_NUMBER    | The phone number your messages will be send from, check the Twilio Dashboard.                 	  | -       |
| RECEIVER_PHONE_NUMBER  | The phone number which will receive your messages.                                            	  | -       |
| MIN_MSG_AMMOUNT        | Minimum ammount of messages in `messages.txt`, more are better for the random selection.      	  | -       |
| PERFORM_MESSAGE_TEST   | Test if messages in `messages.txt` are appropriate to be sent as SMS by settting this var to true. | false   |

### Natively

Follow the steps below to setup the project to run natively on your computer.

1. Get the project's code by running `git clone https://github.com/pitscher/grandma-bot.git`

2. Inside the project's directory run `npm install`

3. Create a new file `.env` with the following content and fill in your data:
   See chapter "Needed variables" for further reference.

   ```.env

   TWILIO_ACCOUNT_SID=<yourValueHere>
   TWILIO_AUTH_TOKEN=<...>
   TWILIO_PHONE_NUMBER=<...>
   RECEIVER_PHONE_NUMBER=<...>
   MIN_MSG_AMMOUNT=<...>
   PERFORM_MESSAGE_TEST=<...>

   ```

4. Fill the `messages.txt` with your messages you want to send via SMS. One message per line. Empty lines are not permitted.
  Keep in mind that each message should be <159 characters to avoid splitting and multiple billing.

5. If you filled the `messages.txt` you can check if your input is valid by setting `PERFORM_MESSAGE_TEST=true` and starting the tool.

6. Start the tool with `npm start`

7. The bot is running and will tell you what is happening via the command line. Messages normally take a few seconds to be processed by Twilio. You're done.

### Docker container

Follow the steps below to setup the project to run inside a Docker container.

1. Make sure Docker is installed on your machine and you've setup permissions correctly. Take a look at this nice [guide by the DigitalOcean community][do-docker-guide] to setup Docker on a Linux server.

2. Get the project's code by running `git clone https://github.com/pitscher/grandma-bot.git`

3. Inside the project's directory run `docker build -t grandmabot:1.0 .`. Docker will use the projects Dockerfile and build an image.

4. You have to provide all needed variables for the bot to function properly. You can use the `docker-start.sh` script from the repo to run the bot once. Fill in the values for the required variables before running the script.

5. Run the bash script `./docker-start.sh`. The script takes care of executing the correct docker commands for you. You're done.

### Kubernetes

Follow the steps below to setup the project to run as a cron job on a Kubernetes cluster.

1. Make sure you build an image of grandmabot and push it as a public image at [DockerHub][dockerhub]. The already mentioned [guide by the DigitalOcean community][do-docker-guide] is very useful if you've never done this before.

2. Check the included k8s manifests inside the `kubernetes` directory. You must setup your DockerHub user and image name at `image:` in the `cronjob.yaml` file.

3. Apply the manifest `kubectl apply -f cronjob.yaml`. You're done.

### Azure Function

Comming soon.

[twilio-account]: https://www.twilio.com/try-twilio
[do-docker-guide]: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
[dockerhub]: https://hub.docker.com/
