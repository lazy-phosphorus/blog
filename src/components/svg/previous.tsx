import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconPrevious(
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
                d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1m3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07a1 1 0 0 0 0 1.64"
            />
        </svg>
    );
}
