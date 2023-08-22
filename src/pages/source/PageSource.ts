import {Page} from "../Page.js";
import {DOMElement} from "../../shared/ui/DomElement.js";
import {Config} from "../../shared/Сonfig.js";

export class PageSource extends Page {

    private elTextWrapper:HTMLParagraphElement = new DOMElement("p", {id:"source"}).getEl() as HTMLParagraphElement;
    private config:Config = Config.getInstance();

    constructor() {
        super();
        document.body.classList.add("source");
        this.append(this.elTextWrapper);
        this.style.fontFamily = this.config.getFontFamily();

        window.addEventListener("storage", (event: StorageEvent): void => {
            if(event.key === "config") {
                this.config.readConfig();
                this.style.fontFamily = this.config.getFontFamily();
            }
        })
    }

    setText(value:string):void {
        this.elTextWrapper.innerText = value;
    }

    getText():string {
        return this.elTextWrapper.innerText;
    }
}

customElements.define("el-page-source", PageSource);