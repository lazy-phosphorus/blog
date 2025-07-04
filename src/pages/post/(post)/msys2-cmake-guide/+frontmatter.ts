import type { FrontmatterType } from "@/types/frontmatter.d";
import cover from "./cover.webp";

export async function frontmatter(): Promise<FrontmatterType> {
    return {
        title: "MSYS2 与 CMake 编程综合指引",
        draft: false,
        date: {
            publish: new Date("2024-06-20"),
            modify: new Date("2024-12-16"),
        },
        description:
            "了解如何通过 MSYS2 安装 C/C++ 的编译工具链和第三方库，并使用 CMake 构建井然有序的工程。",
        categories: ["计算机科学", "C/C++"],
        tags: ["环境配置", "构建工具", "C/C++", "CMake", "MSYS2"],
        cover,
        readingTime: await import("./+Page.mdx").then((v) => v.readingTime),
    };
}
