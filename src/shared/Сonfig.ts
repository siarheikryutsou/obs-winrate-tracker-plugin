import {IConfig, IConfigCheckboxes} from "./interfaces/IConfig";

export class Config {

    private static instance: Config;

    private config:IConfig = {
        useSaveButton: true,
        showLastSaveInfo: true,
        fontFamily: "Arial"
    };

    private constructor() {

    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }


    public readConfig():void {
        const configData:string | null = window.localStorage.getItem("config");
        if(configData) {
            const configJSON:IConfig = JSON.parse(configData);
            this.config = {
                useSaveButton: configJSON.useSaveButton,
                showLastSaveInfo: configJSON.showLastSaveInfo,
                fontFamily: configJSON.fontFamily
            }
        }
    }


    public saveConfig(): void {
        window.localStorage.setItem("config", this.toJSONString());
    }


    public toJSONString(): string {
        return JSON.stringify(this.config);
    }


    public getUseSaveBtnValue(): boolean  {
        return this.config.useSaveButton;
    }


    public getShowLastSaveInfoValue(): boolean {
        return this.config.showLastSaveInfo
    }


    public setCheckBoxValue(fieldName: keyof IConfigCheckboxes, value: boolean): void {
        this.config[fieldName] = value;
    }


    public setFontFamily(fontFamily: string): void {
        this.config.fontFamily = fontFamily.trim();
    }


    public getFontFamily(): string {
        return this.config.fontFamily;
    }

}