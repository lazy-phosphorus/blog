import type { JSX } from "preact";

export function IconPowershell(
    props: Omit<JSX.IntrinsicElements["svg"], "children">,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 128 128"
            {...props}
        >
            {/* Icon from Devicon by konpa - https://github.com/devicons/devicon/blob/master/LICENSE */}
            <linearGradient
                id="deviconPowershell0"
                x1="96.306"
                x2="25.454"
                y1="35.144"
                y2="98.431"
                gradientTransform="matrix(1 0 0 -1 0 128)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stop-color="#a9c8ff" />
                <stop offset="1" stop-color="#c7e6ff" />
            </linearGradient>
            <path
                fill="url(#deviconPowershell0)"
                fill-rule="evenodd"
                d="M7.2 110.5c-1.7 0-3.1-.7-4.1-1.9s-1.3-2.9-.9-4.6l18.6-80.5c.8-3.4 4-6 7.4-6h92.6c1.7 0 3.1.7 4.1 1.9s1.3 2.9.9 4.6l-18.6 80.5c-.8 3.4-4 6-7.4 6z"
                clip-rule="evenodd"
                opacity=".8"
            />
            <linearGradient
                id="deviconPowershell1"
                x1="25.336"
                x2="94.569"
                y1="98.33"
                y2="36.847"
                gradientTransform="matrix(1 0 0 -1 0 128)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stop-color="#2d4664" />
                <stop offset=".169" stop-color="#29405b" />
                <stop offset=".445" stop-color="#1e2f43" />
                <stop offset=".79" stop-color="#0c131b" />
                <stop offset="1" />
            </linearGradient>
            <path
                fill="url(#deviconPowershell1)"
                fill-rule="evenodd"
                d="M120.3 18.5H28.5c-2.9 0-5.7 2.3-6.4 5.2L3.7 104.3c-.7 2.9 1.1 5.2 4 5.2h91.8c2.9 0 5.7-2.3 6.4-5.2l18.4-80.5c.7-2.9-1.1-5.3-4-5.3"
                clip-rule="evenodd"
            />
            <path
                fill="#2C5591"
                fill-rule="evenodd"
                d="M64.2 88.3h22.3c2.6 0 4.7 2.2 4.7 4.9s-2.1 4.9-4.7 4.9H64.2c-2.6 0-4.7-2.2-4.7-4.9s2.1-4.9 4.7-4.9m14.5-21.8c-.4.8-1.2 1.6-2.6 2.6L34.6 98.9c-2.3 1.6-5.5 1-7.3-1.4c-1.7-2.4-1.3-5.7.9-7.3l37.4-27.1v-.6l-23.5-25c-1.9-2-1.7-5.3.4-7.4c2.2-2 5.5-2 7.4 0l28.2 30c1.7 1.9 1.8 4.5.6 6.4"
                clip-rule="evenodd"
            />
            <path
                fill="#FFF"
                fill-rule="evenodd"
                d="M77.6 65.5c-.4.8-1.2 1.6-2.6 2.6L33.6 97.9c-2.3 1.6-5.5 1-7.3-1.4c-1.7-2.4-1.3-5.7.9-7.3l37.4-27.1v-.6l-23.5-25c-1.9-2-1.7-5.3.4-7.4c2.2-2 5.5-2 7.4 0l28.2 30c1.7 1.8 1.8 4.4.5 6.4M63.5 87.8h22.3c2.6 0 4.7 2.1 4.7 4.6c0 2.6-2.1 4.6-4.7 4.6H63.5c-2.6 0-4.7-2.1-4.7-4.6c0-2.6 2.1-4.6 4.7-4.6"
                clip-rule="evenodd"
            />
        </svg>
    );
}
