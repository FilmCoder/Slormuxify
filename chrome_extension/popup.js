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

// TODO: new way with convenience wrappers, not yet tested
// async function toggleTranslator() {
//     let isOn = await Store.get(STORAGE_KEYS.IS_ON);
//     await Store.set(STORAGE_KEYS.IS_ON, !isOn);
//     isOn = !isOn; // has now been toggled in storage

//     let heading = 'Translation Engine Off';
//     if(isOn) heading = 'Plorgle Plorgle Plorgle!';
//     document.getElementById('heading').textContent = heading;
// }

document.getElementById('toggle-button').addEventListener('click', toggleTranslator);