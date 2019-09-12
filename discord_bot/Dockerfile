# expects a context at the root level of the Slormuxify repo.

FROM node:slim
ARG plorglebot_token
ENV plorglebot_token=$plorglebot_token

RUN mkdir /app
COPY . /app
WORKDIR /app/discord_bot
RUN npm install
CMD npm run start-server
