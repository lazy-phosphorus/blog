import type { ComponentChildren, ComponentType } from "preact";
import type { Config } from "vike/types";

export const config: Config = {
    meta: {
        Layout: {
            env: { server: true, client: true },
            cumulative: true,
        },
        Head: {
            env: { server: true, client: true },
            cumulative: true,
        },
        title: {
            env: { server: true, client: true },
            cumulative: false,
        },
        frontmatter: {
            env: { server: true, client: false },
            cumulative: false,
        },
    },
    prerender: true,
    trailingSlash: true,
    clientRouting: true,
    hydrationCanBeAborted: true,
    injectScriptsAt: "HTML_END",
};

declare global {
    namespace Vike {
        interface ILayoutProps {
            children: ComponentChildren;
        }
        interface IPageContextConfig {
            Layout: ComponentType<ILayoutProps>[];
            Page: ComponentType;
            title?: string | ((context: PageContext) => string);
        }

        interface PageContextClient {
            config: IPageContextConfig;
        }
        interface PageContextServer {
            config: IPageContextConfig & {
                Head: ComponentType<{ context: PageContextServer }>[];
            };
        }
    }
}
