export class Config {
    constructor() {
        this.config = {
            useSaveButton: true,
            showLastSaveInfo: true,
            fontFamily: "Arial",
            fontSize: 48,
            fontColor: "#FFFFFF",
        };
    }
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    readConfig() {
        var _a, _b, _c, _d, _e;
        const configData = window.localStorage.getItem("config");
        if (configData) {
            const configJSON = JSON.parse(configData);
            this.config = {
                useSaveButton: (_a = configJSON.useSaveButton) !== null && _a !== void 0 ? _a : this.config.showLastSaveInfo,
                showLastSaveInfo: (_b = configJSON.showLastSaveInfo) !== null && _b !== void 0 ? _b : this.config.showLastSaveInfo,
                fontFamily: (_c = configJSON.fontFamily) !== null && _c !== void 0 ? _c : this.config.fontFamily,
                fontSize: (_d = configJSON.fontSize) !== null && _d !== void 0 ? _d : this.config.fontSize,
                fontColor: (_e = configJSON.fontColor) !== null && _e !== void 0 ? _e : this.config.fontColor
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
    setFontColor(color) {
        this.config.fontColor = color;
    }
    getFontColor() {
        return this.config.fontColor;
    }
}
//# sourceMappingURL=Config.js.map