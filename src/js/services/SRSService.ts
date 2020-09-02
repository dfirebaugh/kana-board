import localStorageDriver from "../localStorageDriver";
import kanas from "../kanas_with_images";
import {
    Card_t,
    StorageDriver,
    StorageObj_t, 
    COMFORT_LEVEL, 
    QUEUE_SIZE, 
    HIRAGANA_DECK
 } from "../types";

 const kanaImport: any = kanas;

/**
 * currentQueue is what the user is currently working through
 */
var currentQueue: Array<Card_t> = [];

/**
 * storageObj is WHAT we save into storage
 */
var storageObj: StorageObj_t = {};

/**
 * initialize the localStorageDriver so that we can use it across multiple modules
 */
var storageDriver: StorageDriver = localStorageDriver();

/**
 * currentDeck which deck are we currently working with?
 */
var currentDeck: string;

/**
 * setStorageDriver
 * @param storageDriver 
 */
export function setStorageDriver(newStorageDriver: StorageDriver) {
    storageDriver = newStorageDriver;
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
    initialize();

    return {
        incrementComfortLevel,
        decrementComfortLevel,
        buildQueue,
        getDecks,
        getQueueLength,
        getNext
    }
}

function getQueueLength(): number {
    return currentQueue.length;
}

/**
 * pullFromCards return a certain number of cards from a list of cards
 */
function pullFromCards(howManyLeft: number, listToLookIn: Array<Card_t>): Array<Card_t> {
    return listToLookIn.slice(0, howManyLeft);
}

function buildQueue() {
    if(!currentDeck)
        currentDeck = HIRAGANA_DECK;

    const unfamiliarCards = Object.values(storageObj[currentDeck]).filter(card => card.comfort_level == 0);
    const mediumCards = Object.values(storageObj[currentDeck]).filter(card => card.comfort_level == 1);
    const mostFamiliarCards = Object.values(storageObj[currentDeck]).filter(card => card.comfort_level == 2);

    currentQueue = pullFromCards(QUEUE_SIZE, unfamiliarCards);

    if (currentQueue.length < QUEUE_SIZE){
        currentQueue = currentQueue.concat(pullFromCards(QUEUE_SIZE - currentQueue.length, mediumCards))
    }

    if(currentQueue.length < QUEUE_SIZE) {
        currentQueue = currentQueue.concat(pullFromCards(QUEUE_SIZE - currentQueue.length, mostFamiliarCards))
    }
}

/**
 * initialize
 * set the initial values of the provided decks
 */
function initialize() {
    const existingLocalStorage = getStorageDriver().getStorage();
    if (!existingLocalStorage.hiragana) {
        console.log("init hira:")
        /* initialize the hiragana deck*/
        storageObj[HIRAGANA_DECK] = {};
        Object.keys(kanas).forEach(key => {
            storageObj[HIRAGANA_DECK][key] = {
                keyword:kanaImport[key].kana,
                story: kanaImport[key].romaji,
                mnemonic: kanaImport[key].mnemonic,
                comfort_level: COMFORT_LEVEL.BAD,
                last_reviewed: Date.now()
            };
        })
        currentDeck = HIRAGANA_DECK;
        buildQueue();

        getStorageDriver().updateStorage(storageObj)
        console.log(getStorageDriver().getStorage())
        return;
    }
    
    storageObj = existingLocalStorage;
    getStorageDriver().updateStorage(storageObj)
    buildQueue();
}

/**
 * incrementComfortLevel - increment the weight of a kana in localStorage
 */
function incrementComfortLevel(key: string): void {
    const currentCard = storageObj[currentDeck][key];
    if(currentCard.comfort_level != COMFORT_LEVEL.GOOD) currentCard.comfort_level++;
    getStorageDriver().updateStorage(storageObj);
}

/**
 * decrementComfortLevel - decrement weight of a kana in localStorage
 */
function decrementComfortLevel(key: string) {
    const currentCard = storageObj[currentDeck][key];
    if(currentCard.comfort_level == COMFORT_LEVEL.BAD) currentCard.comfort_level--;
    getStorageDriver().updateStorage(storageObj);
}

/**
 * getNext
 */
function getNext(): Card_t | null {
    return currentQueue.pop() || null;
}

function getDecks(): Array<string> {
    return Object.keys(storageObj)
}

export default SRSService();
