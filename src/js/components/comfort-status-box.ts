import { LitElement, html, css, property, CSSResult, TemplateResult } from "lit-element";
import theme from "../../themes/main-theme";

/**
 * COMFORT_LEVEL
 * the style/label for what comfort a card falls under
 */
enum COMFORT_LEVEL {
    WEAK = "weak",
    MEDIUM = "medium",
    STRONG = "strong"
}

class ComfortStatusBox extends LitElement {
    @property({ attribute: "count" })
    count: number = 0;
    @property({ attribute: "total_count" })
    total_count: number = 0;
    @property({ attribute: "label" })
    label: string = "";

    static get styles(): CSSResult {
        return css`
            progress-container {
                display: grid;
                border: solid black 8px;
                height: 40vh;
                width: 18vw;
            }

            progress-bar {
            }

        `;
    }

    determineColor(): CSSResult | null {
        switch(this.label) {
            case COMFORT_LEVEL.WEAK:
                return css`${theme.red}`;
            case COMFORT_LEVEL.MEDIUM:
                return css`${theme.blue}`;
            case COMFORT_LEVEL.STRONG:
                return css`${theme.green}`;
            default:
                console.error("expected a proper label")
                return null;
        }
    }

    render(): TemplateResult {
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
