import type { ComponentChildren } from "preact";
import { IconError } from "@svg/error";
import { IconInfo } from "@svg/info";
import { IconWarning } from "@svg/warning";
import style from "./index.module.scss";

type NoteTitlePropsType = Readonly<{ children: ComponentChildren }>;

export function NoteTitle({ children }: NoteTitlePropsType) {
    return <h2 class={style.h2}>{children}</h2>;
}

type PropsType = Readonly<{
    type: "info" | "warn" | "error";
    title?: string;
    children: ComponentChildren;
}>;

export function Note({ type, title, children }: PropsType) {
    return (
        <div class={`${style.note} ${style[type]}`}>
            {type === "info" ? <IconInfo class={style.icon} /> : void 0}
            {type === "warn" ? <IconWarning class={style.icon} /> : void 0}
            {type === "error" ? <IconError class={style.icon} /> : void 0}
            <div>
                {title !== void 0 ? <NoteTitle>{title}</NoteTitle> : void 0}
                {children}
            </div>
        </div>
    );
}
