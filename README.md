Slormuxify
==========
"Hey man, what's up?" -> "Hizorz, bb, what's ploxin?" - Chrome extension to Slormuxify all text on your browser, on the fly.

CURRENT NEWS
---------------------
* UPDATE SEP 26 2019: no one has stepped up to help me so this project is now dormant.
* submitted to *chrome store*, we've been accepted! We LIVE BAYBE: https://chrome.google.com/webstore/search/slormuxify
* core functionality of discord bot complete, discord bot live on bentscrew and website complete, which can be found here: https://filmcoder.github.io/Slormuxify/
* CURRENTLY LOOKING FOR HELP: we need to improve the discord bot.  more things it can do.  better translation.  more clever.  i'm a little burnt out for now so i'll be stepping back but if someone would like to contribute that would be much appreciated.  thus far it's been 100% me solo.  below are instructions to get the chrome extension and discord bot running.

Get the Extension Running in Chrome
-----------------------------------
1. Install git-lfs: https://git-lfs.github.com/
2. Run `git lfs install` on your terminal
3. Clone repository: `git clone https://github.com/FilmCoder/Slormuxify.git`
4. Open Chrome and go to `chrome://extensions/`
5. In Chrome, toggle "Developer Mode" in the upper right, then click "Load unpacked" button in the upper left.
6. Open "Slormuxify/chrome_extension"
7. Navigate to a web page and experience the sworgles.

Chrome Extension Developmentzorz Tipsies
---------------------------
* Everytime changes are made in the code, at `chrome://extensions/` click the refresh symbol on the Slormuxify extension box.  Then go to a page where you're running the extension, refresh, and you should see your changes.
* Just take an unassigned issue, and assign it to yourself.  Branch off of master, do the issue on your feature branch, then submit a pull request to merge into master. You can @ me (FilmCoder) and I'll make sure to get your changes in asap.

Discord Bot (PlorgleBot) development workflow
---------------------------------------------
1. Type "!plorglebot report" on discord in private chat to get the status of all running plorglebots
2. There's probably a plorglebot running on linux, you want to pause that one so you can run your own locally and it doesn't conflict with the one on the server.  On discord private chat type "!plorglebot pause". You can unpause it later with "!plorglebot unpause"
3. Install VSCode
4. cd into "discord_bot"
5. On terminal: "npm run start-server" OR press F5 to start debugging when you're in index_plorgle.js
6. You can set breakpoints, and poke around to look at variables and whatnot.  When you run it from your local machine it will automatically connect to the discord server and be live.  Make changes, restart it, test in discord, rinse and repeat.

Deploying Changes to Digital Ocean Droplet
------------------------------------------
1. The digital ocean droplet is where our live discord bot runs when no one is actively developing
2. In discord_bot folder, run "bash setup_local_dev_env.sh".  This will set up a git remote for ocean.
3. Then run "git push ocean master" OR "npm run push-to-ocean". This will push your changes to the bare git repo on the droplet, triggering a fresh docker image to be built and run with a new plorglebot (the deploy-docker-container.sh file will be run on the remote server automatically when you push to ocean).
4. To ssh into the server to poke around or fix issues on it, run "npm run ssh-to-ocean".
5. Note: To push or ssh to ocean, you'll need ssh keys set up on it.  Message me, i'll setup the keys for you.
