import { readdir } from "fs/promises";
import { resolve } from "path";
import type { DataAsync } from "vike/types";
import { srcPath } from "@/utils/path";
import type { DataType } from "./types";

export async function data(): ReturnType<DataAsync<DataType>> {
    const posts: DataType["posts"] = [];
    const dirs = (
        await readdir(resolve(srcPath, "pages", "post", "(post)"))
    ).filter((v) => !v.startsWith("+"));
    for (const dir of dirs) {
        const f = await import(`./(post)/${dir}/+data.server.ts`).then(
            (v) => v.data,
        );
        posts.push({
            dirname: dir,
            frontmatter: await f(),
        });
    }

    return { posts };
}
