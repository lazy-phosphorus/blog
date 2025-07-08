import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function ul({ children }: PropsType) {
    return <ul class={style.ul}>{children}</ul>;
}
