import { Page } from "../Page.js";
import { Config } from "../../shared/Сonfig.js";
export class PageSettings extends Page {
    constructor() {
        super();
        this.config = Config.getInstance();
        document.body.classList.add("settings");
        document.title = "Settings";
        this.innerHTML =
            `<fieldset>
                <legend>Save settings</legend>
                <div>
                    <label for="useSaveButton">Use "Save" button</label>
                    <input type="checkbox" id="useSaveButton"${this.config.getUseSaveBtnValue() ? "checked" : ""}>
                </div>
                <div>
                    <label for="showLastSaveInfo">Show "Last Save" info:</label>
                    <input type="checkbox" id="showLastSaveInfo"${this.config.getShowLastSaveInfoValue() ? "checked" : ""}>
                </div>
            </fieldset>
            <fieldset>
                <legend>Source settings</legend>
                <div>
                    <label for="fontFamily">Font Family</label>
                    <select id="fontFamily">
                        <option>Arial</option>
                        <option>Arial Black</option>
                        <option>Comic Sans MS</option>
                        <option>Courier New</option>
                        <option>Georgia</option>
                        <option>Impact</option>
                        <option>Lucida Console</option>
                        <option>Tahoma</option>
                        <option>Times New Roman</option>
                        <option>Trebuchet MS</option>
                        <option>Verdana</option>
                        <option>MS Sans Serif</option>
                        <option>MS Serif</option>
                    </select>
                </div>
            </fieldset>`.trim();
    }
    connectedCallback() {
        super.connectedCallback();
        //checkboxes
        this.querySelectorAll("input[type=checkbox]").forEach((input) => {
            input.addEventListener("change", (event) => {
                const el = event.currentTarget;
                if (el) {
                    const input = el;
                    this.config.setCheckBoxValue(input.id, input.checked);
                    this.config.saveConfig();
                }
            });
        });
        //font
        const currentFont = this.config.getFontFamily();
        const select = this.querySelector("#fontFamily");
        if (select) {
            const options = Array.from(select.options);
            for (let i = 0, len = options.length; i < len; i++) {
                const option = options[i];
                if (option.innerText === currentFont) {
                    option.selected = true;
                    break;
                }
            }
            select.addEventListener("change", (event) => {
                const select = event.currentTarget;
                this.config.setFontFamily(select.value);
                this.config.saveConfig();
            });
        }
    }
}
customElements.define("el-page-settings", PageSettings);
//# sourceMappingURL=PageSettings.js.map