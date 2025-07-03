import type { ComponentChildren, JSX } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<
    JSX.IntrinsicElements["div"] & {
        tip: ComponentChildren;
        place: "top" | "bottom";
    }
>;

export function Tooltip({ children, tip, place, ...props }: PropsType) {
    return (
        <div
            {...props}
            class={`${style.tooltip}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            {children}
            <div class={`${style.tip} ${style[place]}`}>{tip}</div>
        </div>
    );
}
