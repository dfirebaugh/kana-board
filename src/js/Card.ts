import { COMFORT_LEVEL } from "./types";
import { hash } from "./util";

class Card {
    hash: string = "";
    keyword: string = "";
    story: string = "";
    mnemonic: string = "";
    /**
     * comfort_level -- how well do we know this specific card
     */
    comfort_level: COMFORT_LEVEL = COMFORT_LEVEL.BAD;
    /**
     * last_reviewed is a number because we are using the Date.now() method
     */
    last_reviewed: number = Date.now();
    constructor(cardProps: { keyword: string, story: string, mnemonic: string }) {
        this.hash = String(hash(cardProps.keyword + cardProps.story + cardProps.mnemonic))
        this.keyword = cardProps.keyword;
        this.story = cardProps.story;
        this.mnemonic = cardProps.mnemonic
    }
}

export default Card;