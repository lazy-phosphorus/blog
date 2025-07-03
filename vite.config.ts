import mdx from "@mdx-js/rollup";
import preact from "@preact/preset-vite";
import shiki from "@shikijs/rehype";
import {
    transformerMetaHighlight,
    transformerMetaWordHighlight,
    transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerRenderWhitespace,
} from "@shikijs/transformers";
import type { Node, Root, RootContent } from "mdast";
import { resolve } from "path";
import katex from "rehype-katex";
import media from "rehype-mdx-import-media";
import unwrap from "rehype-unwrap-images";
import gfm from "remark-gfm";
import math from "remark-math";
import pangu from "remark-pangu";
import readingTime from "remark-reading-time";
import readingTimeMdx from "remark-reading-time/mdx";
import { visit } from "unist-util-visit";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        vike(),
        mdx({
            jsxImportSource: "preact",
            providerImportSource: "@mdx-js/preact",
            remarkPlugins: [
                pangu,
                gfm,
                math,
                codetab,
                readingTime,
                readingTimeMdx,
            ],
            rehypePlugins: [
                unwrap,
                media,
                [katex, { strict: true, throwOnError: true, output: "mathml" }],
                [
                    shiki,
                    {
                        tabindex: false,
                        theme: "dark-plus",
                        transformers: [
                            transformerNotationDiff({
                                classLineAdd: "add",
                                classLineRemove: "remove",
                            }),
                            transformerNotationHighlight({
                                classActiveLine: "highlight",
                            }),
                            transformerNotationErrorLevel({
                                classMap: {
                                    error: "error",
                                    warning: "warning",
                                    info: "info",
                                },
                            }),
                            transformerRenderWhitespace(),
                            transformerMetaHighlight({
                                className: "highlight",
                            }),
                            transformerMetaWordHighlight({
                                className: "highlight",
                            }),
                            transformerNotationWordHighlight({
                                classActiveWord: "highlight",
                            }),
                        ],
                    },
                ],
            ],
        }),
        preact(),
    ],
    build: {
        target: "esnext",
    },
    resolve: {
        alias: {
            "@svg": resolve(__dirname, "src", "components", "svg"),
            "@": resolve(__dirname, "src"),
        },
    },
});

/* required components: CodeTab */
function codetab() {
    const metaRegex = /\[\s*([^"]+)\s*\]/;

    function isTabCodeBlock(node: Node) {
        if (
            node.type !== "code" ||
            !("meta" in node) ||
            typeof node.meta !== "string"
        )
            return false;
        return metaRegex.test(node.meta);
    }

    type TabsNode = Node & { meta: string; lang: string };

    function constructTabs(nodes: TabsNode[]) {
        const buttons = [];

        for (const node of nodes) {
            buttons.push({
                label: metaRegex.exec(node.meta)![1],
                language: node.lang,
            });
        }

        // 踏马的，MDX 的 attribute 的 value 不能是数组
        return {
            type: "mdxJsxFlowElement",
            name: "CodeTab",
            attributes: [
                {
                    type: "mdxJsxAttribute",
                    name: "buttons",
                    value: JSON.stringify(buttons),
                },
            ],
            children: nodes,
        };
    }

    function findCodeTab(tree: Root) {
        visit(tree, (node, index, parent) => {
            if (
                index === void 0 ||
                parent === void 0 ||
                !("children" in parent) ||
                !(parent.children instanceof Array) ||
                !isTabCodeBlock(node)
            )
                return;
            let i = index;
            const tabs: TabsNode[] = [];
            while (i < parent.children.length) {
                if (isTabCodeBlock(parent.children[i]!))
                    tabs.push(parent.children[i] as TabsNode);
                else break;
                i++;
            }
            parent.children.splice(
                index,
                i - index,
                constructTabs(tabs) as RootContent,
            );
        });
    }
    return findCodeTab;
}
