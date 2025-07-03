import { readdir } from "fs/promises";
import { resolve } from "path";
import type { DataAsync } from "vike/types";
import type { PostDataType } from "@/types/post-data";
import { srcPath } from "@/utils/path";

export async function data(): ReturnType<DataAsync<PostDataType>> {
    const posts: PostDataType["posts"] = [];
    const dirs = (
        await readdir(resolve(srcPath, "pages", "post", "(post)"))
    ).filter((v) => !v.startsWith("+"));
    for (const dir of dirs) {
        const f = await import(`./post/(post)/${dir}/+data.server.ts`).then(
            (v) => v.data,
        );
        posts.push({
            dirname: dir,
            frontmatter: await f(),
        });
    }

    return { posts };
}
