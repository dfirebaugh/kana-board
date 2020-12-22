import { LitElement, html, css, property, CSSResult, TemplateResult } from "lit-element";
import theme from "../../themes/main-theme";
import KanaState from "../services/KanaState";
import { APP_MODES, Card_t } from "../types";
import SRSService from "../services/SRSService";
import "./comfort-counts";
import { noSelect } from "../../themes/no-select"

class CharacterCard extends LitElement {
    @property({ attribute: "character" })
    character: Card_t | null = null;

    static get styles(): Array<CSSResult> {
        return [
            noSelect,
            css`
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

          comfort-counts {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              justify-content: center;
          }

          btn-container {
            width: 100%;
            display: grid;
            height: 7vh;
          }
    `];
    }

    firstUpdated(): void {
        if (KanaState.get().appMode === APP_MODES.DECK_REVIEW) {
            SRSService.buildQueue();
            this.character = SRSService.getNext()
        }
    }
    clickEvent(eventDetail: string): void {
        const event: CustomEvent = new CustomEvent('card-event', {
            detail: eventDetail
        });

        this.dispatchEvent(event);
    }

    handleCardClick(): void {
        const romajiReveal: HTMLElement = document.createElement("romaji-reveal");

        if (!this.character) return alert("you clicked the card, but there was no card.  So, character is null");

        romajiReveal.setAttribute("romaji", this.character.keyword);

        if (this.shadowRoot)
            this.shadowRoot.appendChild(romajiReveal);
    }

    /**
     * handleSRSGoodClick - this signifies that we know the card well and don't need to see it as often
     */
    handleSRSGoodClick(): void {
        if (!this.character) return alert("you clicked the card, but there was no card.  So, character is null");

        SRSService.incrementComfortLevel(this.character.hash);
        this.character = SRSService.getNext()
        this.clickEvent("good-click");
    }

    /**
     * handleSRSBadClick - this signisfies that we don't know the card well so we need to see it more often
     */
    handleSRSBadClick(): void {
        if (!this.character) return alert("you clicked the card, but there was no card.  So, character is null");
        SRSService.decrementComfortLevel(this.character?.hash);
        this.character = SRSService.getNext()
        this.clickEvent("bad-click");
    }

    handleMnemonicClick(): void {
        if (!this.character) return alert("you clicked the card, but there was no card.  So, character is null");

        if (!this.character.mnemonic) return;

        const mnemonicReveal = document.createElement("romaji-reveal");
        mnemonicReveal.setAttribute("img", `${this.character.mnemonic}`);

        if (this.shadowRoot)
            this.shadowRoot.appendChild(mnemonicReveal);
    }

    handleNewQueueRequest(): void {
        SRSService.buildQueue();
        this.character = SRSService.getNext()
        this.clickEvent("get-new-queue");
    }

    renderSRSControls(): TemplateResult | void | null {
        if (KanaState.get().appMode != APP_MODES.DECK_REVIEW) return null;

        if (!this.character) return alert("you clicked the card, but there was no card.  So, character is null");

        return html`
            <SRS-btn-container>
                <bad @click="${this.handleSRSBadClick}">I'm not sure</bad>
                <good @click="${this.handleSRSGoodClick}">I know this</good>
            </SRS-btn-container>
        `
    }

    renderInputs(): TemplateResult | void {
        if (!this.character) return alert("you clicked the card, but there was no card.  So, character is null");

        return html`
            <controls-container>
                <reveal @click="${this.handleCardClick}">hint</reveal>
                ${this.character.mnemonic && html`<reveal-mnemonic @click="${this.handleMnemonicClick}">mnemonic</reveal-mnemonic>`}
                ${this.renderSRSControls()}
            </controls-container>
        `;
    }

    renderComfortCounts(): TemplateResult {
        return html`
        <btn-container>
            <button @click="${this.handleNewQueueRequest}">try some more</button>
        </btn-container>
        <comfort-counts></comfort-counts>
        `;
    }

    render(): TemplateResult | null {
        if (!this.character && KanaState.state.appMode == APP_MODES.HIRAGANA_BOARD) return null;
        if (!this.character) return this.renderComfortCounts();

        return html`
        <container class="noselect">
            <h1 lang="ja-jp">${this.character.story}</h1>
            ${this.renderInputs()}
        </container>
      `;
    }
}

customElements.define("character-card", CharacterCard);
