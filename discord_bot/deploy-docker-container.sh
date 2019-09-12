#!/bin/bash

# This can be run inside a repository on a machine with docker installed. It will
# build and run a docker container with a plorgeblot, which will automatically connect
# to discord.

# note: A few commands have "|| true", this prevents them from crashing the entire script
# if they error out.

npm install 
docker kill plorglebot || true 
docker rm plorglebot || true
docker build -t plorglebot --build-arg plorglebot_token=${plorglebot_token} -f ./Dockerfile ..
docker run -d --name plorglebot plorglebot:latest