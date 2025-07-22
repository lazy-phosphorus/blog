import type { PostDataType } from "@/types/post-data";

export function draftFilter(posts: PostDataType["posts"]) {
    if (import.meta.env.PROD) return posts.filter((v) => !v.frontmatter.draft);
    else return posts;
}
