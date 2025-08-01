import type { JSX } from "preact";

export function IconProtest(
    props: Omit<JSX.IntrinsicElements["svg"], "children">,
) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.88em"
            height="1em"
            viewBox="0 0 448 512"
            {...props}
        >
            {/* Icon from Font Awesome Solid by Dave Gandy - https://creativecommons.org/licenses/by/4.0/ */}
            <path
                fill="currentColor"
                d="M144 0c-26.5 0-48 21.5-48 48v128c0 8.8-7.2 16-16 16s-16-7.2-16-16v-26.7l-9 7.5C40.4 169 32 187 32 206v38c0 38 16.9 74 46.1 98.3L128 384v96c0 17.7 14.3 32 32 32h160c17.7 0 32-14.3 32-32V374.7c46.9-19 80-65 80-118.7V144c0-26.5-21.5-48-48-48c-12.4 0-23.6 4.7-32.1 12.3C350 83.5 329.3 64 304 64c-12.4 0-23.6 4.7-32.1 12.3C270 51.5 249.3 32 224 32c-12.4 0-23.6 4.7-32.1 12.3C190 19.5 169.3 0 144 0"
            />
        </svg>
    );
}
