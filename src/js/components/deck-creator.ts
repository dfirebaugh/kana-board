import { LitElement, html, css, property, CSSResult, TemplateResult } from "lit-element";
import { Deck_t, Card_t, DELETE } from "../types";
import { DeckService } from "../services/DeckService";
import "./json-viewer";
import { Card } from "../Card";

class DeckCreator extends LitElement {
    @property({ attribute: "deck-name" })
    deckName: string = "";
    @property({ attribute: "keyword" })
    keyword: string = "";
    @property({ attribute: "story" })
    story: string = "";
    @property({ attribute: "mnemonic" })
    mnemonic: string = "";

    @property({ attribute: "deck" })
    deck: Deck_t = {}

    static get styles(): CSSResult {
        return css`
        deck-name-container {
            display: grid;
            grid-gap: 4rem;
            grid-template-columns: auto auto;
            width: 20vw;
        }
        `;
    }

    firstUpdated(): void {
        if (this.deckName)
            this.deck = DeckService.get(this.deckName)
    }
    /**
     * TODO: update storage to remove the old deck
     */
    handleDeckNameChange(event: { target: HTMLInputElement }): void {
        this.deckName = "";

        this.deckName = event.target.value;
        this.deck = DeckService.get(this.deckName);
    }

    handleKeywordChange(event: { target: HTMLInputElement }): void {
        this.keyword = event.target.value;
    }

    handleStoryChange(event: { target: HTMLInputElement }): void {
        this.story = event.target.value;
    }

    handleMnemonicChange(event: { target: HTMLInputElement }): void {
        this.mnemonic = event.target.value;
    }

    handleSubmit(event: { target: HTMLInputElement }): void {
        this.deck = DeckService.update(this.deckName, [
            new Card({
                keyword: this.keyword,
                story: this.story,
                mnemonic: this.mnemonic
            })])
        this.requestUpdate();
    }

    deleteCard(card: Card_t): void {
        delete this.deck[card.keyword];
        this.deck = DeckService.update(this.deckName, [card], DELETE);
    }

    renderCards(): Array<TemplateResult> {
        return Object.keys(this.deck).map(card => {
            return html`
                <tr>
                    <td>${this.deck[card].story}</td>
                    <td>${this.deck[card].keyword}</td>
                    <td>${this.deck[card].mnemonic}</td>
                    <td>
                        <button @click="${() => this.deleteCard(this.deck[card])}">delete</button>
                    </td>
                </tr>`;
        })
    }

    renderDeck(): TemplateResult {
        if (this.deck) {
            return html`
            <table>
                <thead>
                    <th>story</th>
                    <th>keyword</th>
                    <th>mnemonic</th>
                </thead>
                ${this.renderCards()}
                <tbody></tbody>
            </table>
            `;
        } else {
            return html`make some cards`;
        }
    }

    renderDeckName(): TemplateResult {
        if (this.deckName) return html`
        <deck-name-container>
            <h2> ${this.deckName} </h2>
            <button @click="${this.handleDeckNameChange}">edit deck name</button>
        </deck-name-container>
        `;

        return html`
        <input type="text" @change="${this.handleDeckNameChange}" value="" />
        `;
    }

    render(): TemplateResult {
        if (!this.deckName) {
            return html`
                name the deck
                ${this.renderDeckName()}
        `;
        }

        return html`
        ${this.renderDeckName()}
        <br/>
        <container>
        <input type="text" @change="${this.handleStoryChange}" value="${this.story}"/>
        <input type="text" @change="${this.handleKeywordChange}" value="${this.keyword}" />
        <input type="text" @change="${this.handleMnemonicChange}" value="${this.mnemonic}"/>
        <button @click="${this.handleSubmit}">create</button>
        </container>

        <code-viewer code="${JSON.stringify(this.deck) || ''}"></code-viewer>

        ${this.renderDeck()}
        `;
    }
}

customElements.define("deck-creator", DeckCreator);
