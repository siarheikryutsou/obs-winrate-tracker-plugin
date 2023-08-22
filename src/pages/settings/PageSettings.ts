import {Page} from "../Page.js";
import {Config} from "../../shared/Сonfig.js";
import {IConfig} from "../../shared/interfaces/IConfig";

export class PageSettings extends Page {

    private config:Config = Config.getInstance();
    constructor() {
        super();
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

    connectedCallback(): void {
        super.connectedCallback();
        this.querySelectorAll("input").forEach((input: HTMLInputElement): void => {
            input.addEventListener("change", (event: Event): void => {
                const el:EventTarget | null = event.currentTarget;
                if(el) {
                    const input: HTMLInputElement = el as HTMLInputElement;
                    this.config.setValue(input.id as keyof IConfig, input.checked);
                    this.config.saveConfig();
                }
            })
        });
        this.config.saveConfig();
    }

}

customElements.define("el-page-settings", PageSettings);