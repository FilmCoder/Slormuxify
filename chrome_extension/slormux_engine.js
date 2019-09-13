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
        await slormuxifyAllTextNodes();
    }

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if(request.isEngineOn) {
                console.log('slormux engine is turning ON');
                slormuxifyAllTextNodes()
            } 
            else if(request.isEngineOn == false) {
                console.log('slormux engine is turning OFF')
                deSlormuxifyAllTextNodes()
            }
        }
    );
}
init();

async function slormuxifyAllTextNodes() {
    await forAllTextNodes((node) => {
        node.preslormuxify_data = node.data;
        node.data = slormuxify(node.data);
    })
}

async function deSlormuxifyAllTextNodes() {
    await forAllTextNodes((node) => {
        node.data = node.preslormuxify_data;
    })
}

/**
 * Returns promise that will execute 'func' on all text nodes on the web page.
 */
function forAllTextNodes(func) {
    return new Promise(resolve => {
        const allDomElements = document.getElementsByTagName('*');
        for(element of allDomElements) {
            for(child of element.childNodes) {
                if(child.nodeType == Node.TEXT_NODE) {
                    func(child);
                }
            }
        }
        resolve();
    })
}