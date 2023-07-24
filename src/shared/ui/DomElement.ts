import {DomElementBase} from "./DomElementBase.js";

interface IDomElementAttributes {
    id?:string
    type?:string
    value?:string
    min?:string
    class?:string
    src?:string
}

export class DOMElement extends DomElementBase {
    constructor(tagName:string, attributes?:IDomElementAttributes, innerText?:string) {
        super(document.createElement(tagName));
        const el:HTMLElement = this.el;
        if(attributes) {
            let key: keyof IDomElementAttributes;
            for(key in attributes) {
                const value = attributes[key];
                if(value) {
                    el.setAttribute(key, value);
                }
            }
        }

        if(innerText) {
            el.innerText = innerText;
        }
    }
}
