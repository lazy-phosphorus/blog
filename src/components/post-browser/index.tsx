import { Frontmatter } from "@/components/frontmatter";
import { DataConsumer } from "@/hooks/use-data";
import { Card } from "@/layouts/card";
import type { PostDataType } from "@/types/post-data";
import style from "./index.module.scss";

const PostConsumer = DataConsumer<PostDataType>;

function publishDateDesc(
    a: PostDataType["posts"][number],
    b: PostDataType["posts"][number],
) {
    return (
        b.frontmatter.date.publish.getTime() -
        a.frontmatter.date.publish.getTime()
    );
}

type PropsType = Readonly<{ category?: string; tag?: string }>;

export function PostBrowser({ category, tag }: PropsType) {
    return (
        <PostConsumer>
            {({ posts }) =>
                posts
                    .toSorted(publishDateDesc)
                    .filter(({ frontmatter }) => {
                        if (category !== void 0)
                            return frontmatter.categories.includes(category);
                        if (tag !== void 0)
                            return frontmatter.tags.includes(tag);
                        return true;
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
                    ))
            }
        </PostConsumer>
    );
}
