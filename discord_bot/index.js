/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');
const secret_config = require('./secret_config');
const translators = require('../chrome_extension/translators')

const token = secret_config.token;

// Create an instance of a Discord client
const client = new Discord.Client();

// Create an event listener for messages
client.on('message', message => {
    if(message.author.id != client.user.id) {
        message.channel.send(translators.slormuxify(message.content));
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);