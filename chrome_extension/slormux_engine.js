// slormux_engine.js is the content script that runs immediately when you visit
// a webpage on Chrome.  It converts all text on the page into Slormux.

/**
 * Initial tasks to perform for the content script.  This script has direct
 * access to the webpage's DOM.
 */
async function init() {
    // ensure the key which keeps track of whether translator is on or off
    // defaults to "true" (on) initially
    if(!await Store.has(ENUMS.IS_ON)) {
        await Store.set(ENUMS.IS_ON, true);
    }

    // only slormuxify the page if engine is currently on
    if(await Store.get(ENUMS.IS_ON)) {
        slormuxifyAllTextNodes();
    }
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