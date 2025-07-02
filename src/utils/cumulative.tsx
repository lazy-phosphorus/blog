import type { ComponentChildren, ComponentType, JSX } from "preact";

type PropsType = { children: ComponentChildren };

export function cumulative(
    page: JSX.Element,
    layouts: ComponentType<PropsType>[],
) {
    return layouts.reduce((acc, Layout) => <Layout>{acc}</Layout>, page);
}
