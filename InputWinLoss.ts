import {DOMElement} from "./DomElement.js";

export class InputWinLoss {
    private readonly el:HTMLElement;
    private readonly elLabel:HTMLLabelElement;
    private readonly elInput:HTMLInputElement;
    constructor(id:string, label:string, value:number) {
        this.el = new DOMElement("div", {id: id}).getEl();
        this.elLabel = new DOMElement("label", undefined, label).getEl() as HTMLLabelElement;
        this.elInput = new DOMElement("input", {
            type: "number",
            value: value.toString(),
            min: "0"
        }).getEl() as HTMLInputElement;
        this.el.addEventListener("focus", () => this.elInput.select());

        this.el.append(this.elLabel, this.elInput);
    }

    getEl():HTMLElement {
        return this.el;
    }
}