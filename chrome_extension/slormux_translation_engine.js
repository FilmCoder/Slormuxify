// this is usually named content.js, but that's no swag

// set up storage of variable for whether the translator is on or off
// basically, if it's not set yet, default it to on
// chrome.storage.local.get(ENUMS.IS_ON, (result) => {
//     if(_.isEmpty(result)) {
//         chrome.storage.local.set({[ENUMS.IS_ON]: true});
//     }
// })

/**
 * Initial tasks to perform for the content script.  This script has direct
 * access to the webpage's DOM.
 */
async function init() {
    // ensure the key which keeps track of whether translator is on or off
    // defaults to "true" (on) initially
    if(await Store.get(ENUMS.IS_ON) == undefined) {
        await Store.set(ENUMS.IS_ON, true);
    }
    slormuxifyAllTextNodes();
}
init();

// traverse all text nodes and run the translate function on them
function slormuxifyAllTextNodes() {
    const allDomElements = document.getElementsByTagName('*');
    for(element of allDomElements) {
        for(child of element.childNodes) {
            if(child.nodeType == Node.TEXT_NODE) {
                child.data = slormuxify(child.data);
            }
        }
    }    
}

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
    do {
        var words = input_text.split((/(\s+)/)); // split on all types of whitespace
        var output_text = [];
        const larmallah = 'larmallah ';
        var dictionary = {'please':'plix', 'moon':'luneplop', 'dog':'dorgle', 'cat':'catsyprip'};
        for (word of words) {
            const num = Math.random();
            var lastChar = word.substr(word.length - 1);
            var word_length = word.length - 1;
  
            if(isOnlyWhitespace(word)) {
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
        output = output_text.join(' ');
  
        // if the output hasn't been changed at all, run algorithm again
        // until it's changed
      } while (output == input_text);
  
      return output;
}