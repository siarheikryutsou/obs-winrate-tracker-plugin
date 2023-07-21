import {DOMElement} from "./DomElement.js";
import {InputWinLoss} from "./InputWinLoss.js";

export class Main {

    private body:HTMLElement = document.body;
    private wins:number = 0;
    private loss:number = 0;
    private locale:string = this.getLocale();

    constructor() {
        const elInputWins:InputWinLoss = new InputWinLoss("input-wins", "Wins", this.wins);
        const elInputLoss:InputWinLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        const elLabelWinRate = new DOMElement("label", undefined, "Winrate:").getEl();
        const elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        const elLastRecord = new DOMElement("p", undefined, this.getLastRecordText()).getEl();

        this.body.append(elInputWins.getEl(), elInputLoss.getEl(), elLabelWinRate, elValueWinRate, elLastRecord);
    }

    private getWinRateValue():string {
        const result:number = this.wins ? (this.wins / (this.wins + this.loss) * 100) : 0;
        return result.toFixed(2) + "%";
    }

    private getLastRecordText():string {
        const date = new Date();
        return `${this.wins}/${this.loss} | ${date.toLocaleDateString(this.locale)} (${date.toLocaleTimeString("ru-RU")})`;
    }

    private getLocale():string {
        return "ru-RU";
    }
}

new Main();