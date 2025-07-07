import type { ComponentChildren } from "preact";
import { BaseException } from "./base-exception";

export class AsyncException extends BaseException {
    protected override title: ComponentChildren = (<>异步错误</>);

    constructor(protected override message: ComponentChildren) {
        super();
    }
}
