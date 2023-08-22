export class Config {
    constructor() {
        this.config = {
            saveSettings: {
                useSaveButton: true,
                showLastSaveInfo: true
            }
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
            const saveSettings = configJSON.saveSettings;
            this.config.saveSettings = {
                useSaveButton: saveSettings.useSaveButton,
                showLastSaveInfo: saveSettings.showLastSaveInfo
            };
        }
    }
    saveConfig() {
        window.localStorage.setItem("config", this.toJSONString());
    }
    toJSONString() {
        return JSON.stringify(this.config);
    }
}
//# sourceMappingURL=config.js.map