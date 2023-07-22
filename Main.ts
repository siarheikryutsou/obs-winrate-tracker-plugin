import {DOMElement} from "./DomElement.js";
import {InputWinLoss} from "./InputWinLoss.js";
import {WinRateModel} from "./WinRateModel.js";

export class Main {

    private body:HTMLElement = document.body;
    private wins:number = 0;
    private loss:number = 0;
    private locale:string = this.getLocale();

    constructor() {

        const filePath = window.localStorage.getItem("filePath");

        if(!filePath) {
            this.showCreateFile();
            //this.showControls();
        } else {
            this.showControls();
        }

        console.log(filePath);
    }

    private async createFile():Promise<void> {
        const filename = "obs-win-rate";
        const fileExt = ".txt";
        const options = {
            suggestedName: filename,
            types: [{
                description: "Animator file",
                accept: {'text/plain': [fileExt]},
            }]
        }
        const saveFile = await window.showSaveFilePicker(options);
    }

    private showCreateFile():void {
        const button:HTMLButtonElement = new DOMElement("button", undefined, "Create file").getEl() as HTMLButtonElement;
        button.addEventListener("click", async ():Promise<void> => await this.createFile());
        this.body.append(button);
    }

    private showControls():void {
        const winRateModel:WinRateModel = new WinRateModel({
            wins: 0,
            loss: 0,
            winRate: 0
        });

        const elInputWins:InputWinLoss = new InputWinLoss("input-wins", "Wins", this.wins);
        const elInputLoss:InputWinLoss = new InputWinLoss("input-loss", "Loss", this.loss);
        const elLabelWinRate = new DOMElement("label", undefined, "Winrate: ").getEl();
        const elValueWinRate = new DOMElement("span", undefined, this.getWinRateValue()).getEl();
        const elLastRecord = new DOMElement("p", undefined, this.getLastRecordText()).getEl();

        this.body.append(elInputWins.getEl(), elInputLoss.getEl(), elLabelWinRate, elValueWinRate, elLastRecord);

        /*winRateModel.addEventListener("CHANGE:winRate", (event:Event):void => {
            console.log("changed:", winRateModel.get("winRate"));
        });

        winRateModel.set("winRate", 1);*/
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
}

new Main();
