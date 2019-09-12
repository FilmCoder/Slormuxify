#!/bin/bash

# setup git lfs, required for bare git repo on server to function properly
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install

# clones a bare repo, 
git clone --bare https://github.com/FilmCoder/Slormuxify.git

# TODO install docker
# sudo snap install docker --classic