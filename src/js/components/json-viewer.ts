import { LitElement, html, css, property, TemplateResult, CSSResult } from 'lit-element';
import "@advanced-rest-client/prism-highlight";

class CodeViewer extends LitElement {
    @property({ attribute: "code" })
    code: string = "";

    static get style(): CSSResult {
        return css`
        container {
            background-color: aliceblue;
            height: 30vh;
            width: 30vw;
            padding: 2rem;
        }
        `;
    }
    lang: string = "json"

    render(): TemplateResult {
        return html`
            <link rel="import" href="../node_modules/juicy-ace-editor/juicy-ace-editor.html"> 
            <container>
                <prism-highlight 
                    .code="${this.code}" 
                    .lang="${this.lang}">
                </prism-highlight>
            </container>`;
    }
}

customElements.define("code-viewer", CodeViewer);
