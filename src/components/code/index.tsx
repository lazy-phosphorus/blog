import type { ComponentChildren, JSX } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<
    JSX.IntrinsicElements["code"] & {
        type: "fun" | "var" | "typ" | "str" | "kwd" | "default";
    } & (
            | { code: string; children?: never }
            | { code?: never; chidlren?: ComponentChildren }
        )
>;

export function Code({ type, children, code, ...props }: PropsType) {
    return (
        <code
            {...props}
            class={
                props.class === void 0
                    ? `${style.code} ${style[type]}`
                    : `${style.code} ${style[type]} ${props.class}`
            }
        >
            {code !== void 0 ? code : children}
        </code>
    );
}
