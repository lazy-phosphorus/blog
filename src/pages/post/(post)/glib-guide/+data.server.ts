import type { FrontmatterType } from "@/types/frontmatter";
import cover from "./cover.webp";

export async function data(): Promise<FrontmatterType> {
    return {
        title: "GLib 库学习笔记",
        draft: false,
        date: {
            publish: new Date("2024-12-24"),
            modify: new Date("2024-12-24"),
        },
        description:
            "深入了解 GLib 库：一个由纯 C 语言编写的可跨平台工具库，包含面向对象、I/O 管理等功能。",
        categories: ["计算机科学", "C"],
        tags: ["第三方库", "C", "GLib", "GTK", "学习笔记"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
