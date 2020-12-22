import kanas from "../kanas_with_images";
import { Card } from "../Card";
import { getStorageDriver } from "./StorageService";
import {
    Card_t,
    StorageObj_t,
    COMFORT_LEVEL,
    QUEUE_SIZE,
    HIRAGANA_DECK_NAME
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
 * currentDeck which deck are we currently working with?
 */
var currentDeck: string;


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
        getNext,
        getCounts,
        setCurrentDeck
    }
}

function setCurrentDeck(deckName: string): string {
    currentDeck = deckName;
    return currentDeck;
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

export interface DeckComfortCounts {
    total: number,
    bad: number,
    medium: number,
    good: number
}

function getCounts(): DeckComfortCounts {
    return {
        total: Object.keys(storageObj[currentDeck]).length,
        bad: getLeastFamiliar().length,
        medium: getMediumFamiliar().length,
        good: getMostFamiliar().length
    }
}

function getLeastFamiliar(): Array<Card_t> {
    return Object.values(storageObj[currentDeck])
        .sort((a, b) => a.last_reviewed - b.last_reviewed)
        .filter(card => card.comfort_level == COMFORT_LEVEL.BAD);
}

function getMediumFamiliar(): Array<Card_t> {
    return Object.values(storageObj[currentDeck])
        .sort((a, b) => a.last_reviewed - b.last_reviewed)
        .filter(card => card.comfort_level == COMFORT_LEVEL.MEDIUM);
}

function getMostFamiliar(): Array<Card_t> {
    return Object.values(storageObj[currentDeck])
        .sort((a, b) => a.last_reviewed - b.last_reviewed)
        .filter(card => card.comfort_level == COMFORT_LEVEL.GOOD);
}

function buildQueue(): void {
    if (!currentDeck)
        currentDeck = HIRAGANA_DECK_NAME;

    const unfamiliarCards: Card_t[] = getLeastFamiliar();
    const mediumCards: Card_t[] = getMediumFamiliar();
    const mostFamiliarCards: Card_t[] = getMostFamiliar();

    currentQueue = pullFromCards(QUEUE_SIZE, unfamiliarCards);

    if (currentQueue.length <= QUEUE_SIZE) {
        currentQueue = currentQueue.concat(pullFromCards(QUEUE_SIZE - currentQueue.length, mediumCards))
    }

    if (currentQueue.length <= QUEUE_SIZE) {
        currentQueue = currentQueue.concat(pullFromCards(QUEUE_SIZE - currentQueue.length, mostFamiliarCards))
    }
}

/**
 * initialize
 * set the initial values of the provided decks
 */
function initialize() {
    const existingLocalStorage = getStorageDriver().get();
    if (!existingLocalStorage.hiragana) {
        /* initialize the hiragana deck*/
        storageObj[HIRAGANA_DECK_NAME] = {};
        Object.keys(kanas).forEach(key => {
            const newCard = new Card({
                keyword: kanaImport[key].romaji,
                story: kanaImport[key].kana,
                mnemonic: kanaImport[key].mnemonic
            });
            storageObj[HIRAGANA_DECK_NAME][newCard.hash] = newCard;
        })
        currentDeck = HIRAGANA_DECK_NAME;
        buildQueue();

        getStorageDriver().update(storageObj)
        return;
    }

    storageObj = existingLocalStorage;
    getStorageDriver().update(storageObj)
    buildQueue();
}

/**
 * incrementComfortLevel - increment the weight of a kana in localStorage
 */
function incrementComfortLevel(hash: string): void {
    const currentCard = storageObj[currentDeck][hash];
    currentCard.last_reviewed = Date.now();
    if (currentCard.comfort_level != COMFORT_LEVEL.GOOD) currentCard.comfort_level++;
    getStorageDriver().update(storageObj);
}

/**
 * decrementComfortLevel - decrement weight of a kana in localStorage
 */
function decrementComfortLevel(hash: string) {
    const currentCard = storageObj[currentDeck][hash];
    currentCard.last_reviewed = Date.now();
    if (currentCard.comfort_level != COMFORT_LEVEL.BAD) currentCard.comfort_level--;
    getStorageDriver().update(storageObj);
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
