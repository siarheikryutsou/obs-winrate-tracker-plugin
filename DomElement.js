export class DOMElement {
    constructor(tagName, htmlAttributes, innerText) {
        const el = this.el = document.createElement(tagName);
        if (htmlAttributes) {
            let key;
            for (key in htmlAttributes) {
                const value = htmlAttributes[key];
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