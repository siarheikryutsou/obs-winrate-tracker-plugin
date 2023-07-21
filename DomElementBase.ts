export class DomElementBase {
    protected readonly el:HTMLElement;

    constructor(el:HTMLElement) {
        this.el = el;
    }

    getEl():HTMLElement {
        return this.el;
    }
}