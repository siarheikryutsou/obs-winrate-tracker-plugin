import {DOMElement} from "./DomElement.js";
import {DomElementBase} from "./DomElementBase.js";

export class InputWinLoss extends DomElementBase {
    private readonly elLabel:HTMLLabelElement;
    private readonly elControlsWrapper:HTMLDivElement;
    private readonly elInput:HTMLInputElement;
    private readonly elBtnPlus:HTMLButtonElement;
    private readonly elBtnMinus:HTMLButtonElement;
    private readonly elBtnMinusContentsWrapper:HTMLSpanElement;

    constructor(id:string, label:string, value:number) {
        super(
            new DOMElement("div", {id: id, class: "input-win-loss-wrapper"}).getEl()
        );
        this.elLabel = new DOMElement("label", undefined, label).getEl() as HTMLLabelElement;
        this.elControlsWrapper = new DOMElement("div", {class: "controls-wrapper"}).getEl() as HTMLDivElement;
        this.elInput = new DOMElement("input", {
            type: "number",
            value: value.toString(),
            min: "0"
        }).getEl() as HTMLInputElement;
        this.elBtnPlus = new DOMElement("button", {type: "button"}, "+").getEl() as HTMLButtonElement;
        this.elBtnMinus = new DOMElement("button", {type: "button"}).getEl() as HTMLButtonElement;
        this.elBtnMinusContentsWrapper = new DOMElement("span", undefined, "-").getEl();
        this.el.addEventListener("focus", () => this.elInput.select());
        this.elBtnPlus.addEventListener("click", () => this.changeValue(1));
        this.elBtnMinus.addEventListener("click", () => this.changeValue(-1));
        this.elBtnMinus.append(this.elBtnMinusContentsWrapper);
        this.elControlsWrapper.append(this.elInput, this.elBtnPlus, this.elBtnMinus);
        this.elInput.addEventListener("change", (event) => this.dispatchChange());
        this.el.append(this.elLabel, this.elControlsWrapper);
    }

    private changeValue(value:number):void {
        const currentValue:number = parseInt(this.elInput.value);
        this.elInput.value = (Math.max(currentValue + value, 0)).toString();
        this.dispatchChange();
    }

    private dispatchChange():void {
        super.dispatchEvent(new Event("change"));
    }

    getValue():number {
        return parseInt(this.elInput.value);
    }


    setValue(value:number) {
        this.elInput.value = value.toString();
    }
}
