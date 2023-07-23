import { DOMElement } from "./DomElement.js";
import { InputWinLoss } from "./InputWinLoss.js";
export class Main {
    constructor() {
        this.body = document.body;
        this.wins = 0;
        this.loss = 0;
        this.locale = this.getLocale();
        this.readValues();
        if (window.location.hash === "#source") {
            this.showSources();
        }
        else {
            this.showControls();
        }
    }
    showSources() {
        const elSourceWrapper = new DOMElement("p", { id: "source" }, this.getSourcesText()).getEl();
        this.body.classList.add("source");
        this.body.append(elSourceWrapper);
        setInterval(() => {
            this.readValues();
            const currentValues = this.getSourcesText();
            if (elSourceWrapper.innerText !== currentValues) {
                elSourceWrapper.innerText = currentValues;
            }
        }, 1000);
    }
    getSourcesText(format) {
        return `Wins: ${this.wins} | Loss: ${this.loss} | WinRate: ${this.getWinRateValue()}`;
    }
    getShortLastRecordText() {
        if (this.lastRecord) {
            return this.lastRecord.replace("Wins", "W").replace("Loss", "L").replace("WinRate", "WR");
        }
        return "";
    }
    showControls() {
        const elLabelWinRate = new DOMElement("label", undefined, "WinRate: ").getEl();
        const elLastLabel = new DOMElement("label", { id: "last-record-label" }, "Last Record:").getEl();
        const elBtnSave = new DOMElement("button", undefined, "Save").getEl();
        const elBtnReset = new DOMElement("button", undefined, "Reset All Records").getEl();
        this.elLastRecord = new DOMElement("p", undefined, this.getShortLastRecordText()).getEl();
        this.elInputWins = new InputWinLoss("input-wins", "Wins", this.wins);
        this.elInputLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        this.elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        elBtnReset.addEventListener("click", () => this.resetAllRecords());
        elBtnSave.addEventListener("click", () => this.saveRecords());
        this.elInputWins.addEventListener("change", () => this.onInputChange(this.elInputWins, "wins"));
        this.elInputLoss.addEventListener("change", () => this.onInputChange(this.elInputLoss, "loss"));
        this.body.append(this.elInputWins.getEl(), this.elInputLoss.getEl(), elLabelWinRate, this.elValueWinRate, elLastLabel, this.elLastRecord, elBtnSave, elBtnReset);
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
    }
    setWinRateValue() {
        if (this.elValueWinRate) {
            this.elValueWinRate.innerText = this.getWinRateValue();
        }
    }
}
new Main();
//# sourceMappingURL=Main.js.map