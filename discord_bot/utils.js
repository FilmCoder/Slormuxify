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

 