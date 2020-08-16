import { LitElement, html, css } from "lit-element";
import theme from "../../themes/main-theme";
import AnkiService from "../AnkiService";

class CharacterCard extends LitElement {
    static get properties() {
        return {
            character: {
                attribute: "character",
            },
            hideRoumaji: {
                type: Boolean,
                attribute: "hide-roumaji"
            },
            single: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.character = {};
    }

    static get styles() {
        return css`
        :lang(ja-jp) {
            font-family: Arial, sans-serif;
            line-height: 1.5rem;
        }

        character-card {
            width: 100%;
        }

        container {
            width: 100%;
            box-shadow: 2px 2px 39px -23px;
            background-color: aliceblue;
            display: inline-block;
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

          controls-container * {
              display: grid;
              line-height: 3rem;
              text-align: center;
          }

          controls-container *:hover {
                cursor: pointer;
                color: white;
                background-color: black;
          }

          reveal {
              background-color: ${theme.blue};
          }

          reveal-mnemonic {
              background-color: ${theme.darkGray};
          }


          anki-btn-container {
              grid-template-columns: auto auto;
          }

          anki-btn-container good {
              background-color: ${theme.green};
          }

          anki-btn-container bad {
              background-color: ${theme.red};
          }

          anki-btn-container h3 {
              grid-column-start: 1;
              grid-column-end: 3;
          }

          next-card {
              background-color: ${theme.gray};
          }

    `;
    }

    firstUpdated() {
        if (this.single) {
            this.shadowRoot.querySelector("container").style.display = "grid";
            this.shadowRoot.querySelector("container").style.alignContent = "center";
            this.shadowRoot.querySelector("container").style.height = "50vh";
            this.shadowRoot.querySelector("h1").style.fontSize = "11rem";
        }
    }

    handleCardClick(e) {
        const roumajiReveal = document.createElement("roumaji-reveal");
        roumajiReveal.setAttribute("roumaji", this.character.roumaji);
        this.shadowRoot.appendChild(roumajiReveal);
    }
    
    handleNextClick() {
        this.nextCardCallback();
    }

    /**
     * handleAnkiGoodClick - this signifies that we know the card well and don't need to see it as often
     */
    handleAnkiGoodClick() {
        AnkiService.incrementKanaWeight();
        this.requestParentRender();
    }

    /**
     * handleAnkiBadClick - this signisfies that we don't know the card well so we need to see it more often
     */
    handleAnkiBadClick() {
        AnkiService.decrementKanaWeight();
        this.requestParentRender();
    }

    handleMnemonicClick() {
        if(!this.character.mnemonic) return;

        const mnemonicReveal = document.createElement("roumaji-reveal");
        mnemonicReveal.setAttribute("img", `${this.character.mnemonic}`);
        this.shadowRoot.appendChild(mnemonicReveal);
    }

    renderRoumaji() {
        if (this.hideRoumaji) return;
    }

    renderAnkiControls() {
        if (!this.single) return;

        // {<next-card @click="${this.handleNextClick}">next</next-card>}
        return html`
        <anki-btn-container>
            <bad @click="${this.handleAnkiBadClick}">I had trouble with this</bad>
            <good @click="${this.handleAnkiGoodClick}">I know this</good>
        </anki-btn-container>
    `
    }

    renderInputs() {
        return html`
            <controls-container>
                <reveal @click="${this.handleCardClick}" >roumaji</reveal>
                ${this.character.mnemonic && html`<reveal-mnemonic @click="${this.handleMnemonicClick}">mnemonic</reveal-mnemonic>`}
                ${this.renderAnkiControls()}
            </controls-container>
            <h3>weight: ${AnkiService.getKanaWeight(this.character.roumaji)}</h3>
        `;
    }

    render() {
        if(!this.character || !this.character.kana) {
            return html`
            <container style="visibility: hidden;" class="noselect">
                <h1 lang="ja-jp">ゆ</h1>
            </container>
            `;
        }

        return html`
        <container class="noselect">
            <h1 lang="ja-jp">${this.character.kana}</h1>
            ${this.renderRoumaji()}
            ${this.renderInputs()}
        </container>
      `;
    }
}

customElements.define("character-card", CharacterCard);
