import {InputWinLoss} from "../shared/ui/InputWinLoss.js";
import {DOMElement} from "../shared/ui/DomElement.js";

export class Main {

    private container:HTMLDivElement = document.getElementById("app") as HTMLDivElement;
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

        const hash:string = window.location.hash;

        if(hash === "#source") {
            this.showSources();
        } else if(hash === "#settings") {
            this.showSettings();
        } else {
            this.showDock();
        }
    }

    private showSources():void {
        const elSourceWrapper:HTMLParagraphElement = new DOMElement("p", {id:"source"}, this.getSourcesText()).getEl() as HTMLParagraphElement;
        document.body.classList.add("source");
        this.container.append(elSourceWrapper);

        setInterval(() => {
            this.readValues();
            const currentValues:string = this.getSourcesText();
            if(elSourceWrapper.innerText !== currentValues) {
                elSourceWrapper.innerText = currentValues;
            }
        }, 1000);
    }


    private showDock():void {
        const elLabelWinRate = new DOMElement("label", undefined, "WinRate: ").getEl();
        const elLastLabel:HTMLLabelElement = new DOMElement("label", {id: "last-record-label"}, "Last Record:").getEl() as HTMLLabelElement;
        const elBtnSave:HTMLButtonElement = new DOMElement("button", undefined, "Save").getEl() as HTMLButtonElement;
        const elBtnReset:HTMLButtonElement = new DOMElement("button", undefined, "Reset All Records").getEl() as HTMLButtonElement;
        const elFooter:HTMLDivElement = new DOMElement("div", {id: "footer"}).getEl() as HTMLDivElement;
        const elSettingsBtn:HTMLButtonElement = new DOMElement("button", {class: "small icon"}).getEl() as HTMLButtonElement;
        this.elLastRecord = new DOMElement("p", undefined, this.getShortLastRecordText()).getEl() as HTMLParagraphElement;
        this.elInputWins = new InputWinLoss("input-wins", "Wins", this.wins);
        this.elInputLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        this.elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl() as HTMLLabelElement;

        elBtnReset.addEventListener("click", ():void => this.resetAllRecords());
        elBtnSave.addEventListener("click", ():void => this.saveRecords());
        this.elInputWins.addEventListener("change", ():void => this.onInputChange(this.elInputWins, "wins"));
        this.elInputLoss.addEventListener("change", ():void => this.onInputChange(this.elInputLoss, "loss"));

        elSettingsBtn.addEventListener("click", ():void => this.openSettings())

        elSettingsBtn.append(
            new DOMElement("img", {src: "./build/static/images/settings_icon.svg"}).getEl() as HTMLImageElement
        )
        elFooter.append(elSettingsBtn);

        this.container.append(
            this.elInputWins.getEl(),
            this.elInputLoss.getEl(),
            elLabelWinRate,
            this.elValueWinRate,
            elLastLabel,
            this.elLastRecord,
            elBtnSave,
            elBtnReset,
            elFooter
        );
    }


    private showSettings():void {
        const elH1:HTMLHeadingElement = new DOMElement("h1", undefined, "Coming soon...").getEl() as HTMLHeadingElement;
        const elP:HTMLParagraphElement = new DOMElement("p", undefined, "Currently, this section is under development. In the future, you will be able to customize and style the output of results for your stream, add animations, and configure colors and styles. Stay tuned for updates.").getEl() as HTMLParagraphElement;
        document.body.classList.add("settings");
        document.title = "Settings";
        this.container.append(elH1, elP);
    }


    private getSourcesText(format?:string):string {
        return `Wins: ${this.wins} | Loss: ${this.loss} | WinRate: ${this.getWinRateValue()}`;
    }

    private getShortLastRecordText():string {
        if(this.lastRecord) {
            return this.lastRecord.replace("Wins", "W").replace("Loss", "L").replace("WinRate", "WR");
        }
        return "";
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
            this.elLastRecord.innerText = this.getShortLastRecordText();
        }
        this.setWinRateValue();
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
        this.setWinRateValue();

    }


    private setWinRateValue():void {
        if(this.elValueWinRate) {
            this.elValueWinRate.innerText = this.getWinRateValue();
        }
    }

    private openSettings():void {
        window.open(`${window.location.href}#settings`, "_blank", "width=640,height=480");
    }
}

new Main();