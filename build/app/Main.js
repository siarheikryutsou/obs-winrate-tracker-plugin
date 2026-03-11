import { InputWinLoss } from "../shared/ui/InputWinLoss.js";
import { DOMElement } from "../shared/ui/DomElement.js";
import { PageSettings } from "../pages/settings/PageSettings.js";
import { PageSource } from "../pages/source/PageSource.js";
import { Config } from "../shared/Config.js";
import { TEXT_WIN, TEXT_LOSS, TEXT_WIN_RATE, TEXT_WIN_SHORT, TEXT_LOSS_SHORT, TEXT_WIN_RATE_SHORT, TEXT_LAST_RECORD, TEXT_SAVE, TEXT_RESET } from "../shared/Constants.js";
export class Main {
    constructor() {
        this.container = document.getElementById("app");
        this.wins = 0;
        this.loss = 0;
        this.locale = this.getLocale();
        this.config = Config.getInstance();
        this.readValues();
        this.config.readConfig();
        const hash = window.location.hash;
        if (hash === "#source") {
            this.showSources();
        }
        else if (hash === "#settings") {
            this.showSettings();
        }
        else {
            this.showDock();
        }
    }
    showSources() {
        const pageSource = new PageSource();
        pageSource.setText(this.getSourcesText());
        this.container.append(pageSource);
        addEventListener("storage", (event) => {
            switch (event.key) {
                case "wins":
                case "loss":
                    this.readValues();
                    const sourceText = this.getSourcesText();
                    if (pageSource.getText() !== sourceText) {
                        pageSource.setText(sourceText);
                    }
                    break;
            }
        });
    }
    showDock() {
        const useSaveBtn = this.config.getUseSaveBtnValue();
        const showLastSaveInfo = this.config.getShowLastSaveInfoValue();
        const elLabelWinRate = new DOMElement("label", undefined, `${TEXT_WIN_RATE}: `).getEl();
        const elLastLabel = new DOMElement("label", { id: "last-record-label" }, TEXT_LAST_RECORD).getEl();
        const elBtnSave = new DOMElement("button", undefined, TEXT_SAVE).getEl();
        const elBtnReset = new DOMElement("button", undefined, TEXT_RESET).getEl();
        const elFooter = new DOMElement("div", { id: "footer" }).getEl();
        const elSettingsBtn = new DOMElement("button", { class: "small icon" }).getEl();
        this.elLastRecord = new DOMElement("p", undefined, this.getShortLastRecordText()).getEl();
        this.elInputWins = new InputWinLoss("input-wins", TEXT_WIN, this.wins);
        this.elInputLoss = new InputWinLoss("input-loss", TEXT_LOSS, this.loss);
        this.elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        elBtnSave.addEventListener("click", () => this.saveRecords());
        elBtnReset.addEventListener("click", () => this.resetAllRecords());
        this.elInputWins.addEventListener("change", () => this.onInputChange(this.elInputWins, "wins"));
        this.elInputLoss.addEventListener("change", () => this.onInputChange(this.elInputLoss, "loss"));
        elSettingsBtn.addEventListener("click", () => this.openSettings());
        elSettingsBtn.append(new DOMElement("img", { src: "./build/static/images/settings_icon.svg" }).getEl());
        elFooter.append(elSettingsBtn);
        this.container.append(this.elInputWins.getEl(), this.elInputLoss.getEl(), elLabelWinRate, this.elValueWinRate, elLastLabel, this.elLastRecord, elBtnSave, elBtnReset, elFooter);
        if (!useSaveBtn) {
            elBtnSave.style.display = "none";
        }
        if (!showLastSaveInfo) {
            elLastLabel.style.display = "none";
            this.elLastRecord.style.display = "none";
        }
        window.addEventListener("storage", (event) => {
            if (event.key === "config") {
                this.config.readConfig();
                elBtnSave.style.display = this.config.getUseSaveBtnValue() ? "block" : "none";
                const showLastSaveInfo = this.config.getShowLastSaveInfoValue();
                elLastLabel.style.display = showLastSaveInfo ? "block" : "none";
                if (this.elLastRecord) {
                    this.elLastRecord.style.display = showLastSaveInfo ? "block" : "none";
                }
            }
        });
    }
    showSettings() {
        const settings = new PageSettings();
        this.container.append(settings);
    }
    getSourcesText(format) {
        return `${TEXT_WIN}: ${this.wins} | ${TEXT_LOSS}: ${this.loss} | ${TEXT_WIN_RATE}: ${this.getWinRateValue()}`;
    }
    getShortLastRecordText() {
        if (this.lastRecord) {
            return this.lastRecord.replace(TEXT_WIN_RATE, TEXT_WIN_RATE_SHORT).replace(TEXT_WIN, TEXT_WIN_SHORT).replace(TEXT_LOSS, TEXT_LOSS_SHORT);
        }
        return "";
    }
    resetAllRecords() {
        this.setRecords(0, 0);
        this.saveRecords();
    }
    setRecords(wins, loss) {
        var _a, _b;
        if (wins !== undefined)
            this.wins = wins;
        if (loss !== undefined)
            this.loss = loss;
        this.lastRecord = this.getLastRecordText();
        (_a = this.elInputWins) === null || _a === void 0 ? void 0 : _a.setValue(this.wins);
        (_b = this.elInputLoss) === null || _b === void 0 ? void 0 : _b.setValue(this.loss);
        if (this.elLastRecord) {
            this.elLastRecord.innerText = this.getShortLastRecordText();
        }
        this.setWinRateValue();
    }
    saveRecords() {
        this.setLSValue("wins", this.wins.toString());
        this.setLSValue("loss", this.loss.toString());
        this.setLSValue("lastRecord", this.getLastRecordText());
        this.setRecords();
    }
    getWinRateValue() {
        const result = this.wins ? (this.wins / (this.wins + this.loss) * 100) : 0;
        return result.toFixed(2) + "%";
    }
    getLastRecordText() {
        return `${this.getSourcesText()} \n ${this.getDateText()}`;
    }
    getDateText() {
        const date = new Date();
        return `${date.toLocaleDateString(this.locale)} (${date.toLocaleTimeString(this.locale)})`;
    }
    getLocale() {
        return navigator.language.substring(0, 2).toLowerCase();
    }
    readValues() {
        const lsWins = this.getLSValue("wins");
        const lsLoss = this.getLSValue("loss");
        const lsLastRecord = this.getLSValue("lastRecord");
        this.wins = lsWins ? parseInt(lsWins) : 0;
        this.loss = lsLoss ? parseInt(lsLoss) : 0;
        this.lastRecord = lsLastRecord ? lsLastRecord : this.getLastRecordText();
    }
    getLSValue(key) {
        return window.localStorage.getItem(key);
    }
    setLSValue(key, value) {
        window.localStorage.setItem(key, value);
    }
    onInputChange(input, field) {
        if (!input)
            return;
        const newValue = input.getValue();
        if (field === "wins") {
            this.wins = newValue;
        }
        else {
            this.loss = newValue;
        }
        this.setWinRateValue();
        if (!this.config.getUseSaveBtnValue()) {
            this.saveRecords();
        }
    }
    setWinRateValue() {
        if (this.elValueWinRate) {
            this.elValueWinRate.innerText = this.getWinRateValue();
        }
    }
    openSettings() {
        window.open(`${window.location.href}#settings`, "_blank", "width=640,height=480");
    }
}
new Main();
//# sourceMappingURL=Main.js.map