import { LitElement, html, css, property } from "lit-element";

class RomajiReveal extends LitElement {
    @property({attribute: "romaji"})
    romaji: string = "";
    @property({attribute: "img"})
    img: string = "";
    opacity: number;
    randomCardCallback: any;

    static get styles() {
        return css`
        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
               -khtml-user-select: none; /* Konqueror HTML */
                 -moz-user-select: none; /* Old versions of Firefox */
                  -ms-user-select: none; /* Internet Explorer/Edge */
                      user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
          }

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
    `;
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
        if(!this.romaji) return null;

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
