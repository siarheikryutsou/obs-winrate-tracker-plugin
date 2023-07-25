import { Page } from "../Page.js";
import { DOMElement } from "../../shared/ui/DomElement.js";
export class PageSource extends Page {
    constructor(getTextCallback, getValuesCallback) {
        super();
        this.elTextWrapper = new DOMElement("p", { id: "source" }).getEl();
        document.body.classList.add("source");
        this.append(this.elTextWrapper);
    }
    setText(value) {
        this.elTextWrapper.innerText = value;
    }
    getText() {
        return this.elTextWrapper.innerText;
    }
}
customElements.define("el-page-source", PageSource);
//# sourceMappingURL=PageSource.js.map