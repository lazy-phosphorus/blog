import type { JSX } from "preact";

export function IconPython(
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
                    id="vscodeIconsFileTypePython0"
                    x1="-133.268"
                    x2="-133.198"
                    y1="-202.91"
                    y2="-202.84"
                    gradientTransform="matrix(189.38 0 0 189.81 25243.061 38519.17)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#387eb8" />
                    <stop offset="1" stop-color="#366994" />
                </linearGradient>
                <linearGradient
                    id="vscodeIconsFileTypePython1"
                    x1="-133.575"
                    x2="-133.495"
                    y1="-203.203"
                    y2="-203.133"
                    gradientTransform="matrix(189.38 0 0 189.81 25309.061 38583.42)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#ffe052" />
                    <stop offset="1" stop-color="#ffc331" />
                </linearGradient>
            </defs>
            <path
                fill="url(#vscodeIconsFileTypePython0)"
                d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912H8.33v-3.361s-.13-4.013 3.9-4.013h6.762s3.772.06 3.772-3.652V5.8s.572-3.712-6.842-3.712Zm-3.732 2.137a1.214 1.214 0 1 1-1.183 1.244v-.02a1.214 1.214 0 0 1 1.214-1.214Z"
            />
            <path
                fill="url(#vscodeIconsFileTypePython1)"
                d="M16.085 29.91c7.1 0 6.651-3.08 6.651-3.08v-3.18h-6.751v-1h9.47S30 23.158 30 15.995s-4.013-6.912-4.013-6.912H23.64V12.4s.13 4.013-3.9 4.013h-6.765S9.2 16.356 9.2 20.068V26.2s-.572 3.712 6.842 3.712h.04Zm3.732-2.147A1.214 1.214 0 1 1 21 26.519v.03a1.214 1.214 0 0 1-1.214 1.214z"
            />
        </svg>
    );
}
