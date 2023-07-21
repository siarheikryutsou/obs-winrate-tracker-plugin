interface IDomElementAttributes {
    id?:string
    type?:string
    value?:string
    min?:string
}

export class DOMElement {
    private readonly el:HTMLElement;
    constructor(tagName:string, htmlAttributes?:IDomElementAttributes, innerText?:string) {
        const el:HTMLElement = this.el = document.createElement(tagName);
        if(htmlAttributes) {
            let key: keyof IDomElementAttributes;
            for(key in htmlAttributes) {
                const value = htmlAttributes[key];
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