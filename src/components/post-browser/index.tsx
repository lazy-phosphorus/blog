import { Frontmatter } from "@/components/frontmatter";
import { usePageContext } from "@/hooks/use-page-context";
import { Card } from "@/layouts/card";
import type { PostDataType } from "@/types/post-data";
import { draftFilter } from "@/utils/draft-filter";
import style from "./index.module.scss";

function publishDateDesc(
    a: PostDataType["posts"][number],
    b: PostDataType["posts"][number],
) {
    return (
        b.frontmatter.date.publish.getTime() -
        a.frontmatter.date.publish.getTime()
    );
}

export function PostBrowser() {
    const { data, urlParsed } = usePageContext<PostDataType>();
    const category = urlParsed.search.category;
    const tag = urlParsed.search.tag;
    return (
        <>
            {draftFilter(data.posts)
                .toSorted(publishDateDesc)
                .filter(({ frontmatter }) => {
                    let result = true;
                    if (category !== void 0)
                        result =
                            result &&
                            frontmatter.categories.includes(
                                decodeURIComponent(category),
                            );
                    if (tag !== void 0)
                        result =
                            result &&
                            frontmatter.tags.includes(decodeURIComponent(tag));
                    return result;
                })
                .map(({ dirname, frontmatter }, i) => (
                    <Card
                        class={style.postcard}
                        key={dirname}
                        style={{ "--postcard-delay": `${i * 0.125}s` }}
                    >
                        <Frontmatter
                            frontmatter={frontmatter}
                            href={`/post/${dirname}/`}
                        />
                    </Card>
                ))}
        </>
    );
}
