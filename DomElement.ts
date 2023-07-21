interface IDomElementAttributes {
    id?:string
    type?:string
    value?:string
    min?:string
    class?:string
}

export class DOMElement {
    private readonly el:HTMLElement;
    constructor(tagName:string, attributes?:IDomElementAttributes, innerText?:string) {
        const el:HTMLElement = this.el = document.createElement(tagName);
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

    getEl() {
        return this.el;
    }
}
