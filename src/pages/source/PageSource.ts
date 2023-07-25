import {Page} from "../Page.js";
import {DOMElement} from "../../shared/ui/DomElement.js";

export class PageSource extends Page {

    private elTextWrapper:HTMLParagraphElement = new DOMElement("p", {id:"source"}).getEl() as HTMLParagraphElement;

    constructor() {
        super();
        document.body.classList.add("source");
        this.append(this.elTextWrapper);
    }

    setText(value:string):void {
        this.elTextWrapper.innerText = value;
    }

    getText():string {
        return this.elTextWrapper.innerText;
    }
}

customElements.define("el-page-source", PageSource);