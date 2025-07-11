import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function li({ children }: PropsType) {
    return <li class={style.li}>{children}</li>;
}
