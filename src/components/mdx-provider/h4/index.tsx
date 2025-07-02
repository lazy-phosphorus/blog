import type { ComponentChildren } from "preact";
import { node2string } from "@/utils/node2string";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function h4({ children }: PropsType) {
    const id = node2string(children).replaceAll(
        /:((fun)|(var)|(typ)|(str)|(kwd))/g,
        "",
    );
    return (
        <h4 id={id} class={style.h4}>
            <span>{children}</span>
            <a href={`#${id}`}>#</a>
        </h4>
    );
}
