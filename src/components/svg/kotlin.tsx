import type { JSX } from "preact";

export function IconKotlin(
    props: Omit<JSX.IntrinsicElements["svg"], "children">,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            {...props}
        >
            {/* Icon from VSCode Icons by Roberto Huertas - https://github.com/vscode-icons/vscode-icons/blob/master/LICENSE */}
            <defs>
                <linearGradient
                    id="vscodeIconsFileTypeKotlin0"
                    x1="311.336"
                    x2="283.342"
                    y1="1452.064"
                    y2="1480.058"
                    gradientTransform="translate(-281.4 -1450)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#e44857" />
                    <stop offset=".47" stop-color="#9d4b9d" />
                    <stop offset="1" stop-color="#6d5faa" />
                </linearGradient>
            </defs>
            <path
                fill="url(#vscodeIconsFileTypeKotlin0)"
                d="M30 30H2V2h28L16 16Z"
            />
        </svg>
    );
}
