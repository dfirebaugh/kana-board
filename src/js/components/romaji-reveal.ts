import { LitElement, html, css, property } from "lit-element";
import { noSelect } from "../../themes/no-select"

class RomajiReveal extends LitElement {
    @property({ attribute: "romaji" })
    romaji: string = "";
    @property({ attribute: "img" })
    img: string = "";
    opacity: number;
    randomCardCallback: any;

    static get styles() {
        return [
            noSelect,
            css`
                container {
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    left: 0;
                    background-color: black;
                    color: white;
                    text-align: center;
                    font-size: 7rem;
                    display: grid;
                    align-content: center;
                    justify-content: center;
                }
            `];
    }

    constructor() {
        super();
        this.opacity = 95;
    }

    // TODO: make this fade out without requiring a click
    fadeAway() {
        if (this.randomCardCallback) {
            this.randomCardCallback();
        }
        this.remove();
    }

    renderImg() {
        if (!this.img) return null;

        return html`
            <img src="data:image/jpg;base64, ${this.img}" />
        `;
    }

    renderRomaji() {
        if (!this.romaji) return null;

        return html`
            <h1>${this.romaji}</h1>
        `;
    }

    render() {
        return html`
        <style>
        container {
            opacity: ${this.opacity}%;
        }
        </style>
        <container @click="${this.fadeAway}" class="noselect">
            ${this.renderRomaji()}
            ${this.renderImg()}
        </container>
      `;
    }
}

customElements.define("romaji-reveal", RomajiReveal);
