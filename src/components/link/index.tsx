import type { JSX } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<
    JSX.IntrinsicElements["a"] & {
        href: string;
        title: string;
        type?: "secondary" | "info" | "success" | "warning" | "error";
    }
>;

export function Link({ href, title, type, ...props }: PropsType) {
    const isOuterLink = href.startsWith("http");

    return (
        <a
            {...props}
            class={`${props.class !== void 0 ? `${props.class} ` : ""}${style.link}${type !== void 0 ? ` ${style[type]}` : ""}`}
            href={href}
            target={isOuterLink ? "_blank" : void 0}
            rel={isOuterLink ? "external nofollow noopener noreferrer" : void 0}
            title={title}
        />
    );
}
