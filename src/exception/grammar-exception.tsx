import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class GrammarException extends BaseException {
    private static __generateTitle(where: string) {
        return <>{where} 语法错误</>;
    }

    protected override __title: ComponentChildren;

    constructor(
        where: string,
        protected override __message: ComponentChildren,
    ) {
        super();
        this.__title = GrammarException.__generateTitle(where);
    }
}
