// slormux_engine.js is the content script that runs immediately when you visit
// a webpage on Chrome.  It converts all text on the page into Slormux.

init();

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

    // can slormuxify new nodes on the fly
    dynamicEngine = new DynamicEngine();

    // only slormuxify the page if engine is currently on
    if(await Store.get(ENUMS.IS_ON)) {
        slormuxifyAllTextNodes();
        dynamicEngine.start();
    }

    // listen for message from popup ui to turn engine on or off
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if(request.isEngineOn) {
                slormuxifyAllTextNodes();
                dynamicEngine.start();
            } 
            else if(request.isEngineOn == false) {
                deSlormuxifyAllTextNodes();
                dynamicEngine.stop();
            }
        }
    );
}

function slormuxifyNode(node) {
    // don't slormuxify if already slormuxified
    if(node.is_slormuxified == true) return;

    node.preslormuxify_data = node.data;
    node.data = slormuxify(node.data);
    node.is_slormuxified = true;
}

function deSlormuxifyNode(node) {
    if(node.is_slormuxified) {
        node.data = node.preslormuxify_data;
        node.is_slormuxified = false;
    }
}

async function slormuxifyAllTextNodes() {
    forTextNodesIn(document, node => {
        slormuxifyNode(node);
    })
}

async function deSlormuxifyAllTextNodes() {
    forTextNodesIn(document, node => {
        deSlormuxifyNode(node);
    })
}

/**
 * Applys 'func' on all text nodes under rootNode
 * @param rootNode Node from which to search for Text nodes
 */
function forTextNodesIn(rootNode, func) {
    const allDomElements = rootNode.getElementsByTagName('*');
    for(element of allDomElements) {
        for(child of element.childNodes) {
            if(child.nodeType == Node.TEXT_NODE) {
                func(child);
            }
        }
    }
}

/**
 * Handles dynamic slormuxification of nodes as they appear, for instance on scrolling feeds
 * like facebook where new text nodes are created on the fly.
 */
class DynamicEngine {
    constructor() {
        this.config = { childList: true, subtree: true };
        this.observer = new MutationObserver(this.callback);
    }

    start() {
        this.observer.observe(document, this.config);
    }

    stop() {
        this.observer.disconnect();
    }

    // Callback function to execute when mutations are observed
    callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for(let node of mutation.addedNodes) {
                    forTextNodesIn(node, textNode => {
                        slormuxifyNode(textNode);
                    });
                }
            }
        }
    };
}