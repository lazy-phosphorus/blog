import type { ComponentChildren, ComponentType, JSX } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{
    icon: ComponentType<Omit<JSX.IntrinsicElements["svg"], "children">>;
    children: ComponentChildren;
}>;

export function Badge({ icon: Icon, children }: PropsType) {
    return (
        <div class={style.badge}>
            <Icon />
            <div>{children}</div>
        </div>
    );
}
