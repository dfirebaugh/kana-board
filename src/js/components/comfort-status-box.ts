import { LitElement, html, css, property } from "lit-element";
import theme from "../../themes/main-theme";


class ComfortStatusBox extends LitElement {
    @property({ attribute: "count" })
    count: number = 0;
    @property({ attribute: "total_count" })
    total_count: number = 0;
    @property({ attribute: "label" })
    label: string = "";

    static get styles() {
        return css`
            progress-container {
                display: grid;
                border: solid black 8px;
                height: 40vh;
                width: 30vw;
            }

            progress-bar {
            }

        `;
    }

    determineColor() {
        if (this.label == "weak") {
            return css`${theme.red}`;
        } else if (this.label == "medium") {
            return css`${theme.blue}`;
        } else if (this.label == "strong") {
            return css`${theme.green}`;
        } else {
            console.error("expected a proper label")
            return null;
        }
    }

    render() {
        return html`
            ${this.label}
            <progress-container style="background-color: ${this.determineColor()};">
                <progress-bar style="height: ${100 - (this.count / this.total_count) * 100}%;background-color: white;">
                ${this.count}/${this.total_count}
                </progress-bar>
            </progress-container>
        `;
    }
}

customElements.define("comfort-status-box", ComfortStatusBox);
