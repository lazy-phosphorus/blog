import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class GrammarException extends BaseException {
    protected override title: ComponentChildren;

    constructor(
        where: string,
        protected override message: ComponentChildren,
    ) {
        super();
        this.title = GrammarException.generateTitle(where);
    }

    private static generateTitle(where: string) {
        return <>{where} 语法错误</>;
    }
}
