function toggleTranslator() {
    chrome.storage.local.get(STORAGE_KEYS.IS_ON, result => {
        let isTranslatorOn = result[STORAGE_KEYS.IS_ON]; // extract result
        chrome.storage.local.set({[STORAGE_KEYS.IS_ON]: !isTranslatorOn}); // toggle in storage
        isTranslatorOn = !isTranslatorOn; // has now been toggled in storage

        let heading = 'Translation Engine Off';
        if(isTranslatorOn) heading = 'Plorgle Plorgle Plorgle!';
        document.getElementById('heading').textContent = heading;
    })
}

document.getElementById('toggle-button').addEventListener('click', toggleTranslator);