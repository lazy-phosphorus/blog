import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function pre({ children }: PropsType) {
    return (
        <pre class={style.pre}>
            <div>{children}</div>
        </pre>
    );
}
