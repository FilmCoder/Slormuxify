/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const translators = require('../chrome_extension/translators');
const utils = require('./utils');
const axios = require('axios');

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

    if(message.author.id != client.user.id && message.content[0] != '!') {
        // if you type a message with 'plorx' return what you said slormuxified
        if(utils.hasAny(message.content, ['plorx'])) {
            var slormuxedMessage = translators.slormuxify(message.content);
            message.channel.send(slormuxedMessage);      
        }
        // if you mentioned plorglebot by name, have him send a deep quote
        else if(utils.hasAny(message.content.toLowerCase(), ['plorglebot'])) {
            axios.get('https://api.quotable.io/random').then(resp => {
                let quote = resp.data.content;
                let author = resp.data.author;
                message.channel.send(translators.slormuxify(`"${quote}" - ${author}`))
            })
        }
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);
