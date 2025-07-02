import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconCopy(
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
                d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1m5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2m-2 0H9V4h9z"
            />
        </svg>
    );
}
