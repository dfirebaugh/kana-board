export const LOCAL_STORAGE_NAME = "kanaBoard";
export const QUEUE_SIZE = 20;
export const DELETE = "DELETE";

export enum APP_MODES {
    NOT_IMPLEMENTED = -1,
    DECK_SELCTION,
    DECK_REVIEW,
    HIRAGANA_BOARD,
    KATAKANA_BOARD,
    CREATE_DECK,
    EDIT_DECK
}

export enum COMFORT_LEVEL {
    BAD,
    MEDIUM,
    GOOD
}

export const HIRAGANA_DECK_NAME = "hiragana";
export const KATAKANA_DECK_NAME = "katakana";

/**
 * StorageDriver contains operations to interact with storage
 */
export interface StorageDriver {
    update: Function,
    get: Function
}

export interface Card_t {
    hash: string,
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
