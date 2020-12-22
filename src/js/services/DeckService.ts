import { getStorageDriver } from "./StorageService";
import { Card } from "../Card";
import {
    StorageObj_t,
    Deck_t,
    DELETE,
    Card_t,
    StorageDriver
} from "../types";

export const DeckService = (function deckService(): StorageDriver {
    return {
        update: updateDeck,
        get: getDeck
    }
})()

function getDeck(deckName: string): Deck_t {
    return getStorageDriver().get()[deckName]
}

function updateDeck(deckName: string, cards: Array<Card_t>, operation?: string | null): Deck_t {
    const newDeck: Deck_t = {};
    cards.forEach((card: Card_t) => {
        if (operation == DELETE) {
            console.log("DELETE: ", card)
            const tmpStorageObj = getStorageDriver().get()
            delete tmpStorageObj[deckName][card.hash];

            getStorageDriver().update(tmpStorageObj);
            return getStorageDriver().get();
        }

        const newCard = new Card({
            keyword: card.keyword,
            story: card.story,
            mnemonic: card.mnemonic
        });

        newDeck[newCard.hash] = newCard;
    })

    const storageObj: StorageObj_t = Object.assign(
        {},
        getStorageDriver().get(),
        { [deckName]: Object.assign({}, getStorageDriver().get()[deckName], newDeck) }
    )

    getStorageDriver().update(storageObj);
    return storageObj[deckName];
}

