import { DomElementBase } from "./DomElementBase.js";
export class DOMElement extends DomElementBase {
    constructor(tagName, attributes, innerText) {
        super(document.createElement(tagName));
        const el = this.el;
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
}
//# sourceMappingURL=DomElement.js.map