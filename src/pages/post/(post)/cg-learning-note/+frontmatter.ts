import type { FrontmatterType } from "@/types/frontmatter.d";
import cover from "./cover.webp?no-inline";

export async function frontmatter(): Promise<FrontmatterType> {
    return {
        title: "计算机图形学入门学习笔记",
        draft: true,
        date: {
            publish: new Date("2024-12-25"),
            modify: new Date("2025-02-17"),
        },
        description: "自学计算机图形学基础时做的笔记，包含常用线性代数公式。",
        categories: ["计算机科学", "计算机图形学"],
        tags: ["计算机图形学", "线性代数", "学习笔记"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
