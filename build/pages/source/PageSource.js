import { Page } from "../Page.js";
import { DOMElement } from "../../shared/ui/DomElement.js";
import { Config } from "../../shared/Сonfig.js";
export class PageSource extends Page {
    constructor() {
        super();
        this.elTextWrapper = new DOMElement("p", { id: "source" }).getEl();
        this.config = Config.getInstance();
        document.body.classList.add("source");
        this.append(this.elTextWrapper);
        this.style.fontFamily = this.config.getFontFamily();
        window.addEventListener("storage", (event) => {
            if (event.key === "config") {
                this.config.readConfig();
                this.style.fontFamily = this.config.getFontFamily();
            }
        });
    }
    setText(value) {
        this.elTextWrapper.innerText = value;
    }
    getText() {
        return this.elTextWrapper.innerText;
    }
}
customElements.define("el-page-source", PageSource);
//# sourceMappingURL=PageSource.js.map