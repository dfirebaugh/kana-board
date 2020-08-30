/**
 * service that will allow us to store and retrieve from localStorage
 */
function LocalStorageDriver(kanas) {
    /**
     * kanaQueues is what we actually store in the browsers localStorage
     */
    var kanaQueues = {
        current: 0,
        0: [],
        1: [],
        2: []
    }

    initializekanaQueues();

    return {
        incrementKanaWeight,
        decrementKanaWeight,
        getKanaWeight,
        getNext
    }

    /**
     * next
     * - returns kanakeys with the lowest weight more often
     * - shifts the queue and pushed the current kanaKey to the end of the queue
     * @returns a kanaKey
     */
    function next() {
        const currentKana = kanaQueues[0][0];
        const currentWeight = getCurrentWeight();

        kanaQueues[currentWeight].shift();
        kanaQueues[currentWeight].push(currentKana);
        
        kanaQueues.current++;

        updateLocalStorage(kanaQueues)
        return kanaQueues[currentWeight][0];
    }

    function getCurrentWeight() {
        /* handle the case that we have zero kanas in both 0 and 1 weights */
        if (kanaQueues[0].length == 0 && kanaQueues[1].length == 0) {
            return 2;
        }

        /* handle the case that we have zero kanas in the 0 weight */
        if (kanaQueues[0].length == 0) {
            return 1;
        }

        return 0;
    }

    /**
     * initializekanaQueues
     * set the initial values of the kanaQueues all to zero
     */
    function initializekanaQueues() {
        const existingLocalStorage = getLocalStorage();

        if (!existingLocalStorage) {
            Object.keys(kanas).forEach(key => {
                kanaQueues[0].push(key);
            });

            updateLocalStorage(kanaQueues)
            return;
        }

        kanaQueues = existingLocalStorage;
    }

    /**
     * setLocalStorage - update our stored kana weights
     * @param {Object} newObj 
     */
    function updateLocalStorage(newObj) {
        localStorage.setItem("kanaQueues", JSON.stringify(newObj))
    }

    /**
     * getLocalStorage
     * @returns {Object} - returns 
     */
    function getLocalStorage() {
        return JSON.parse(localStorage.getItem("kanaQueues"));
    }

    /**
     * getKanaWeight - return the weight of a specific kana
     */
    function getKanaWeight() {
        return getCurrentWeight();
    }

    /**
     * incrementKanaWeight - increment the weight of a kana in localStorage
     */
    function incrementKanaWeight() {
        const currentWeight = getCurrentWeight();

        if (currentWeight == 2) return;

        const currentKana = kanaQueues[currentWeight][0];
        kanaQueues[currentWeight].shift();
        kanaQueues[currentWeight + 1].push(currentKana);
        updateLocalStorage(kanaQueues);
    }

    /**
     * decrementKanaWeight - decrement weight of a kana in localStorage
     */
    function decrementKanaWeight() {
        const currentWeight = getCurrentWeight();

        if (currentWeight == 0) return;

        const currentKana = kanaQueues[currentWeight][0];
        kanaQueues[currentWeight].shift();
        kanaQueues[currentWeight - 1].push(currentKana);
        updateLocalStorage(kanaQueues);
    }

    /**
     * getNext
     * @returns {String} - returns a romaji string that will be used as the key of the next kana card
     */
    function getNext() {
        const nextKana = kanas[next()];

        return nextKana
        // return Object.keys(kanas)[Math.floor(Math.random() * Object.keys(kanas).length)]
    }
}

export default LocalStorageDriver;
