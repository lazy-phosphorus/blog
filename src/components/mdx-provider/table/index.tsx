import type { ComponentChildren } from "preact";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function td({ children }: PropsType) {
    return <td class={style.td}>{children}</td>;
}

export function tr({ children }: PropsType) {
    return <tr>{children}</tr>;
}

export function th({ children }: PropsType) {
    return <th class={style.th}>{children}</th>;
}

export function thead({ children }: PropsType) {
    return <thead>{children}</thead>;
}

export function tbody({ children }: PropsType) {
    return <tbody>{children}</tbody>;
}

export function table({ children }: PropsType) {
    return (
        <div class={style.table}>
            <table>{children}</table>
        </div>
    );
}
