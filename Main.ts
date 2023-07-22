import {DOMElement} from "./DomElement.js";
import {InputWinLoss} from "./InputWinLoss.js";

export class Main {

    private body:HTMLElement = document.body;
    private wins:number = 0;
    private loss:number = 0;
    private locale:string = this.getLocale();

    constructor() {
        this.setValues();

        if(window.location.hash === "#source") {
            this.showSources();
        } else {
            this.showControls();
        }
    }

    private showSources():void {
        const text = `Wins: ${this.wins} | Loss: ${this.loss} | WinRate: ${this.getWinRateValue()}`;
        const elSourceWrapper:HTMLParagraphElement = new DOMElement("p", {id:"source"}, text).getEl() as HTMLParagraphElement;
        this.body.classList.add("source");
        this.body.append(elSourceWrapper);

        setInterval(() => {
            const record = this.getLSValue("record");
            if(record) {
                elSourceWrapper.innerText = record;
                console.log("record:", record);
            }
        }, 1000);
    }

    private showControls():void {
        const elInputWins:InputWinLoss = new InputWinLoss("input-wins", "Wins", this.wins);
        const elInputLoss:InputWinLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        const elLabelWinRate = new DOMElement("label", undefined, "WinRate: ").getEl();
        const elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        const elLastLabel:HTMLLabelElement = new DOMElement("label", undefined, "Last Record:").getEl() as HTMLLabelElement;
        const elLastRecord = new DOMElement("p", undefined, this.getLastRecordText()).getEl();
        const elBtnSave:HTMLButtonElement = new DOMElement("button", undefined, "Save").getEl() as HTMLButtonElement;
        const elBtnReset:HTMLButtonElement = new DOMElement("button", undefined, "Reset All Records").getEl() as HTMLButtonElement;

        this.body.append(elInputWins.getEl(), elInputLoss.getEl(), elLabelWinRate, elValueWinRate, elLastLabel, elLastRecord, elBtnSave, elBtnReset);
    }

    private getWinRateValue():string {
        const result:number = this.wins ? (this.wins / (this.wins + this.loss) * 100) : 0;
        return result.toFixed(2) + "%";
    }

    private getLastRecordText():string {
        const date = new Date();
        return `Wins: ${this.wins} | Loss: ${this.loss} | ${date.toLocaleDateString(this.locale)} (${date.toLocaleTimeString("ru-RU")})`;
    }

    private getLocale():string {
        return "ru-RU";
    }

    private setValues():void {
        const lsWins = this.getLSValue("wins");
        const lsLoss = this.getLSValue("wins");
        this.wins = lsWins ? parseInt(lsWins) : 0;
        this.wins = lsLoss ? parseInt(lsLoss) : 0;
    }

    private getLSValue(key:string):string | null {
        return window.localStorage.getItem(key);
    }

    private setLSValue(key:string, value:string):void {
        window.localStorage.setItem(key, value);
    }
}

new Main();
