import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function blockquote({ children }: PropsType) {
    return <blockquote class={style.blockquote}>{children}</blockquote>;
}
