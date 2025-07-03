import type { FrontmatterType } from "@/types/frontmatter";
import cover from "./cover.webp";

export async function data(): Promise<FrontmatterType> {
    return {
        title: "C++ 标准摘要",
        draft: false,
        date: {
            publish: new Date("2025-04-24"),
            modify: new Date("2025-04-24"),
        },
        description:
            "记录 C++ 各个标准都新增了哪些特性及其关键性质，包含 C++ 11 ~ C++ 20 标准。",
        categories: ["计算机科学", "C++"],
        tags: ["C++", "C++ 标准"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
