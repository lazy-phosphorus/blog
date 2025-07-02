import type { ComponentChildren } from "preact";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function li({ children }: PropsType) {
    return <li>{children}</li>;
}
