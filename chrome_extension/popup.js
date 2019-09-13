async function toggleTranslator() {
    let isOn = await Store.get(ENUMS.IS_ON);
    await Store.set(ENUMS.IS_ON, !isOn);
    updateHeading();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { isEngineOn: !isOn })
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