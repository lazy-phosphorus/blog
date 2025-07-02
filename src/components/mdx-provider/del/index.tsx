import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function del({ children }: PropsType) {
    return <del class={style.del}>{children}</del>;
}
