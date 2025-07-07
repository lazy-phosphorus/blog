import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconClose(
    props: Omit<JSX.IntrinsicElements["svg"], "children">,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            {/* Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE */}
            <path
                class={style.path}
                fill="currentColor"
                fill-opacity="0"
                stroke="currentColor"
                stroke-dasharray="100"
                stroke-dashoffset="100"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
            />
        </svg>
    );
}
