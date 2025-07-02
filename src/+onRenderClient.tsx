import { hydrate } from "preact-iso";
import type { PageContextClient } from "vike/types";
import { PageContextProvider } from "@/hooks/use-page-context";
import { cumulative } from "@/utils/cumulative";

export async function onRenderClient(context: PageContextClient) {
    const { Page, Layout } = context.config;
    hydrate(
        <PageContextProvider context={context}>
            {cumulative(<Page />, Layout)}
        </PageContextProvider>,
        document.body,
    );
}
