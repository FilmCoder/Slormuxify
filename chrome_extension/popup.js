async function toggleTranslator() {
    let isOn = await Store.get(ENUMS.IS_ON);
    await Store.set(ENUMS.IS_ON, !isOn);
    updateHeading();
}

async function updateHeading() {
    let isOn = await Store.get(ENUMS.IS_ON);
    let heading = 'Translation Engine Off';
    if(isOn) heading = 'Plorgle Plorgle Plorgle!';
    document.getElementById('heading').textContent = heading;
}

updateHeading();
document.getElementById('toggle-button').addEventListener('click', toggleTranslator);