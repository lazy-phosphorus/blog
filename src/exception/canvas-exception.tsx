import type { ComponentChildren } from "preact";
import { Code } from "@/components/code";
import { BaseException } from "./base-exception";

export class CanvasException extends BaseException {
    protected override title: ComponentChildren;

    constructor(
        where: string,
        protected override message: ComponentChildren,
    ) {
        super();
        this.title = CanvasException.generateTitle(where);
    }

    private static generateTitle(where: string) {
        return (
            <>
                <Code type="default">&lt;canvas&gt;</Code>不支持 {where}
            </>
        );
    }
}
