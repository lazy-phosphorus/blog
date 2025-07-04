import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class RuntimeException extends BaseException {
    protected override title: ComponentChildren = (<>运行时错误</>);

    constructor(protected override message: ComponentChildren) {
        super();
    }
}
