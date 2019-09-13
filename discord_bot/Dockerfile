# expects a context at the root level of the Slormuxify repo.

FROM node:slim

# we need to pass in plorgletoken to the docker container as an environment variable,
ARG plorglebot_token
ENV plorglebot_token=$plorglebot_token

# setup image
RUN mkdir /app
COPY . /app
WORKDIR /app/discord_bot
RUN npm install
CMD npm run start-server
