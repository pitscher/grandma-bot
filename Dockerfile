FROM node:12.17.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

#Not install devDependencies
RUN npm install --production

ENV NODE_ENV="production"

# Start the app
CMD npm start