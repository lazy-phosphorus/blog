import type { FrontmatterType } from "@/types/frontmatter";
import cover from "./cover.webp";

export async function data(): Promise<FrontmatterType> {
    return {
        title: "Marked 库使用指引",
        draft: false,
        date: {
            publish: new Date("2024-04-05"),
            modify: new Date("2024-12-16"),
        },
        description:
            "深入了解 Marked 库：一个用于将 Markdown 解析为 HTML 的 JavaScript 库。内含基础用法与源码浅析。",
        categories: ["计算机科学", "TypeScript"],
        tags: ["第三方库", "TypeScript", "Markdown", "文本解析"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
