import { DOMElement } from "./DomElement.js";
export class InputWinLoss {
    constructor(id, label, value) {
        this.el = new DOMElement("div", { id: id }).getEl();
        this.elLabel = new DOMElement("label", undefined, label).getEl();
        this.elInput = new DOMElement("input", {
            type: "number",
            value: value.toString(),
            min: "0"
        }).getEl();
        this.el.addEventListener("focus", () => this.elInput.select());
        this.el.append(this.elLabel, this.elInput);
    }
    getEl() {
        return this.el;
    }
}
//# sourceMappingURL=InputWinLoss.js.map