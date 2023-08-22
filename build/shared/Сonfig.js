export class Config {
    constructor() {
        this.config = {
            useSaveButton: true,
            showLastSaveInfo: true,
            fontFamily: "Arial"
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
                showLastSaveInfo: configJSON.showLastSaveInfo,
                fontFamily: configJSON.fontFamily
            };
        }
    }
    saveConfig() {
        window.localStorage.setItem("config", this.toJSONString());
    }
    toJSONString() {
        return JSON.stringify(this.config);
    }
    getUseSaveBtnValue() {
        return this.config.useSaveButton;
    }
    getShowLastSaveInfoValue() {
        return this.config.showLastSaveInfo;
    }
    setCheckBoxValue(fieldName, value) {
        this.config[fieldName] = value;
    }
    setFontFamily(fontFamily) {
        this.config.fontFamily = fontFamily.trim();
    }
    getFontFamily() {
        return this.config.fontFamily;
    }
}
//# sourceMappingURL=%D0%A1onfig.js.map