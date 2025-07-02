import { createContext } from "preact";
import type { ComponentChildren } from "preact";
import { useContext as use } from "preact/hooks";
import type { PageContext } from "vike/types";

const Context = createContext<PageContext>(void 0 as unknown as PageContext);

type ProviderPropsType = Readonly<{
    context: PageContext;
    children: ComponentChildren;
}>;

export function PageContextProvider({ context, children }: ProviderPropsType) {
    return <Context value={context}>{children}</Context>;
}

type ConsumerPropsType = Readonly<{
    children: (value: PageContext) => ComponentChildren;
}>;

export function PageContextConsumer({ children }: ConsumerPropsType) {
    return <Context.Consumer>{children}</Context.Consumer>;
}

export function usePageContext() {
    return use(Context);
}
