import { readdir } from "fs/promises";
import { resolve } from "path";
import type { DataAsync } from "vike/types";
import type { FrontmatterType } from "@/types/frontmatter.d";
import type { PostDataType } from "@/types/post-data";
import type { TocType } from "@/types/toc";
import { srcPath } from "@/utils/path";

export async function data(): ReturnType<DataAsync<PostDataType>> {
    const posts: PostDataType["posts"] = [];
    const dirs = (
        await readdir(resolve(srcPath, "pages", "post", "(post)"))
    ).filter((v) => !v.startsWith("+"));
    for (const dir of dirs) {
        const f = await import(`./post/(post)/${dir}/+frontmatter.ts`).then(
            (v) => v.frontmatter as () => Promise<FrontmatterType>,
        );
        const toc = await import(`./post/(post)/${dir}/+Page.mdx`).then(
            (v) => v.toc as TocType[],
        );
        const frontmatter = await f();
        posts.push({
            dirname: dir,
            frontmatter,
            toc,
        });
    }

    return { posts };
}
