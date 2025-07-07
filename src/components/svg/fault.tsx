import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconFault(
    props: Omit<JSX.IntrinsicElements["svg"], "children">,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 100 100"
            {...props}
        >
            <defs>
                <clipPath id="svg-error-boundary">
                    <circle cx="50" cy="50" r="50" fill="none" />
                </clipPath>
            </defs>
            <g
                class={style.dollar}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
            >
                <path d="M37 63A13 13 0 1 0 50 50" />
                <path d="M46 50L46 85" />
                <path d="M54 50L54 85" />
            </g>
            <g
                class={style.fault}
                fill="currentColor"
                clipPath="url(#svg-error-boundary)"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                />
                <polygon points="33,20 50,15 67,20 50,-20" />
                <polygon
                    points="33,20 50,15 67,20 50,-20"
                    transform="rotate(60,50,50)"
                />
                <polygon
                    points="33,20 50,15 67,20 50,-20"
                    transform="rotate(120,50,50)"
                />
                <polygon
                    points="33,20 50,15 67,20 50,-20"
                    transform="rotate(180,50,50)"
                />
                <polygon
                    points="33,20 50,15 67,20 50,-20"
                    transform="rotate(240,50,50)"
                />
                <polygon
                    points="33,20 50,15 67,20 50,-20"
                    transform="rotate(300,50,50)"
                />
            </g>
            <g
                class={style.dollar}
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
            >
                <path d="M63 37A13 13 0 1 0 50 50" />
                <path d="M46 15L46 50" />
                <path d="M54 15L54 50" />
            </g>
        </svg>
    );
}
