import { LitElement, html, css, property } from "lit-element";
import theme from "../../themes/main-theme";
import SRSService from "../services/SRSService";
import KanaState from "../services/KanaState";
import { HIRAGANA_SINGLE } from "../types";

class CharacterCard extends LitElement {
    @property({ attribute: "character" })
    character;

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
            align-content: end;
        }

        h1 {
            text-align: center;
            font-size: 6rem;
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


          SRS-btn-container {
              grid-template-columns: auto auto;
          }

          SRS-btn-container good {
              background-color: ${theme.green};
          }

          SRS-btn-container bad {
              background-color: ${theme.red};
          }

          SRS-btn-container h3 {
              grid-column-start: 1;
              grid-column-end: 3;
          }

          next-card {
              background-color: ${theme.gray};
          }

    `;
    }

    handleCardClick() {
        const romajiReveal = document.createElement("romaji-reveal");
        romajiReveal.setAttribute("romaji", this.character.romaji);
        this.shadowRoot.appendChild(romajiReveal);
    }

    /**
     * handleSRSGoodClick - this signifies that we know the card well and don't need to see it as often
     */
    handleSRSGoodClick() {
        SRSService.incrementKanaWeight();

        const event = new CustomEvent('card-event', {
            detail: "good-click"
        });

        this.dispatchEvent(event);
    }

    /**
     * handleSRSBadClick - this signisfies that we don't know the card well so we need to see it more often
     */
    handleSRSBadClick() {
        SRSService.decrementKanaWeight();

        const event = new CustomEvent('card-event', {
            detail: "bad-click"
        });

        this.dispatchEvent(event);
    }

    handleMnemonicClick() {
        if (!this.character.mnemonic) return;

        const mnemonicReveal = document.createElement("romaji-reveal");
        mnemonicReveal.setAttribute("img", `${this.character.mnemonic}`);
        this.shadowRoot.appendChild(mnemonicReveal);
    }

    renderSRSControls() {
        if (KanaState.get().appMode != HIRAGANA_SINGLE) return null;


        return html`
            <SRS-btn-container>
                <bad @click="${this.handleSRSBadClick}">I'm not sure</bad>
                <good @click="${this.handleSRSGoodClick}">I know this</good>
            </SRS-btn-container>
        `
    }

    renderInputs() {
        return html`
            <controls-container>
                <reveal @click="${this.handleCardClick}" >romaji</reveal>
                ${this.character.mnemonic && html`<reveal-mnemonic @click="${this.handleMnemonicClick}">mnemonic</reveal-mnemonic>`}
                ${this.renderSRSControls()}
            </controls-container>
        `;
    }

    render() {
        if (!this.character) return null;

        return html`
        <container class="noselect">
            <h1 lang="ja-jp">${this.character.kana}</h1>
            ${this.renderInputs()}
        </container>
      `;
    }
}

customElements.define("character-card", CharacterCard);
