export class DOMElement {
    constructor(tagName, attributes, innerText) {
        const el = this.el = document.createElement(tagName);
        if (attributes) {
            let key;
            for (key in attributes) {
                const value = attributes[key];
                if (value) {
                    el.setAttribute(key, value);
                }
            }
        }
        if (innerText) {
            el.innerText = innerText;
        }
    }
    getEl() {
        return this.el;
    }
}
//# sourceMappingURL=DomElement.js.map