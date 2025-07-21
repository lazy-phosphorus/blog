import type { JSX } from "preact";
import style from "./index.module.scss";

export function Mask({ children, ...props }: JSX.IntrinsicElements["div"]) {
    // TODO 退出动画

    return (
        <div
            {...props}
            class={`${style.mask}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            {children}
        </div>
    );
}
