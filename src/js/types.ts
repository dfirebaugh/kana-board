export const LOCAL_STORAGE_NAME = "kanaBoard";
export const DECK_SELCTION = 0;
export const HIRAGANA_SINGLE = 1
export const HIRAGANA_BOARD = 2;
export const KATAKANA_BOARD = 3;
export const QUEUE_SIZE = 20;
export const NOT_IMPLEMENTED = -1;

export enum COMFORT_LEVEL {
    BAD,
    MEDIUM,
    GOOD
}

export const HIRAGANA_DECK = "hiragana";
export const KATAKANA_DECK = "katakana";


export interface StorageDriver {
    updateStorage: Function,
    getStorage: Function
}

export interface Card_t {
    keyword: string,
    story: string,
    mnemonic: string,
    /**
     * comfort_level -- how well do we know this specific card
     */
    comfort_level: COMFORT_LEVEL,
    /**
     * last_reviewed is a number because we are using the Date.now() method
     */
    last_reviewed: number
}

/**
 * Deck_t
 * a bunch of cards to review
 */
export interface Deck_t {
    [cardName: string]: Card_t,
}

/**
 * StorageObj_t is a collection of decks and it's what 
 * we actually put in the localStorage
 */
export interface StorageObj_t {
    [deck: string]: Deck_t
}
