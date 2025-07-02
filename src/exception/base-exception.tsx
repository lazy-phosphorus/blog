import type { ComponentChildren } from "preact";

export abstract class BaseException {
    protected abstract readonly title: ComponentChildren;
    protected abstract readonly message: ComponentChildren;
    constructor() {}

    public get Title() {
        return <h1>{this.title}</h1>;
    }
    public get Message() {
        return <p>{this.message}</p>;
    }
}
