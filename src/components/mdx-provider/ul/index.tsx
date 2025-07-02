import type { ParentProps } from "solid-js";
import style from "./index.module.scss";

export function ul(props: ParentProps) {
    return <ul class={style.ul}>{props.children}</ul>;
}
