import type { ComponentChildren } from "preact";
import { PageContextConsumer, usePageContext } from "./use-page-context";

export function useData<T>() {
    const context = usePageContext();
    return context.data as T;
}

type PropsType<T> = Readonly<{ children: (data: T) => ComponentChildren }>;

export function DataConsumer<T>({ children }: PropsType<T>) {
    return (
        <PageContextConsumer>
            {(context) => children(context.data as T)}
        </PageContextConsumer>
    );
}
