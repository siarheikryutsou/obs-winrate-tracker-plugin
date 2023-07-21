export class Model extends EventTarget {
    constructor(data) {
        super();
        this.data = data;
    }
    set(key, value) {
        var _a;
        (_a = this.data) !== null && _a !== void 0 ? _a : (this.data = {});
        const currentValue = this.data[key];
        this.data[key] = value;
        if (currentValue !== value) {
            super.dispatchEvent(new Event(`CHANGE:${key}`));
        }
    }
    get(key) {
        var _a;
        return (_a = this.data) === null || _a === void 0 ? void 0 : _a[key];
    }
}
//# sourceMappingURL=Model.js.map