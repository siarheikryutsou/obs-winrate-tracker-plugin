export class DomElementBase extends EventTarget {
    protected readonly el:HTMLElement;

    constructor(el:HTMLElement) {
        super();
        this.el = el;
    }

    getEl():HTMLElement {
        return this.el;
    }
}