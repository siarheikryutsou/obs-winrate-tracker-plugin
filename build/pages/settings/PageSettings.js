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
                    <input type="checkbox" id="useSaveButton"${this.config.getValue("useSaveButton") ? "checked" : ""}>
                </div>
                <div>
                    <label for="showLastSaveInfo">Show "Last Save" info:</label>
                    <input type="checkbox" id="showLastSaveInfo"${this.config.getValue("showLastSaveInfo") ? "checked" : ""}>
                </div>
            </fieldset>
            <fieldset>
                <legend>Source settings</legend>
                <h3>Coming soon...</h3>
            </fieldset>`.trim();
    }
    connectedCallback() {
        super.connectedCallback();
        this.querySelectorAll("input").forEach((input) => {
            input.addEventListener("change", (event) => {
                const el = event.currentTarget;
                if (el) {
                    const input = el;
                    this.config.setValue(input.id, input.checked);
                    this.config.saveConfig();
                }
            });
        });
        this.config.saveConfig();
    }
}
customElements.define("el-page-settings", PageSettings);
//# sourceMappingURL=PageSettings.js.map