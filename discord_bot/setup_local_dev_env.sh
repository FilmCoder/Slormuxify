#!/bin/bash

# add git remote for the digital ocean server, can then do:
#   > git push ocean master
# to push to the remote, trigggering a new build and deploy for the discord bot
git remote add ocean root@159.65.216.106:Slormuxify.git
