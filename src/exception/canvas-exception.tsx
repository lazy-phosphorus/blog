import type { ComponentChildren } from "preact";
import { Code } from "@/components/code";
import { BaseException } from "./base-exception";

export class CanvasException extends BaseException {
    private static __generateTitle(where: string) {
        return (
            <>
                <Code type="default">&lt;canvas&gt;</Code>不支持 {where}
            </>
        );
    }

    protected override __title: ComponentChildren;

    constructor(
        where: string,
        protected override __message: ComponentChildren,
    ) {
        super();
        this.__title = CanvasException.__generateTitle(where);
    }
}
