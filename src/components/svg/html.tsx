import type { JSX } from "preact";

export function IconHtml(
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
                fill="#e44f26"
                d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30z"
            />
            <path fill="#f1662a" d="m16 27.858l8.17-2.265l1.922-21.532H16z" />
            <path
                fill="#ebebeb"
                d="M16 13.407h-4.09l-.282-3.165H16V7.151H8.25l.074.83l.759 8.517H16zm0 8.027l-.014.004l-3.442-.929l-.22-2.465H9.221l.433 4.852l6.332 1.758l.014-.004z"
            />
            <path
                fill="#fff"
                d="M15.989 13.407v3.091h3.806l-.358 4.009l-3.448.93v3.216l6.337-1.757l.046-.522l.726-8.137l.076-.83zm0-6.256v3.091h7.466l.062-.694l.141-1.567l.074-.83z"
            />
        </svg>
    );
}
