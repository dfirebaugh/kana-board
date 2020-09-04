import { LitElement, html, css } from "lit-element";
import SRSService from "../services/SRSService";
import "./comfort-status-box";

class ComfortCounts extends LitElement {
    counts = SRSService.getCounts();
    static get styles() {
        return css`
            status-header {
                width: 100%
            }
            container {
                display: grid;
                grid-template-columns: auto auto auto;
                grid-gap: 2rem;
            }
            h1 {
                text-align: center;
            }
        `;
    }
    render() {
        return html`

        total cards in deck: ${this.counts.total}
        <status-header>
            <h1>great job!</h1>
        </status-header>
        <container>

            <comfort-status-box 
                count="${this.counts.bad}" 
                total_count="${this.counts.total}"
                label="weak">
            </comfort-status-box>
            <comfort-status-box 
                count="${this.counts.medium}" 
                total_count="${this.counts.total}"
                label="medium">
            </comfort-status-box>
            <comfort-status-box
                count="${this.counts.good}"
                total_count="${this.counts.total}"
                label="strong">
            </comfort-status-box>
        </container>
        `
    }
}

customElements.define("comfort-counts", ComfortCounts);
