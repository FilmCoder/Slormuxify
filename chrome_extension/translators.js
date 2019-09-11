// translators.js contains actual string manipulation functions to convert 
// English to Slormux

/**
 * Slap a sies or a sles on that bitch son!
 * @param {stringplix} string stringplox
 */
function slormuxify(string) {
    // don't modify if whitespace only plix or a big boi
    if(isOnlyWhitespace(string) || string.length > 5000) return string;

    // actual translate function (let's beast, shall we now?)
    return larmallahOnePointOh(string);
};

/**
 * Initial translate function, created in a frenzied manic state with Nathan in
 * mommy and daddy's basement.
 * @param {string} input_text plox plox!
 */
function larmallahOnePointOh(input_text) {

    // attempt translation 5 times, until output is different from input
    // this is to ensure that at least 1 word was slormuxified
    var out;
    var i = 0;
    do {
        out = translate(input_text);
    } while(out == input_text && i < 5);
    return out;

    function translate(input_text) {
        var words = input_text.split(/(\w+)/); // split on all types of whitespace
        var output_text = [];
        const larmallah = 'larmallah ';
        var dictionary = {'please':'plix', 'moon':'luneplop', 'dog':'dorgle', 'cat':'catsyprip'};
        for (word of words) {
            const num = Math.random();
            var lastChar = word.substr(word.length - 1);
            var word_length = word.length - 1;
    
            if(isOnlyWhitespace(word) || isOnlyPunctuation(word)) {
                // chill out, don't slap a sies on nothin feel me shawdee?
            }
            else if (word in dictionary) {
                word = dictionary[word];
            }
            else if (lastChar == '.' && num > 0.75) {
                if (num > 0.95) {
                    word = word.concat(' Swag swag!');
                }
                else if (num > 0.9) {
                    word = word.concat(' Plix.');
                }
                else {
                    word = word.concat(' Swag.');
                }
            }
            else if (num > 0.97) {
                word = larmallah.concat(word).concat('bar');
            }
            else if (num > 0.92) {
                word = word.concat('bles');
            }
            else if (num > 0.87) {
                word = word.concat('zorz');
            }
            else if (num > 0.82) {
                word = word.concat('sles');
            }
            else if (num > 0.77) {
                word = word.concat('sies');
            }
    
            if (word.charAt(word_length) == ',') {
                word = word.replace(',','');
                word = word.concat(',');
            }
            output_text.push(word);
        }    
        return output_text.join('');
    }  
}

function isOnlyWhitespace(string) {
    return string.trim().length == 0;
}

function isOnlyPunctuation(string) {
     return !/\w+/.test(string);
}

module.exports = {
    slormuxify: slormuxify,
}