/**
 * Load our lit elements and other ESmodules
 * 
 */
import { LitElement, html, css } from "lit-element";
import kanas from "../data/kanas_with_images";
import AnkiService from "./AnkiService";
import "./components/character-card";
import "./components/roumaji-reveal";
import "./components/kana-controls";

const mountPoint = document.getElementById("hiragana")

class HiraganaApp extends LitElement {
    static get styles() {
        return css`
        cards-grid-container {
            display: grid;
            grid-auto-flow: column;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 1rem;
        }

        cards-column {
            display: flex;
            width: 5vw;
            flex-wrap: wrap;
            margin-left: 1vw;
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
            margin-bottom: 1vh;
        }
    `;
    }
    static get properties() { 
        return { single: { type: Boolean } };
    }

    set single(bool) {
        let oldVal = this._single;
        this._single = !this._single;
        this.requestUpdate('single', oldVal);
    }
    
    get single() {
        return this._single;
    }
    
    
    constructor() {
        super();

        this.single = true;
    }

    updated() {
        const kanaControls = this.shadowRoot.querySelector("kana-controls")
        const singleCard = this.shadowRoot.querySelector("#singlCard")

        if (kanaControls) {
            kanaControls.updatesingleState = bool => {
                this.single = bool;
            };
        }

        if (singleCard) {
            singleCard.nextCardCallback = this.handlesingleClick.bind(this);
            singleCard.requestParentRender = this.requestUpdate.bind(this);
        }
    }

    renderCards() {
        const cards = hiragana.map(character => {
            return html`<character-card .character=${character}></character-card>`
        })

        return cards
    }

    handlesingleClick() {
        this.requestUpdate();
    }

    singleCard() {
        const nextKey = AnkiService.getNext().roumaji;
        return html`
        <character-card id="singlCard" weight=${AnkiService.getKanaWeight(nextKey)} .character=${kanas[nextKey]} single></character-card>
        <button @click="${this.resetLocalStorage}"> reset </button>
        `
    }

    resetLocalStorage() {
        localStorage.removeItem("kanaQueues");
        alert(`local storage reset`);
        location.reload();
    }

    renderBoard() {
        return html`
        <cards-grid-container>

            <top-label> * </top-label>
            <character-card .character=${kanas.n}></character-card>
            <character-card></character-card>
            <character-card></character-card>
            <character-card></character-card>
            <character-card></character-card>

            <top-label> w </top-label>
            <character-card .character=${kanas.wa}></character-card>
            <character-card></character-card>
            <character-card></character-card>
            <character-card></character-card>
            <character-card .character=${kanas.wo}></character-card>

            <top-label> r </top-label>
            <character-card .character=${kanas.ra}></character-card>
            <character-card .character=${kanas.ri}></character-card>
            <character-card .character=${kanas.ru}></character-card>
            <character-card .character=${kanas.re}></character-card>
            <character-card .character=${kanas.ro}></character-card>

            <top-label> y </top-label>
            <character-card .character=${kanas.ya}></character-card>
            <character-card></character-card>
            <character-card .character=${kanas.yu}></character-card>
            <character-card></character-card>
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
        return html`<kana-controls single=${this.single} ></kana-controls>
            ${this.single ? this.singleCard() : this.renderBoard()}`
    }
}

customElements.define("hiragana-app", HiraganaApp);

/**
 * Mount the app into the DOM
 */
mountPoint.appendChild(document.createElement("hiragana-app"));