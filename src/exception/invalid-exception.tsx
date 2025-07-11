import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class InvalidException extends BaseException {
    protected override title: ComponentChildren;

    constructor(
        where: string,
        protected override message: ComponentChildren,
    ) {
        super();
        this.title = InvalidException.generateTitle(where);
    }

    private static generateTitle(where: string) {
        return <>{where} 无效</>;
    }
}
