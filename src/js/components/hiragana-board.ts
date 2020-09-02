import { LitElement, html, css } from "lit-element";
import kanas from "../kanas_with_images";
import {Card_t} from "../types";

class HiraganaBoard extends LitElement {
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

        character-card {
            width: 100%;
        }


        .empty {
            border: 0;
        }
    `;
    }

    kanaToDeckElement(kana: any): Card_t {
        const newCard: Card_t = {
            keyword: kana.kana,
            story: kana.romaji,
            mnemonic: kana.mnemonic,
            comfort_level: 0,
            last_reviewed: Date.now()
        }
        return newCard;
    }

    render() {
        return html`
        <style>
        character-card {border: solid 2px;}
        </style>
        <cards-grid-container>

            <top-label> * </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.n)}></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>

            <top-label> w </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.wa)}></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.wo)}></character-card>

            <top-label> r </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.ra)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ri)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ru)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.re)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ro)}></character-card>

            <top-label> y </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.ya)}></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.yu)}></character-card>
            <character-card class="empty"></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.yo)}></character-card>

            <top-label> m </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.ma)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.mi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.mu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.me)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.mo)}></character-card>

            <top-label> h </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.ha)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.hi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.hu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.he)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ho)}></character-card>

            <top-label> n </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.na)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ni)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.nu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ne)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.no)}></character-card>

            <top-label> t </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.ta)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.chi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.tsu)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.te)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.to)}></character-card>

            <top-label> s </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.sa)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.shi)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.su)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.se)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.so)}></character-card>


            <top-label> k </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.ka)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ki)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ku)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ke)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.ko)}></character-card>

            <top-label style="visibility: hidden;"> k </top-label>
            <character-card .character=${this.kanaToDeckElement(kanas.a)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.i)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.u)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.e)}></character-card>
            <character-card .character=${this.kanaToDeckElement(kanas.o)}></character-card>

            <side-label style="visibility: hidden;">a</side-label>
            <side-label>a</side-label>
            <side-label>i</side-label>
            <side-label>u</side-label>
            <side-label>e</side-label>
            <side-label>o</side-label>
        </cards-grid-container>
    `
    }
}

customElements.define("hiragana-board", HiraganaBoard);
