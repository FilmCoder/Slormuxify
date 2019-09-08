async function toggleTranslator() {
    let isOn = await Store.get(ENUMS.IS_ON);
    isOn = await Store.set(ENUMS.IS_ON, !isOn);

    let heading = 'Translation Engine Off';
    if(isOn) heading = 'Plorgle Plorgle Plorgle!';
    document.getElementById('heading').textContent = heading;
}

document.getElementById('toggle-button').addEventListener('click', toggleTranslator);