import type { JSX } from "preact";

export function IconPreact(
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
            <path fill="#673ab8" d="m16 2l12.12 7v14L16 30L3.88 23V9z" />
            <ellipse
                cx="16"
                cy="16"
                fill="none"
                stroke="#fff"
                rx="10.72"
                ry="4.1"
                transform="rotate(-37.5 16.007 15.996)"
            />
            <ellipse
                cx="16"
                cy="16"
                fill="none"
                stroke="#fff"
                rx="4.1"
                ry="10.72"
                transform="rotate(-52.5 15.998 15.994)"
            />
            <circle cx="16" cy="16" r="1.86" fill="#fff" />
        </svg>
    );
}
