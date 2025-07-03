import { Frontmatter } from "@/components/frontmatter";
import { DataConsumer } from "@/hooks/use-data";
import { Card } from "@/layouts/card";
import type { DataType } from "@/pages/post/types";
import style from "./index.module.scss";

const PostConsumer = DataConsumer<DataType>;

function publishDateDesc(
    a: DataType["posts"][number],
    b: DataType["posts"][number],
) {
    return (
        b.frontmatter.date.publish.getTime() -
        a.frontmatter.date.publish.getTime()
    );
}

export function PostBrowser() {
    return (
        <PostConsumer>
            {({ posts }) =>
                posts
                    .toSorted(publishDateDesc)
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
