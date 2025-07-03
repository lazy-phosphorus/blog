import type { JSX } from "preact";
import style from "./index.module.scss";

export function Card({ children, ...props }: JSX.IntrinsicElements["div"]) {
    return (
        <div
            {...props}
            class={`${style.card}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            {children}
        </div>
    );
}
