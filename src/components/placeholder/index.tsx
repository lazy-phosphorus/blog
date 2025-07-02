import type { JSX } from "preact";
import style from "./index.module.scss";

export function PlaceHolder(
    props: Omit<JSX.IntrinsicElements["div"], "children">,
) {
    return (
        <div
            {...props}
            class={
                props.class === void 0
                    ? style.placeholder
                    : `${style.placeholder} ${props.class}`
            }
        />
    );
}
