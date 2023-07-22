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
            elSourceWrapper.innerText = this.getSourcesText();
        }, 1000);
    }
    getSourcesText() {
        return `Wins: ${this.wins} | Loss: ${this.loss} | WinRate: ${this.getWinRateValue()}`;
    }
    showControls() {
        this.elInputWins = new InputWinLoss("input-wins", "Wins", this.wins);
        this.elInputLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        const elLabelWinRate = new DOMElement("label", undefined, "WinRate: ").getEl();
        this.elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        const elLastLabel = new DOMElement("label", { id: "last-record-label" }, "Last Record:").getEl();
        const elLastRecord = new DOMElement("p", undefined, this.getLastRecordText()).getEl();
        const elBtnSave = new DOMElement("button", undefined, "Save").getEl();
        const elBtnReset = new DOMElement("button", undefined, "Reset All Records").getEl();
        elBtnReset.addEventListener("click", () => this.resetAllRecords());
        elBtnSave.addEventListener("click", () => this.saveRecords());
        this.elInputWins.addEventListener("change", () => this.onInputChange(this.elInputWins, "wins"));
        this.elInputLoss.addEventListener("change", () => this.onInputChange(this.elInputLoss, "loss"));
        this.body.append(this.elInputWins.getEl(), this.elInputLoss.getEl(), elLabelWinRate, this.elValueWinRate, elLastLabel, elLastRecord, elBtnSave, elBtnReset);
    }
    resetAllRecords() {
        this.setRecords(0, 0);
    }
    setRecords(wins, loss) {
        var _a, _b;
        this.wins = wins;
        this.loss = loss;
        this.saveRecords();
        (_a = this.elInputWins) === null || _a === void 0 ? void 0 : _a.setValue(wins);
        (_b = this.elInputLoss) === null || _b === void 0 ? void 0 : _b.setValue(loss);
    }
    saveRecords() {
        this.setLSValue("wins", this.wins.toString());
        this.setLSValue("loss", this.loss.toString());
    }
    getWinRateValue() {
        const result = this.wins ? (this.wins / (this.wins + this.loss) * 100) : 0;
        return result.toFixed(2) + "%";
    }
    getLastRecordText() {
        const date = new Date();
        return `Wins: ${this.wins} | Loss: ${this.loss} \n ${date.toLocaleDateString(this.locale)} (${date.toLocaleTimeString(this.locale)})`;
    }
    getLocale() {
        return "ru-RU";
    }
    readValues() {
        const lsWins = this.getLSValue("wins");
        const lsLoss = this.getLSValue("loss");
        this.wins = lsWins ? parseInt(lsWins) : 0;
        this.loss = lsLoss ? parseInt(lsLoss) : 0;
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
        if (this.elValueWinRate) {
            this.elValueWinRate.innerText = this.getWinRateValue();
        }
    }
}
new Main();
//# sourceMappingURL=Main.js.map