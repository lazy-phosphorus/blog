import type { PageContext } from "vike/types";
import type { PostDataType } from "@/types/post-data";

export function title(context: PageContext<PostDataType>) {
    const index = context.data.posts.findIndex((v) =>
        context.urlPathname.includes(v.dirname),
    );
    if (index === -1) return "NullPointerException";
    return context.data.posts[index]!.frontmatter.title;
}
