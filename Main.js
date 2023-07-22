import { DOMElement } from "./DomElement.js";
import { InputWinLoss } from "./InputWinLoss.js";
import { WinRateModel } from "./WinRateModel.js";
export class Main {
    constructor() {
        this.body = document.body;
        this.wins = 0;
        this.loss = 0;
        this.locale = this.getLocale();
        const filePath = window.localStorage.getItem("filePath");
        if (window.location.hash === "#source") {
            this.showSources();
        }
        else {
            this.showControls();
        }
        console.log(filePath);
    }
    showSources() {
        this.body.classList.add("source");
        const elSourceWrapper = new DOMElement("p", { id: "source" }, "Hello!").getEl();
        this.body.append(elSourceWrapper);
    }
    showControls() {
        const winRateModel = new WinRateModel({
            wins: 0,
            loss: 0,
            winRate: 0
        });
        const elInputWins = new InputWinLoss("input-wins", "Wins", this.wins);
        const elInputLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        const elLabelWinRate = new DOMElement("label", undefined, "Winrate: ").getEl();
        const elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        const elLastRecord = new DOMElement("p", undefined, this.getLastRecordText()).getEl();
        this.body.append(elInputWins.getEl(), elInputLoss.getEl(), elLabelWinRate, elValueWinRate, elLastRecord);
        /*winRateModel.addEventListener("CHANGE:winRate", (event:Event):void => {
            console.log("changed:", winRateModel.get("winRate"));
        });

        winRateModel.set("winRate", 1);*/
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
}
new Main();
//# sourceMappingURL=Main.js.map