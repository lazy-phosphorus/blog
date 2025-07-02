import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function Paper({ children }: PropsType) {
    return (
        <div class={style.paper}>
            <div>{children}</div>
        </div>
    );
}
