var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        if (!filePath) {
            this.showCreateFile();
            //this.showControls();
        }
        else {
            this.showControls();
        }
        console.log(filePath);
    }
    createFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = "obs-win-rate";
            const fileExt = ".txt";
            const options = {
                suggestedName: filename,
                types: [{
                        description: "Animator file",
                        accept: { 'text/plain': [fileExt] },
                    }]
            };
            const saveFile = yield window.showSaveFilePicker(options);
        });
    }
    showCreateFile() {
        const button = new DOMElement("button", undefined, "Create file").getEl();
        button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { return yield this.createFile(); }));
        this.body.append(button);
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