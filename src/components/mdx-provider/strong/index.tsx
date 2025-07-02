import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function strong({ children }: PropsType) {
    return <strong class={style.strong}>{children}</strong>;
}
