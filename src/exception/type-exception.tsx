import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class TypeException extends BaseException {
    private static generateTitle(where: string) {
        return <>{where} 类型错误</>;
    }

    protected override title: ComponentChildren;

    constructor(
        where: string,
        protected override message: ComponentChildren,
    ) {
        super();
        this.title = TypeException.generateTitle(where);
    }
}
