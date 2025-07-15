import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class InvalidException extends BaseException {
    private static __generateTitle(where: string) {
        return <>{where} 无效</>;
    }

    protected override __title: ComponentChildren;

    constructor(
        where: string,
        protected override __message: ComponentChildren,
    ) {
        super();
        this.__title = InvalidException.__generateTitle(where);
    }
}
