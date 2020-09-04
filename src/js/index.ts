/**
 * Load our lit elements and other ESmodules
 * 
 */
import { LitElement, html } from "lit-element";
import { APP_MODES } from "./types";
import KanaState from "./services/KanaState";
import "./components/character-card";
import "./components/romaji-reveal";
import "./components/kana-controls";
import "./components/deck-selection";
import "./components/hiragana-board";
import "./components/deck-creator";

const mountPoint = document.getElementById("hiragana")
class KanaApp extends LitElement {
    updateFromChild() {
        this.requestUpdate()
    }

    renderInputs() {
        return html`
        <kana-controls 
            @control-changed="${this.updateFromChild}" >
        </kana-controls>
        `
    }

    renderSingleCard() {
        return html`
        <character-card 
            @card-event="${this.updateFromChild}"
            id="singlCard" 
            </character-card>
            `
    }

    // .character="${}">
    renderDeckSelection() {
        return html`
        <deck-selection
            @deck-select="${this.updateFromChild}"
            >
        </deck-selection>
        `
    }

    render() {
        var output = this.renderInputs();

        switch (KanaState.get().appMode) {
            case APP_MODES.DECK_SELCTION:
                output = html`
                    ${output}
                    ${this.renderDeckSelection()}`
                break;
            case APP_MODES.DECK_REVIEW:
                output = html`
                    ${output}
                    ${this.renderSingleCard()}`
                break;
            case APP_MODES.HIRAGANA_BOARD:
                output = html`
                    ${output}
                    <hiragana-board></hiragana-board>`
                break;
            case APP_MODES.CREATE_DECK:
                output = html`
                ${output}
                <deck-creator keyword="hello" story="story" mnemonic="mnemonic"></deck-creator>
                `;
                break;
            case APP_MODES.EDIT_DECK:
                output = html`
                    ${output}
                    <deck-creator deck-name="${KanaState.get().currentDeck}" keyword="hello" story="story" mnemonic="mnemonic"></deck-creator>
                    `;
                break;
            default:
                output = html`${output} not implemented yet`;
                break;
        }

        return output;
    }
}

customElements.define("kana-app", KanaApp);

/**
 * Mount the app into the DOM
 */
if (mountPoint)
    mountPoint.appendChild(document.createElement("kana-app"));
