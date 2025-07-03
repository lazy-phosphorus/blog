import { Frontmatter } from "@/components/frontmatter";
import { DataConsumer } from "@/hooks/use-data";
import { Card } from "@/layouts/card";
import type { DataType } from "@/pages/post/types";
import style from "./index.module.scss";

const PostConsumer = DataConsumer<DataType>;

export function PostBrowser() {
    return (
        <PostConsumer>
            {({ posts }) =>
                posts.map(({ dirname, frontmatter }, i) => (
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
