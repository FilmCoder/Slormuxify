async function toggleTranslator() {
    let isOn = await Store.get(ENUMS.IS_ON);
    await Store.set(ENUMS.IS_ON, !isOn);
    updateHeading();

    // we need to let the slormux_engine content script running on the current
    // tab that it needs to process the webpage
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { processDOM: true })
    });
}

async function updateHeading() {
    let isOn = await Store.get(ENUMS.IS_ON);
    let heading = 'OFF';
    if (isOn) heading = 'ON (Plorgle Plorgle Plorgle!)';
    document.getElementById('heading').textContent = heading;
}

updateHeading();
document.getElementById('toggle-button').addEventListener('click', toggleTranslator);
