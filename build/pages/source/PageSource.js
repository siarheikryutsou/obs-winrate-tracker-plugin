import { Page } from "../Page.js";
import { DOMElement } from "../../shared/ui/DomElement.js";
import { Config } from "../../shared/Config.js";
export class PageSource extends Page {
    constructor() {
        super();
        this.elTextWrapper = new DOMElement("p", { id: "source" }).getEl();
        this.config = Config.getInstance();
        document.body.classList.add("source");
        this.append(this.elTextWrapper);
        this.setStyles();
        window.addEventListener("storage", (event) => {
            if (event.key === "config") {
                this.config.readConfig();
                this.setStyles();
            }
        });
    }
    setText(value) {
        this.elTextWrapper.innerText = value;
    }
    getText() {
        return this.elTextWrapper.innerText;
    }
    setStyles() {
        this.style.fontFamily = this.config.getFontFamily();
        this.style.fontSize = this.config.getFontSize() + "px";
        this.style.color = this.config.getFontColor();
    }
}
customElements.define("el-page-source", PageSource);
//# sourceMappingURL=PageSource.js.map