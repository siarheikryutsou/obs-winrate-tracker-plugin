import {DOMElement} from "./DomElement.js";

export class InputWinLoss {
    private readonly el:HTMLElement;
    private readonly elLabel:HTMLLabelElement;
    private readonly elControlsWrapper:HTMLDivElement;
    private readonly elInput:HTMLInputElement;
    private readonly elBtnPlus:HTMLButtonElement;
    private readonly elBtnMinus:HTMLButtonElement;

    constructor(id:string, label:string, value:number) {
        this.el = new DOMElement("div", {id: id, class: "input-win-loss-wrapper"}).getEl();
        this.elLabel = new DOMElement("label", undefined, label).getEl() as HTMLLabelElement;
        this.elControlsWrapper = new DOMElement("div", {class: "controls-wrapper"}).getEl() as HTMLDivElement;
        this.elInput = new DOMElement("input", {
            type: "number",
            value: value.toString(),
            min: "0"
        }).getEl() as HTMLInputElement;
        this.elBtnPlus = new DOMElement("button", {
             type: "button"
        }, "+").getEl() as HTMLButtonElement;
        this.elBtnMinus = new DOMElement("button", {
             type: "button"
        }, "-").getEl() as HTMLButtonElement;
        this.el.addEventListener("focus", () => this.elInput.select());
        this.elControlsWrapper.append(this.elInput, this.elBtnPlus, this.elBtnMinus);
        this.el.append(this.elLabel, this.elControlsWrapper);
    }

    getEl():HTMLElement {
        return this.el;
    }
}
