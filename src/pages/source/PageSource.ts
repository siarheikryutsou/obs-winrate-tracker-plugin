import {Page} from "../Page.js";
import {PageSettings} from "../settings/PageSettings";

export class PageSource extends Page {
    constructor() {
        super();
    }
}

customElements.define("el-page-source", PageSettings);