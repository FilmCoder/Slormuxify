/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const translators = require('../chrome_extension/translators');
utils = require('./utils');

// ensure discord token is defined
const token = process.env.plorglebot_token;
if(!token) {
    console.error('Discord bot token is undefined. Set environment variable ' +
        '"plorglebot_token" with Discord token, then rerun.');
    process.exit(1);
}

// Create an instance of a Discord client
const client = new Discord.Client();
let pauser = new utils.Pauser();
let info = new utils.Info(pauser);

// Create an event listener for messages
client.on('message', message => {
    info.handleMessage(message);
    pauser.handleMessage(message);
    if(pauser.paused) return;

    if(message.author.id != client.user.id) {
        if(utils.hasAny(message.content, ['plorx'])) {
            var slormuxedMessage = translators.slormuxify(message.content);
            message.channel.send(slormuxedMessage);      
        }
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);
