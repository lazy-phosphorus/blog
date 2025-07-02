import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconNext(
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
                d="m7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82M16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1"
            />
        </svg>
    );
}
