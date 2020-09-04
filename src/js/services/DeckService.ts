import { getStorageDriver } from "./StorageService";
import Card from "../Card";
import {
    StorageObj_t,
    Deck_t,
    DELETE
} from "../types";

function deckService() {
    return {
        updateDeck,
        getDeck
    }
}

function getDeck(deckName: string): Deck_t {
    return getStorageDriver().getStorage()[deckName]
}

function updateDeck(deckName: string, cards: Array<any>, operation?: string | null): Deck_t {
    const newDeck: Deck_t = {};
    cards.forEach(card => {
        if (operation == DELETE) {
            console.log("DELTE: ", card)
            const tmpStorageObj = getStorageDriver().getStorage()
            delete tmpStorageObj[deckName][card.hash];

            getStorageDriver().updateStorage(tmpStorageObj);
            return getStorageDriver().getStorage();
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
        getStorageDriver().getStorage(),
        { [deckName]: Object.assign({}, getStorageDriver().getStorage()[deckName], newDeck) }
    )

    getStorageDriver().updateStorage(storageObj);
    return storageObj[deckName];
}

export default deckService();
