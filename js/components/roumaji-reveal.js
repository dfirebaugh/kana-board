import { LitElement, html, css } from "lit-element";

class RoumajiReveal extends LitElement {
    static get properties() {
        return {
            roumaji: {
                attribute: "roumaji",
            }
        }
    }

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
            position: absolute;
            top: 0;
            left: 0;
            background-color: black;
            color: white;
            text-align: center;
            font-size: 7rem;
            display: grid;
            align-content: center;
        }
    `;
    }

    constructor() {
        super();
        this.opacity = 85;
    }

    // TODO: make this fade out without requiring a click
    fadeAway() {
        if (this.randomCardCallback) {
            this.randomCardCallback();
        }
        this.remove();
    }

    render() {
        return html`
        <style>
        container {
            opacity: ${this.opacity}%;
        }
        </style>
        <container @click="${this.fadeAway}" class="noselect">
            <h1>${this.roumaji}</h1>
        </container>
      `;
    }
}

customElements.define("roumaji-reveal", RoumajiReveal);
