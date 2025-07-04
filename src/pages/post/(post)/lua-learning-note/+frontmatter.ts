import type { FrontmatterType } from "@/types/frontmatter.d";
import cover from "./cover.webp";

export async function frontmatter(): Promise<FrontmatterType> {
    return {
        title: "Lua 学习笔记",
        draft: false,
        date: {
            publish: new Date("2022-05-24"),
            modify: new Date("2025-03-31"),
        },
        description:
            "Lua：一个由纯 C 语言编写的可跨平台脚本语言，常见于游戏及服务器热更新领域。内含 Lua 与 C 互相调用代码示例。",
        categories: ["计算机科学", "Lua"],
        tags: ["第三方库", "C", "Lua", "学习笔记"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
