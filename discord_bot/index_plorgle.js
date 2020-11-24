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

let BENTSCREW_GUILD;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    BENTSCREW_GUILD = client.guilds.find(guild => guild.name == 'Bentscrew');
    console.log('Done initializing.');
});  

// Create an event listener for messages
client.on('message', message => {
    try {
        // plorgebot should not respond to its own messages, would create infinite loop
        if(message.author.id == client.user.id) return;

        info.handleMessage(message);
        pauser.handleMessage(message);
        if(pauser.paused) return;

        // command in format "!send CHANNEL_NAME here is a message i'm typing"
        const send_command = '!send';
        if(message.content.id != client.user.id && message.content.startsWith(send_command)) {
            const msg = utils.afterSpaceN(1, message.content);
            const target_channel_name = message.content.split(' ')[1];
            const target_channel = BENTSCREW_GUILD.channels.find(channel => channel.name == target_channel_name);
            if(!target_channel) {
                message.channel.send(`Ohnoblorssss!  Channel ${target_channel_name} does not exist. Get plorgd on.`);
                return;
            }
            target_channel.send(msg)
        }

        if(message.content[0] != '!') {
            // if you type a message with 'plorx' return what you said slormuxified
            if(utils.hasAny(message.content, ['plorx'])) {
                var slormuxedMessage = translators.slormuxify(message.content);
                message.channel.send(slormuxedMessage);      
            }
            else if(utils.hasAny(message.content, ['funny joke'])) {
                message.channel.send("You are gay.");
                message.channel.send("Funny joke!");      
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
    }
    catch (err) {
        console.error('server error caught: ', err)
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(token);
