import { renderToStringAsync } from "preact-render-to-string";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { PageContextServer } from "vike/types";
import { title } from "@/config";
import { PageContextProvider } from "@/hooks/use-page-context";
import { cumulative } from "@/utils/cumulative";

export async function onRenderHtml(context: PageContextServer) {
    const { Page, Layout, Head, title: t } = context.config;
    const html = await renderToStringAsync(
        <html lang="zh-cn">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>
                    {t === void 0
                        ? title
                        : `${typeof t === "string" ? t : t(context)} | ${title}`}
                </title>
                {Head.reduce(
                    (acc, H) => (
                        <>
                            {acc}
                            <H context={context} />
                        </>
                    ),
                    <></>,
                )}
            </head>
            <body>
                <PageContextProvider context={context}>
                    {cumulative(<Page />, Layout)}
                </PageContextProvider>
            </body>
        </html>,
    );

    return {
        documentHtml: escapeInject`<!DOCTYPE html>${dangerouslySkipEscape(html)}`,
    };
}
