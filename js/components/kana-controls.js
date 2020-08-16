import { LitElement, html, css } from "lit-element";

class KanaControls extends LitElement {
    static get properties() {
        return {
            single: {
                attribute: "single",
            }
        }
    }

    static get properties() { 
        return { single: { type: Boolean } };
    }

    set single(bool) {
        let oldVal = this._single;
        this._single = bool;
        this.requestUpdate('single', oldVal);
    }

    get single() {
        return this._single;
    }

    constructor() {
        super();
    }

    static get styles() {
        return css`
        controls-container {
          display: grid;
          margin: 3rem;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
          }
          
          .switch input { 
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          input:checked + .slider {
            background-color: #2196F3;
          }
          
          input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }
          
          /* Rounded sliders */
          .slider.round {
            border-radius: 34px;
          }
          
          .slider.round:before {
            border-radius: 50%;
          }
    `;
    }

    firstUpdated() {
      console.log("this single", this.single)
        if (this.single) {
            this.shadowRoot.querySelector("input").setAttribute("checked", "true");
        }
    }

    handlesingleToggleClick(e) {
        this.updatesingleState();
    }

    render() {
        return html`
        <controls-container>
        <label> single kana: </label>
        <label class="switch">
            <input @click=${this.handlesingleToggleClick} type="checkbox">
            <span class="slider round"></span>
        </label>
        </controls-container>
      `;
    }
}

customElements.define("kana-controls", KanaControls);
