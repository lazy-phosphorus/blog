import type { FrontmatterType } from "@/types/frontmatter.d";
import cover from "./cover.webp";

export async function data(): Promise<FrontmatterType> {
    return {
        title: "设计模式学习笔记",
        draft: false,
        date: {
            publish: new Date("2025-04-10"),
            modify: new Date("2025-04-10"),
        },
        description: "自学设计模式时所写的笔记，以 C++ 为例。",
        categories: ["计算机科学", "设计模式"],
        tags: ["设计模式", "C++", "学习笔记"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
