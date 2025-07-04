import type { FrontmatterType } from "@/types/frontmatter.d";
import cover from "./cover.webp";

export async function frontmatter(): Promise<FrontmatterType> {
    return {
        title: "Rust 学习笔记",
        draft: false,
        date: {
            publish: new Date("2024-07-09"),
            modify: new Date("2024-12-16"),
        },
        description:
            "个人的 Rust 编程语言学习笔记。或许也可以帮助你学习或复习这门编程语言。",
        categories: ["计算机科学", "Rust"],
        tags: ["学习笔记", "Rust", "入门指北"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
