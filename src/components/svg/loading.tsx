import type { JSX } from "preact";
import style from "@svg/svg.module.scss";

export function IconLoading(
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
                <clipPath id="svg-loading-boundary">
                    <circle cx="50" cy="50" r="50" fill="none" />
                </clipPath>
            </defs>
            <g class={style.hammer} fill="currentColor">
                <polygon points="53,50 53,78 47,78 47,50" />
            </g>
            <g
                class={style.gear}
                fill="currentColor"
                clipPath="url(#svg-loading-boundary)"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="10"
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
            <g class={style.hammer} fill="currentColor">
                <polygon points="35,25 55,25 65,26 65,34 55,35 53,35 53,50 47,50 47,35 35,35" />
            </g>
        </svg>
    );
}
