import {Page} from "../Page.js";
import {Config} from "../../shared/Сonfig.js";
import {IConfig, IConfigCheckboxes} from "../../shared/interfaces/IConfig";

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
            </fieldset>`.trim();
    }

    connectedCallback(): void {
        super.connectedCallback();
        //checkboxes
        this.querySelectorAll("input[type=checkbox]").forEach((input: Element): void => {
            input.addEventListener("change", (event: Event): void => {
                const el:EventTarget | null = event.currentTarget;
                if(el) {
                    const input: HTMLInputElement = el as HTMLInputElement;
                    this.config.setCheckBoxValue(input.id as keyof IConfigCheckboxes, input.checked);
                    this.config.saveConfig();
                }
            })
        });

        //font

        const currentFont:string = this.config.getFontFamily();

        const select:HTMLSelectElement | null = this.querySelector("#fontFamily");

        if(select) {
            const options:HTMLOptionElement[] = Array.from(select.options);
            for(let i: number = 0, len: number = options.length; i < len; i++) {
                const option: HTMLOptionElement = options[i];
                if(option.innerText === currentFont) {
                    option.selected = true;
                    break;
                }
            }

            select.addEventListener("change", (event: Event): void => {
                const select: HTMLSelectElement = event.currentTarget as HTMLSelectElement;
                this.config.setFontFamily(select.value);
                this.config.saveConfig();
            })
        }

        const fontSizeInput:HTMLInputElement | null = document.querySelector("#fontSize");
        if(fontSizeInput) {
            fontSizeInput.addEventListener("change", (event: Event): void => {
                this.config.setFontSize(parseInt(fontSizeInput.value));
                this.config.saveConfig();
            })
        }
    }

}

customElements.define("el-page-settings", PageSettings);