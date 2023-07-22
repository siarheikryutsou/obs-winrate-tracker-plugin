import { DOMElement } from "./DomElement.js";
import { InputWinLoss } from "./InputWinLoss.js";
export class Main {
    constructor() {
        this.body = document.body;
        this.wins = 0;
        this.loss = 0;
        this.locale = this.getLocale();
        this.setValues();
        if (window.location.hash === "#source") {
            this.showSources();
        }
        else {
            this.showControls();
        }
    }
    showSources() {
        const text = `Wins: ${this.wins} | Loss: ${this.loss} | WinRate: ${this.getWinRateValue()}`;
        const elSourceWrapper = new DOMElement("p", { id: "source" }, text).getEl();
        this.body.classList.add("source");
        this.body.append(elSourceWrapper);
        setInterval(() => {
            const record = this.getLSValue("record");
            if (record) {
                elSourceWrapper.innerText = record;
                console.log("record:", record);
            }
        }, 1000);
    }
    showControls() {
        const elInputWins = new InputWinLoss("input-wins", "Wins", this.wins);
        const elInputLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        const elLabelWinRate = new DOMElement("label", undefined, "WinRate: ").getEl();
        const elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        const elLastLabel = new DOMElement("label", undefined, "Last Record:").getEl();
        const elLastRecord = new DOMElement("p", undefined, this.getLastRecordText()).getEl();
        const elBtnSave = new DOMElement("button", undefined, "Save").getEl();
        const elBtnReset = new DOMElement("button", undefined, "Reset All Records").getEl();
        this.body.append(elInputWins.getEl(), elInputLoss.getEl(), elLabelWinRate, elValueWinRate, elLastLabel, elLastRecord, elBtnSave, elBtnReset);
    }
    getWinRateValue() {
        const result = this.wins ? (this.wins / (this.wins + this.loss) * 100) : 0;
        return result.toFixed(2) + "%";
    }
    getLastRecordText() {
        const date = new Date();
        return `Wins: ${this.wins} | Loss: ${this.loss} | ${date.toLocaleDateString(this.locale)} (${date.toLocaleTimeString("ru-RU")})`;
    }
    getLocale() {
        return "ru-RU";
    }
    setValues() {
        const lsWins = this.getLSValue("wins");
        const lsLoss = this.getLSValue("wins");
        this.wins = lsWins ? parseInt(lsWins) : 0;
        this.wins = lsLoss ? parseInt(lsLoss) : 0;
    }
    getLSValue(key) {
        return window.localStorage.getItem(key);
    }
    setLSValue(key, value) {
        window.localStorage.setItem(key, value);
    }
}
new Main();
//# sourceMappingURL=Main.js.map