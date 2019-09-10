const ENUMS = {
    IS_ON: "IS_ON",
}

/**
 * Conventient promise-based utility for working with Chrome local storage.
 */
class Store {
    /**
     * Gets a promise resolving the value from Chrome local storage by key.
     * @example
     *  // returns the value associated with the key 'myKey'
     *  Store.get('myKey').then(value => {
     *      console.log('value of myKey in chrome local storage: ' + value);
     *  };
     * 
     * @example
     *  // you can also use async/await for cleaner code 
     *  async function doSomeStuff() {
     *      let val = await Store.get('whoDatGril);
     *      console.log('Le gril is: ' + val)
     *  }
     */
    static get = key => {
        return new Promise(resolve => {
            chrome.storage.local.get(key, result => {
                if(_.isEmpty(result)) resolve(undefined);
                resolve(result[key]);
            })
        })
    }

    /**
     * Returns a promise resolving once the supplied key-value is set in Chrome local storage
     * @example
     *  Store.set({leGril: 'Momo'}).then(() => console.log('finished storing value'))
     * 
     * @example
     *  let value = await Store.set({swag: 'over9000'});
     * 
     * @returns the value that was set
     */
    static set = (key, val) => {
        return new Promise(resolve => {
            chrome.storage.local.set({[key]: val}, () => {
                resolve(val);
            })
        })
    }

    // Return true if key exists, false if not present.
    static has = key => {
        return new Promise(resolve => {
            chrome.storage.local.get(key, val => {
                resolve(!_.isEmpty(val));
            })
        })
    }
}

// placeholder test
// TODO: remove
// var isOn = new Promise(resolve => {
//     chrome.storage.local.get(STORAGE_KEYS.IS_ON, result => {
//         resolve(result[STORAGE_KEYS.IS_ON]);
//     })
// });