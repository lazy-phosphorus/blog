import type { JSX } from "preact";

export function IconCss(props: Omit<JSX.IntrinsicElements["svg"], "children">) {
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
                fill="#1572b6"
                d="M5.902 27.201L3.656 2h24.688l-2.249 25.197L15.985 30z"
            />
            <path fill="#33a9dc" d="m16 27.858l8.17-2.265l1.922-21.532H16z" />
            <path
                fill="#fff"
                d="M16 13.191h4.09l.282-3.165H16V6.935h7.75l-.074.829l-.759 8.518H16z"
            />
            <path
                fill="#ebebeb"
                d="m16.019 21.218l-.014.004l-3.442-.93l-.22-2.465H9.24l.433 4.853l6.331 1.758l.015-.004z"
            />
            <path
                fill="#fff"
                d="m19.827 16.151l-.372 4.139l-3.447.93v3.216l6.336-1.756l.047-.522l.537-6.007z"
            />
            <path
                fill="#ebebeb"
                d="M16.011 6.935v3.091H8.545l-.062-.695l-.141-1.567l-.074-.829zM16 13.191v3.091h-3.399l-.062-.695l-.14-1.567l-.074-.829z"
            />
        </svg>
    );
}
