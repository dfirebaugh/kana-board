import { LitElement, html, css } from "lit-element";
import KanaState from "../services/KanaState";
import SRSService from "../services/SRSService";
import { HIRAGANA_SINGLE, HIRAGANA_BOARD, NOT_IMPLEMENTED } from "../types";

class DeckSelection extends LitElement {
    decks: Array<string> = SRSService.getDecks();
    static get styles() {
        return css`
        group-container {
            display: grid;
            grid-template-columns: auto auto;
            grid-gap: 4vw;
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

        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
               -khtml-user-select: none; /* Konqueror HTML */
                 -moz-user-select: none; /* Old versions of Firefox */
                  -ms-user-select: none; /* Internet Explorer/Edge */
                      user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
          }
    `;
    }

    firstUpdated() {
        this.decks = SRSService.getDecks()
    }

    handleDeckClick(clickEvent: Event, deck: number) {

        const event = new CustomEvent('deck-select', {
            detail: "Single"
        });
        KanaState.update({
            appMode: deck
        })

        this.dispatchEvent(event);
    }

    renderDecks() {
        return html`
            ${this.decks.map(x => {
                return html`
                <container @click="${(event: Event) => this.handleDeckClick(event, HIRAGANA_SINGLE)}" class="noselect">
                    <h1>${x}</h1>
                </container>
                `;
            })}
        `;
    }

    render() {
        return html`
        <deck-container>
            ${this.renderDecks()}

            <container @click="${(event: Event) => this.handleDeckClick(event, HIRAGANA_BOARD)}" class="noselect">
                <h1>Hiragana Board</h1>
            </container>
    
            <container @click="${(event: Event) => this.handleDeckClick(event, NOT_IMPLEMENTED)}" class="noselect">
                <h1>Katakana Board</h1>
            </container>
            <container @click="${(event: Event) => this.handleDeckClick(event, NOT_IMPLEMENTED)}" class="noselect">
                <h1>Make a custom deck</h1>
            </container>
        </deck-container>
        `;
    }
}

customElements.define("deck-selection", DeckSelection);
