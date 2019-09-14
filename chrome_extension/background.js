// when a new tab is clicked on and becomes active, the slormux_engine content script
// needs to know to process that page
chrome.tabs.onActivated.addListener(info => {
    chrome.tabs.sendMessage(info.tabId, { processDOM: true })
})