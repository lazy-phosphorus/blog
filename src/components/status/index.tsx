import { Badge } from "@/components/badge";
import { Tooltip } from "@/components/tooltip";
import { useData } from "@/hooks/use-data";
import type { PostDataType } from "@/types/post-data";
import { IconFilter } from "@svg/filter";
import { IconPost } from "@svg/post";
import { IconTag } from "@svg/tag";
import style from "./index.module.scss";

function categoryCount(posts: PostDataType["posts"]) {
    const temp = new Set<string>();
    for (const post of posts) {
        for (const category of post.frontmatter.categories) {
            temp.add(category);
        }
    }
    return temp.size;
}

function tagCount(posts: PostDataType["posts"]) {
    const temp = new Set<string>();
    for (const post of posts) {
        for (const tag of post.frontmatter.tags) {
            temp.add(tag);
        }
    }
    return temp.size;
}

function wordCount(posts: PostDataType["posts"]) {
    return posts.reduce(
        (acc, { frontmatter }) => acc + frontmatter.readingTime.words,
        0,
    );
}

export function Status() {
    const { posts } = useData<PostDataType>();

    return (
        <div class={style.status}>
            <Tooltip tip="文章总数" place="bottom">
                <Badge class={style.badge} icon={IconPost}>
                    {posts.length}
                </Badge>
            </Tooltip>
            <Tooltip tip="分类总数" place="bottom">
                <Badge class={style.badge} icon={IconFilter}>
                    {categoryCount(posts)}
                </Badge>
            </Tooltip>
            <Tooltip tip="标签总数" place="bottom">
                <Badge class={style.badge} icon={IconTag}>
                    {tagCount(posts)}
                </Badge>
            </Tooltip>
            <Tooltip tip="文字总数" place="bottom">
                <Badge class={style.badge} icon={IconTag}>
                    {(wordCount(posts) / 1000).toFixed(2)}K
                </Badge>
            </Tooltip>
        </div>
    );
}
