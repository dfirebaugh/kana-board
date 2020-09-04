import { LitElement, html, css, property } from "lit-element";
import { Deck_t, Card_t, DELETE } from "../types";
import DeckService from "../services/DeckService";
import "./json-viewer";
import Card from "../Card";

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

    static get styles() {
        return css`
        deck-name-container {
            display: grid;
            grid-gap: 4rem;
            grid-template-columns: auto auto;
            width: 20vw;
        }
        `;
    }

    firstUpdated() {
        if (this.deckName)
            this.deck = DeckService.getDeck(this.deckName)
    }
    /**
     * TODO: update storage to remove the old deck
     */
    handleDeckNameChange(event: { target: HTMLInputElement }) {
        this.deckName = "";

        this.deckName = event.target.value;
        this.deck = DeckService.getDeck(this.deckName);
    }

    handleKeywordChange(event: { target: HTMLInputElement }) {
        this.keyword = event.target.value;
    }

    handleStoryChange(event: { target: HTMLInputElement }) {
        this.story = event.target.value;
    }

    handleMnemonicChange(event: { target: HTMLInputElement }) {
        this.mnemonic = event.target.value;
    }

    handleSubmit(event: { target: HTMLInputElement }) {
        this.deck = DeckService.updateDeck(this.deckName, [
            new Card({
                keyword: this.keyword,
                story: this.story,
                mnemonic: this.mnemonic
            })])
        this.requestUpdate();
    }

    deleteCard(card: Card_t) {
        delete this.deck[card.keyword];
        this.deck = DeckService.updateDeck(this.deckName, [card], DELETE);

    }

    renderCards() {
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

    renderDeck() {
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

    renderDeckName() {
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

    render() {
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
