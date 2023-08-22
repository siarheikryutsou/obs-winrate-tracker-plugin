import {IConfig} from "./interfaces/IConfig";

export class Config {

    private static instance: Config;

    private config:IConfig = {
        useSaveButton: true,
        showLastSaveInfo: true
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
                showLastSaveInfo: configJSON.showLastSaveInfo
            }
        }
    }


    public saveConfig(): void {
        window.localStorage.setItem("config", this.toJSONString());
    }


    public toJSONString(): string {
        return JSON.stringify(this.config);
    }


    public getValue(fieldName: keyof IConfig): boolean {
        return this.config[fieldName];
    }


    public setValue(fieldName: keyof IConfig, value: boolean): void {
        this.config[fieldName] = value;
    }

}