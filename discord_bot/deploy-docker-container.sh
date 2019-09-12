#!/bin/bash

# This can be run inside a repository on a machine with docker installed. It will
# build and run a docker container with a plorgeblot, which will automatically connect
# to discord.

# note: A few commands have "|| true", this prevents them from crashing the entire script
# if they error out. swag. ay.

# need to make sure plorglebot_token is read in
source ~/.bash_profile
echo "plorglebot_token is: ${plorglebot_token}"

npm install 
docker kill plorglebot || true 
docker rm plorglebot || true

echo "clean up any dangling images.  it makes a new image on each build so we need to clean these"
echo "up, otherwise we'll run out of server space"
docker image prune --force

echo "build new image for plorglebot"
docker build -t plorglebot --build-arg plorglebot_token=${plorglebot_token} -f ./Dockerfile ..

echo "run that bad boy huh"
docker run -d --name plorglebot plorglebot:latest