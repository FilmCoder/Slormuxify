os = require('os');

/**
 * Returns true if any strings in array are in "string"
 * @param {String} string 
 * @param {Array} array 
 */
exports.hasAny = function(string, array) {
    return array.some(elem => {
        return string.includes(elem);
    })
}

/**
 * Returns the the parts of the string after the n'th space (1st space is 0, 2nd 1, etc...)
 * @param {*} n Return rest of string after space n
 * @param {*} string Input string
 * @example
 *   afterSpaceN(1, 'one two three four') => 'three four'
 */
exports.afterSpaceN = function(n, string) {
    let occurence = -1;
    for(let i=0; i < string.length; i++) {
        if(string[i] == ' ') occurence += 1;
        if(occurence == n) return string.slice(i + 1, string.length);
    }
}

exports.Pauser = class {
    constructor() {
        this.paused = false;
    }

    handleMessage(message)  {
        if(message.content.includes('!plorglebot pause')) {
            this.paused = true;
            message.channel.send('I am now paused. Oh nosies.');
            console.log('pausied');
        } else if(message.content.includes('!plorglebot unpause')) {
            this.paused = false;
            message.channel.send('I am now unpaused. Here I come.');
            console.log('unpaused');
        }
    }

    toString() {
        return this.paused ? 'paused' : 'not paused';
    }
}

exports.Info = class {
    constructor(pauser) {
        this.pauser = pauser;
    }

    handleMessage(message) {
        if(message.content.includes('!plorglebot report')) {
            let response = `I AM A Plorglebot, and am ${this.pauser.toString()}, at ${os.hostname()} on ${os.platform()}`;
            message.channel.send(response);
            console.log(response);
        }
    }
}

 