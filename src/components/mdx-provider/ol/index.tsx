import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function ol({ children }: PropsType) {
    return <ol class={style.ol}>{children}</ol>;
}
