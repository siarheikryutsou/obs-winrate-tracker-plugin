import {DOMElement} from "./DomElement.js";
import {InputWinLoss} from "./InputWinLoss.js";

export class Main {

    private body:HTMLElement = document.body;
    private wins:number = 0;
    private loss:number = 0;
    private lastRecord:string | undefined;
    private locale:string = this.getLocale();
    private elInputWins:InputWinLoss | undefined;
    private elInputLoss:InputWinLoss | undefined;
    private elValueWinRate:HTMLLabelElement | undefined;
    private elLastRecord:HTMLParagraphElement | undefined;

    constructor() {
        this.readValues();

        if(window.location.hash === "#source") {
            this.showSources();
        } else {
            this.showControls();
        }
    }

    private showSources():void {
        const elSourceWrapper:HTMLParagraphElement = new DOMElement("p", {id:"source"}, this.getSourcesText()).getEl() as HTMLParagraphElement;
        this.body.classList.add("source");
        this.body.append(elSourceWrapper);

        setInterval(() => {
            this.readValues();
            elSourceWrapper.innerText = this.getSourcesText();
        }, 1000);
    }

    private getSourcesText():string {
        return `Wins: ${this.wins} | Loss: ${this.loss} | WinRate: ${this.getWinRateValue()}`;
    }

    private showControls():void {
        const elLabelWinRate = new DOMElement("label", undefined, "WinRate: ").getEl();
        const elLastLabel:HTMLLabelElement = new DOMElement("label", {id: "last-record-label"}, "Last Record:").getEl() as HTMLLabelElement;
        const elBtnSave:HTMLButtonElement = new DOMElement("button", undefined, "Save").getEl() as HTMLButtonElement;
        const elBtnReset:HTMLButtonElement = new DOMElement("button", undefined, "Reset All Records").getEl() as HTMLButtonElement;
        this.elLastRecord = new DOMElement("p", undefined, this.lastRecord).getEl() as HTMLParagraphElement;
        this.elInputWins = new InputWinLoss("input-wins", "Wins", this.wins);
        this.elInputLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        this.elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl() as HTMLLabelElement;

        elBtnReset.addEventListener("click", ():void => this.resetAllRecords());
        elBtnSave.addEventListener("click", ():void => this.saveRecords());
        this.elInputWins.addEventListener("change", ():void => this.onInputChange(this.elInputWins, "wins"));
        this.elInputLoss.addEventListener("change", ():void => this.onInputChange(this.elInputLoss, "loss"));

        this.body.append(this.elInputWins.getEl(), this.elInputLoss.getEl(), elLabelWinRate, this.elValueWinRate, elLastLabel, this.elLastRecord, elBtnSave, elBtnReset);
    }


    private resetAllRecords():void {
        this.setRecords(0, 0);
        this.saveRecords();
    }

    private setRecords(wins?:number, loss?:number):void {
        if(wins !== undefined) this.wins = wins;
        if(loss !== undefined) this.loss = loss;
        this.lastRecord = this.getLastRecordText();
        this.elInputWins?.setValue(this.wins);
        this.elInputLoss?.setValue(this.loss);
        if(this.elLastRecord) {
            this.elLastRecord.innerText = this.lastRecord;
        }
    }


    private saveRecords():void {
        this.setLSValue("wins", this.wins.toString());
        this.setLSValue("loss", this.loss.toString());
        this.setLSValue("lastRecord", this.getLastRecordText());
        this.setRecords();
    }


    private getWinRateValue():string {
        const result:number = this.wins ? (this.wins / (this.wins + this.loss) * 100) : 0;
        return result.toFixed(2) + "%";
    }

    private getLastRecordText():string {
        return `${this.getSourcesText()} \n ${this.getDateText()}`;
    }

    private getDateText():string {
        const date = new Date();
        return `${date.toLocaleDateString(this.locale)} (${date.toLocaleTimeString(this.locale)})`
    }

    private getLocale():string {
        return navigator.language.substring(0, 2).toLowerCase();
    }

    private readValues():void {
        const lsWins = this.getLSValue("wins");
        const lsLoss = this.getLSValue("loss");
        const lsLastRecord = this.getLSValue("lastRecord");
        this.wins = lsWins ? parseInt(lsWins) : 0;
        this.loss = lsLoss ? parseInt(lsLoss) : 0;
        this.lastRecord = lsLastRecord ? lsLastRecord : this.getLastRecordText()
    }

    private getLSValue(key:string):string | null {
        return window.localStorage.getItem(key);
    }

    private setLSValue(key:string, value:string):void {
        window.localStorage.setItem(key, value);
    }

    private onInputChange(input:InputWinLoss | undefined, field:string):void {
        if(!input) return;
        const newValue = input.getValue();
        if(field === "wins") {
            this.wins = newValue;
        } else {
            this.loss = newValue;
        }

        if(this.elValueWinRate) {
            this.elValueWinRate.innerText = this.getWinRateValue();
        }
    }
}

new Main();
