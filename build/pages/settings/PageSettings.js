import { Page } from "../Page.js";
import { DOMElement } from "../../shared/ui/DomElement.js";
export class PageSettings extends Page {
    constructor() {
        super();
        const elH1 = new DOMElement("h1", undefined, "Coming soon...").getEl();
        const elP = new DOMElement("p", undefined, "Currently, this section is under development. In the future, you will be able to customize and style the output of results for your stream, add animations, and configure colors and styles. Stay tuned for updates.").getEl();
        document.body.classList.add("settings");
        document.title = "Settings";
        this.append(elH1, elP);
    }
}
customElements.define("el-page-settings", PageSettings);
//# sourceMappingURL=PageSettings.js.map