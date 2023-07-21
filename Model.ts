export class Model extends EventTarget {
    protected data: { [key: string]: string | number } | undefined;
    constructor(data?: { [key: string]: string | number }) {
        super();
        this.data = data;
    }

    set(key: string, value: string | number) {
        this.data ??= {};
        const currentValue:string | number = this.data[key];
        this.data[key] = value;
        if(currentValue !== value) {
            super.dispatchEvent(new Event(`CHANGE:${key}`));
        }
    }

    get(key: string): string | number | undefined {
        return this.data?.[key];
    }
}