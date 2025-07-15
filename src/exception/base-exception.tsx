import type { ComponentChildren } from "preact";

export abstract class BaseException {
    protected abstract readonly __title: ComponentChildren;
    protected abstract readonly __message: ComponentChildren;
    constructor() {}

    public get Title() {
        return <h1>{this.__title}</h1>;
    }
    public get Message() {
        return <div>{this.__message}</div>;
    }
}
