export class Config {
    constructor() {
        this.config = {
            useSaveButton: true,
            showLastSaveInfo: true
        };
    }
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    readConfig() {
        const configData = window.localStorage.getItem("config");
        if (configData) {
            const configJSON = JSON.parse(configData);
            this.config = {
                useSaveButton: configJSON.useSaveButton,
                showLastSaveInfo: configJSON.showLastSaveInfo
            };
        }
    }
    saveConfig() {
        window.localStorage.setItem("config", this.toJSONString());
    }
    toJSONString() {
        return JSON.stringify(this.config);
    }
    getValue(fieldName) {
        return this.config[fieldName];
    }
    setValue(fieldName, value) {
        this.config[fieldName] = value;
    }
}
//# sourceMappingURL=%D0%A1onfig.js.map