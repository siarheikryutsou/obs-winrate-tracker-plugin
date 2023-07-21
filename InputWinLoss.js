import { DOMElement } from "./DomElement.js";
import { DomElementBase } from "./DomElementBase.js";
export class InputWinLoss extends DomElementBase {
    constructor(id, label, value) {
        super(new DOMElement("div", { id: id, class: "input-win-loss-wrapper" }).getEl());
        this.elLabel = new DOMElement("label", undefined, label).getEl();
        this.elControlsWrapper = new DOMElement("div", { class: "controls-wrapper" }).getEl();
        this.elInput = new DOMElement("input", {
            type: "number",
            value: value.toString(),
            min: "0"
        }).getEl();
        this.elBtnPlus = new DOMElement("button", { type: "button" }, "+").getEl();
        this.elBtnMinus = new DOMElement("button", { type: "button" }).getEl();
        this.elBtnMinusContentsWrapper = new DOMElement("span", undefined, "-").getEl();
        this.el.addEventListener("focus", () => this.elInput.select());
        this.elBtnPlus.addEventListener("click", () => this.changeValue(1));
        this.elBtnMinus.addEventListener("click", () => this.changeValue(-1));
        this.elBtnMinus.append(this.elBtnMinusContentsWrapper);
        this.elControlsWrapper.append(this.elInput, this.elBtnPlus, this.elBtnMinus);
        this.el.append(this.elLabel, this.elControlsWrapper);
    }
    changeValue(value) {
        const currentValue = parseInt(this.elInput.value);
        this.elInput.value = (Math.max(currentValue + value, 0)).toString();
    }
}
//# sourceMappingURL=InputWinLoss.js.map