import type { JSX } from "preact";
import style from "./index.module.scss";

export function Switch(props: Omit<JSX.IntrinsicElements["input"], "type">) {
    return (
        <input
            {...props}
            class={`${style.switch}${props.class === void 0 ? "" : ` ${props.class}`}`}
            type="checkbox"
        />
    );
}
