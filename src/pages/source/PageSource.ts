import {Page} from "../Page.js";
import {DOMElement} from "../../shared/ui/DomElement.js";
import {Config} from "../../shared/Config.js";

export class PageSource extends Page {

    private elTextWrapper:HTMLParagraphElement = new DOMElement("p", {id:"source"}).getEl() as HTMLParagraphElement;
    private config:Config = Config.getInstance();

    constructor() {
        super();
        document.body.classList.add("source");
        this.append(this.elTextWrapper);
        this.setStyles();


        window.addEventListener("storage", (event: StorageEvent): void => {
            if(event.key === "config") {
                this.config.readConfig();
                this.setStyles();
            }
        })
    }

    setText(value:string):void {
        this.elTextWrapper.innerText = value;
    }

    getText():string {
        return this.elTextWrapper.innerText;
    }


    private setStyles(): void {
        this.style.fontFamily = this.config.getFontFamily();
        this.style.fontSize = this.config.getFontSize() + "px";
    }
}

customElements.define("el-page-source", PageSource);