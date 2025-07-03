import type { ComponentType, JSX } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<
    JSX.IntrinsicElements["div"] & {
        icon: ComponentType<Omit<JSX.IntrinsicElements["svg"], "children">>;
    }
>;

export function Badge({ icon: Icon, children, ...props }: PropsType) {
    return (
        <div
            {...props}
            class={`${style.badge}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            <Icon />
            <div>{children}</div>
        </div>
    );
}
