import { Page } from "../Page.js";
import { Config } from "../../shared/Config.js";
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
                        <!--<option>Times New Roman</option>-->
                        <option>Trebuchet MS</option>
                        <option>Verdana</option>
                        <option>MS Sans Serif</option>
                        <!--<option>MS Serif</option>-->
                    </select>
                </div>
                <div>
                    <label for="fontSize">Font Size</label>
                    <input type="number" id="fontSize" value="${this.config.getFontSize()}">
                </div>
                <div>
                    <label for="fontColor">Font Color</label>
                    <input type="color" id="fontColor" value="${this.config.getFontColor()}">
                </div>
            </fieldset>
            <div class="kofi-wrapper">
                <a href="https://ko-fi.com/R6R71VSV1A" target="_blank" rel="noopener noreferrer" class="kofi-link">
                    <img src="https://storage.ko-fi.com/cdn/brandasset/v2/support_me_on_kofi_badge_dark.png" alt="Support me on Ko-fi" class="kofi-badge">
                </a>
            </div>`.trim();
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
        const fontSizeInput = document.querySelector("#fontSize");
        if (fontSizeInput) {
            fontSizeInput.addEventListener("change", (event) => {
                this.config.setFontSize(parseInt(fontSizeInput.value));
                this.config.saveConfig();
            });
        }
        const fontColorInput = document.querySelector("#fontColor");
        if (fontColorInput) {
            fontColorInput.addEventListener("change", (event) => {
                this.config.setFontColor(fontColorInput.value);
                this.config.saveConfig();
            });
        }
    }
}
customElements.define("el-page-settings", PageSettings);
//# sourceMappingURL=PageSettings.js.map