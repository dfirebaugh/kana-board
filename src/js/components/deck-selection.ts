import { LitElement, html, css } from "lit-element";
import KanaState from "../services/KanaState";
import SRSService from "../services/SRSService";
import { APP_MODES } from "../types";
import { noSelect } from "../../themes/no-select";

class DeckSelection extends LitElement {
    decks: Array<string> = SRSService.getDecks();
    static get styles() {
        return [
            noSelect,
            css`
            group-container {
                display: grid;
                grid-template-columns: 1fr auto;
                grid-gap: 1vw;
                width: 80%;
            }

            character-card {
                width: 100%;
            }

            deck-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }

            container {
                width: 100%;
                box-shadow: 2px 2px 39px -23px;
                background-color: aliceblue;
                display: inline-block;
                align-content: end;
                margin-bottom: 4vh;
                width: 80%;
            }

            container:hover {
                background-color: black;
                opacity: .8;
                color: white;
                cursor: pointer;
            }

            h1 {
                text-align: center;
                font-size: 3rem;
            }

            group-container container {
                width: 100%;
            }

            .edit-button {
                display: flex;
                align-items: center;
                text-align: center;
            }
        `];
    }

    firstUpdated() {
        this.decks = SRSService.getDecks()
    }

    handleDeckClick(clickEvent: Event, deckName: string | null, appMode?: APP_MODES | null) {

        const event = new CustomEvent('deck-select', {
            detail: "Single"
        });

        if (appMode === APP_MODES.EDIT_DECK) {
            KanaState.update({
                currentDeck: deckName
            })
        }

        if (appMode === APP_MODES.DECK_REVIEW) {
            KanaState.update({
                curentDeck: deckName,
                appMode: APP_MODES.DECK_REVIEW
            })
            if (deckName !== null) {
                KanaState.update({ currentDeck: deckName });
                SRSService.setCurrentDeck(deckName)
            }
        } else {
            KanaState.update({
                appMode: appMode,
            })
        }

        this.dispatchEvent(event);
    }

    renderDecks() {
        return html`
            ${this.decks.map(x => {
            if (x === "hiragana") {
                return html`
                <container @click="${(event: Event) => this.handleDeckClick(event, x, APP_MODES.DECK_REVIEW)}" class="noselect">
                    <h1>${x}</h1>
                </container>
                `;
            }
            return html`
                <group-container>
                    <container @click="${(event: Event) => this.handleDeckClick(event, x, APP_MODES.DECK_REVIEW)}" class="noselect">
                        <h1>${x}</h1>
                    </container>
                    <container class="edit-button" @click="${(event: Event) => this.handleDeckClick(event, x, APP_MODES.EDIT_DECK)}" >
                        <h2>edit</edit>
                    </container>
                </group-container>
            `;
        })}
        `;
    }

    render() {
        return html`
        <deck-container>
            ${this.renderDecks()}

            <container @click="${(event: Event) => this.handleDeckClick(event, null, APP_MODES.HIRAGANA_BOARD)}" class="noselect">
                <h1>Hiragana Board</h1>
            </container>
    
            <container @click="${(event: Event) => this.handleDeckClick(event, null, APP_MODES.NOT_IMPLEMENTED)}" class="noselect">
                <h1>Katakana Board</h1>
            </container>
            <container @click="${(event: Event) => this.handleDeckClick(event, null, APP_MODES.CREATE_DECK)}" class="noselect">
                <h1>Make a custom deck</h1>
            </container>
        </deck-container>
        `;
    }
}

customElements.define("deck-selection", DeckSelection);
