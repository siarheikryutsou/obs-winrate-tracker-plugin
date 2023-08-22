export class Config {
    constructor() {
        this.config = {
            useSaveButton: true,
            showLastSaveInfo: true,
            fontFamily: "Arial",
            fontSize: 48,
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
                useSaveButton: configJSON.useSaveButton || this.config.showLastSaveInfo,
                showLastSaveInfo: configJSON.showLastSaveInfo || this.config.showLastSaveInfo,
                fontFamily: configJSON.fontFamily || this.config.fontFamily,
                fontSize: configJSON.fontSize || this.config.fontSize
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
    setFontSize(size) {
        this.config.fontSize = size;
    }
    getFontSize() {
        return this.config.fontSize;
    }
}
//# sourceMappingURL=%D0%A1onfig.js.map