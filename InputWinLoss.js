import { DOMElement } from "./DomElement.js";
export class InputWinLoss {
    constructor(id, label, value) {
        this.el = new DOMElement("div", { id: id, class: "input-win-loss-wrapper" }).getEl();
        this.elLabel = new DOMElement("label", undefined, label).getEl();
        this.elControlsWrapper = new DOMElement("div", { class: "controls-wrapper" }).getEl();
        this.elInput = new DOMElement("input", {
            type: "number",
            value: value.toString(),
            min: "0"
        }).getEl();
        this.elBtnPlus = new DOMElement("button", {
            type: "button"
        }, "+").getEl();
        this.elBtnMinus = new DOMElement("button", {
            type: "button"
        }, "-").getEl();
        this.el.addEventListener("focus", () => this.elInput.select());
        this.elControlsWrapper.append(this.elInput, this.elBtnPlus, this.elBtnMinus);
        this.el.append(this.elLabel, this.elControlsWrapper);
    }
    getEl() {
        return this.el;
    }
}
//# sourceMappingURL=InputWinLoss.js.map