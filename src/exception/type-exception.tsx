import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class TypeException extends BaseException {
    protected override __title: ComponentChildren;

    constructor(
        where: string,
        protected override __message: ComponentChildren,
    ) {
        super();
        this.__title = TypeException.__generateTitle(where);
    }

    private static __generateTitle(where: string) {
        return <>{where} 类型错误</>;
    }
}
