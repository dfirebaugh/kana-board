/**
 * Load our lit elements and other ESmodules
 * 
 */
import { LitElement, html } from "lit-element";
import { DECK_SELCTION, HIRAGANA_SINGLE, HIRAGANA_BOARD } from "./types";
import KanaState from "./services/KanaState";
import kanas from "./kanas_with_images";
import SRSService from "./services/SRSService";
import "./components/character-card";
import "./components/romaji-reveal";
import "./components/kana-controls";
import "./components/deck-selection";
import "./components/hiragana-board";

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
        const nextKey = SRSService.getNext().romaji;
        console.log(nextKey)
        return html`
        <character-card 
            @card-event="${this.updateFromChild}"
            id="singlCard" 
            weight=${SRSService.getKanaWeight()} 
            .character=${kanas[nextKey]} single>
        </character-card>
        `
    }

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
            case DECK_SELCTION:
                output = html`
                    ${output}
                    ${this.renderDeckSelection()}`
                break;
            case HIRAGANA_SINGLE:
                output = html`
                    ${output}
                    ${this.renderSingleCard()}`
                break;
            case HIRAGANA_BOARD:
                output = html`
                    ${output}
                    <hiragana-board></hiragana-board>`
                break
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
mountPoint.appendChild(document.createElement("kana-app"));
