import { LitElement, html, css } from "lit-element";

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
        roumajiReveal.randomCardCallback = this.randomCardCallback;
        this.shadowRoot.appendChild(roumajiReveal);
    }

    renderRoumaji() {
        if (this.hideRoumaji) {
            return;
        }
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
        <container @click="${this.handleCardClick}" class="noselect">
            <h1 lang="ja-jp">${this.character.kana}</h1>
            ${this.renderRoumaji()}
        </container>
      `;
    }
}

customElements.define("character-card", CharacterCard);
