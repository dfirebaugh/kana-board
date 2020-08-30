/**
 * Load our lit elements and other ESmodules
 * 
 */
import { LitElement, html, css } from "lit-element";
import KanaState from "./services/KanaState";
import kanas from "./kanas_with_images";
import SRSService from "./services/SRSService";
import "./components/character-card";
import "./components/romaji-reveal";
import "./components/kana-controls";

const mountPoint = document.getElementById("hiragana")
class KanaApp extends LitElement {
    static get styles() {
        return css`
        cards-grid-container {
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        }


        top-label {
            display: grid;
            align-items: center;
            text-align: center;
            width: 100%;
        }
        side-label {
            display: grid;
            align-items: center;
            text-align: center;
            width: 100%;
        }

        .grid-item {
        }
        
        character-card {
            width: 100%;
        }

        .empty {
            border: 0;
        }
    `;
    }

    renderCards() {
        const cards = Object.values(kanas).map(character => {
            return html`<character-card .character=${character}></character-card>`
        })

        return cards
    }

    updateFromControls() {
        this.requestUpdate()
    }

    updateFromCard() {
        this.requestUpdate();
    }

    renderSingleCard() {
        const nextKey = SRSService.getNext().romaji;
        return html`
        <character-card 
            @card-event="${this.updateFromCard}"
            id="singlCard" 
            weight=${SRSService.getKanaWeight()} 
            .character=${kanas[nextKey]} single>
        </character-card>
        `
    }

    renderBoard() {
        return html`
        <style>
        character-card {border: solid 2px;}
        </style>
        <cards-grid-container>

            <top-label> * </top-label>
            <character-card .character=${kanas.n}></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>

            <top-label> w </top-label>
            <character-card .character=${kanas.wa}></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${kanas.wo}></character-card>

            <top-label> r </top-label>
            <character-card .character=${kanas.ra}></character-card>
            <character-card .character=${kanas.ri}></character-card>
            <character-card .character=${kanas.ru}></character-card>
            <character-card .character=${kanas.re}></character-card>
            <character-card .character=${kanas.ro}></character-card>

            <top-label> y </top-label>
            <character-card .character=${kanas.ya}></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${kanas.yu}></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${kanas.yo}></character-card>

            <top-label> m </top-label>
            <character-card .character=${kanas.ma}></character-card>
            <character-card .character=${kanas.mi}></character-card>
            <character-card .character=${kanas.mu}></character-card>
            <character-card .character=${kanas.me}></character-card>
            <character-card .character=${kanas.mo}></character-card>

            <top-label> h </top-label>
            <character-card .character=${kanas.ha}></character-card>
            <character-card .character=${kanas.hi}></character-card>
            <character-card .character=${kanas.hu}></character-card>
            <character-card .character=${kanas.he}></character-card>
            <character-card .character=${kanas.ho}></character-card>

            <top-label> n </top-label>
            <character-card .character=${kanas.na}></character-card>
            <character-card .character=${kanas.ni}></character-card>
            <character-card .character=${kanas.nu}></character-card>
            <character-card .character=${kanas.ne}></character-card>
            <character-card .character=${kanas.no}></character-card>

            <top-label> t </top-label>
            <character-card .character=${kanas.ta}></character-card>
            <character-card .character=${kanas.chi}></character-card>
            <character-card .character=${kanas.tsu}></character-card>
            <character-card .character=${kanas.te}></character-card>
            <character-card .character=${kanas.to}></character-card>

            <top-label> s </top-label>
            <character-card .character=${kanas.sa}></character-card>
            <character-card .character=${kanas.shi}></character-card>
            <character-card .character=${kanas.su}></character-card>
            <character-card .character=${kanas.se}></character-card>
            <character-card .character=${kanas.so}></character-card>


            <top-label> k </top-label>
            <character-card .character=${kanas.ka}></character-card>
            <character-card .character=${kanas.ki}></character-card>
            <character-card .character=${kanas.ku}></character-card>
            <character-card .character=${kanas.ke}></character-card>
            <character-card .character=${kanas.ko}></character-card>

            <top-label style="visibility: hidden;"> k </top-label>
            <character-card .character=${kanas.a}></character-card>
            <character-card .character=${kanas.i}></character-card>
            <character-card .character=${kanas.u}></character-card>
            <character-card .character=${kanas.e}></character-card>
            <character-card .character=${kanas.o}></character-card>

            <side-label style="visibility: hidden;">a</side-label>
            <side-label>a</side-label>
            <side-label>i</side-label>
            <side-label>u</side-label>
            <side-label>e</side-label>
            <side-label>o</side-label>
        </cards-grid-container>
    `
    }

    render() {
        return html`
            <kana-controls 
                @control-changed="${this.updateFromControls}" >
            </kana-controls>
            ${KanaState.get().single ? this.renderSingleCard() : this.renderBoard()}`
    }
}

customElements.define("kana-app", KanaApp);

/**
 * Mount the app into the DOM
 */
mountPoint.appendChild(document.createElement("kana-app"));