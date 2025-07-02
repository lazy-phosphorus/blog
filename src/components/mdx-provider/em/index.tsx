import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function em({ children }: PropsType) {
    return <em class={style.em}>{children}</em>;
}
