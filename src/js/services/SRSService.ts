import localStorageDriver from "../localStorageDriver";
import kanas from "../kanas_with_images";

// const QUEUE_SIZE = 20;

interface StorageDriver {
    updateStorage: Function,
    getStorage: Function
}

/**
 * initialize the localStorageDriver so that we can use it across multiple modules
 */
var storageDriver: StorageDriver = localStorageDriver();


/**
 * kanaQueues is what we actually store in the browsers localStorage
 */
var kanaQueues = {
    current: 0,
    0: [],
    1: [],
    2: []
}


/**
 * setStorageDriver
 * @param storageDriver 
 */
export function setStorageDriver(newStorageDriver: StorageDriver) {
    storageDriver = newStorageDriver;
    console.log(storageDriver)
}

/**
 * getStorageDriver
 * conditionally returns a storageDriver so that we can test without using local storage
 */
function getStorageDriver(): StorageDriver {
    return storageDriver;
}

/**
 * SRSService
 * We have 3 different buckets (Weak, Medium, Strong)
 * Each item will also have a date of last review attached.
 * 
 * When we request a new queue, we will return $QUEUE_SIZE items prioritizing the weakest first
 *  then the one's that we haven't reviewed in a while
 */
function SRSService() {
    initializekanaQueues();

    return {
        incrementKanaWeight,
        decrementKanaWeight,
        getKanaWeight,
        getNext
    }
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

    getStorageDriver().updateStorage(kanaQueues)
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
    const existingLocalStorage = getStorageDriver().getStorage();

    if (!existingLocalStorage) {
        Object.keys(kanas).forEach(key => {
            kanaQueues[0].push(key);
        });

        getStorageDriver().updateStorage(kanaQueues)

        console.log(getStorageDriver().getStorage())
        return;
    }

    kanaQueues = existingLocalStorage;
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
    getStorageDriver().updateStorage(kanaQueues);
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
    getStorageDriver().updateStorage(kanaQueues);
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



export default SRSService();
