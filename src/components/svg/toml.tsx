import type { JSX } from "preact";

export function IconToml(
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
            <path
                fill="#7f7f7f"
                d="M22.76 6.83v3.25h-5v15.09h-3.5V10.08h-5V6.83Z"
            />
            <path
                fill="#bfbfbf"
                d="M2 2h6.2v3.09H5.34v21.8H8.2V30H2Zm28 28h-6.2v-3.09h2.86V5.11H23.8V2H30Z"
            />
        </svg>
    );
}
