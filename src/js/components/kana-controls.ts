import { LitElement, html, css } from "lit-element";
import KanaState from "../services/KanaState";

class KanaControls extends LitElement {
  static get styles() {
    return css`
        controls-container {
          display: grid;
          margin: 3rem;
          grid-template-columns: auto auto auto;
        }

        toggle-container {
          display: grid;
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
    if (KanaState.get().single) {
      this.shadowRoot.querySelector("input").setAttribute("checked", "true");
    }
  }

  handleSingleToggleClick() {
    KanaState.update({
      single: !KanaState.get().single
    });
    const event = new CustomEvent('control-changed', {
      detail: KanaState.get()
    });
    this.dispatchEvent(event);
  }

  resetLocalStorage() {
    localStorage.removeItem("kanaQueues");
    alert(`local storage reset`);
    location.reload();
  }

  renderSingleToggle() {
    return html`
    <toggle-container>
      <label> single kana: </label>
      <label class="switch">
        <input @click=${this.handleSingleToggleClick} type="checkbox">
        <span class="slider round"></span>
      </label>
    </toggle-container>
  `;
  }


  /**
   * not implemented yet
   */
  renderHiraganaKatakanaToggle() {
    return html`
    <toggle-container>
      <label> hiragana/katakana: </label>
      <label class="switch">
        <input @click="${() => alert("not implemented yet")}" type="checkbox">
        <span class="slider round"></span>
      </label>
    </toggle-container>
  `;
  }

  render() {
    return html`
        <controls-container>
          ${this.renderSingleToggle()}
          ${this.renderHiraganaKatakanaToggle()}
          <button @click="${this.resetLocalStorage}"> reset </button>
        </controls-container>
      `;
  }
}

customElements.define("kana-controls", KanaControls);
