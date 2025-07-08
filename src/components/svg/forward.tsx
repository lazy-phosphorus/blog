import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconForward(
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
                d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76"
            />
        </svg>
    );
}
