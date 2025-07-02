import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function p({ children }: PropsType) {
    return <p class={style.p}>{children}</p>;
}
