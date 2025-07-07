import { Link } from "@/components/link";
import { DataConsumer } from "@/hooks/use-data";
import { Card } from "@/layouts/card";
import type { PostDataType } from "@/types/post-data";
import { tagList } from "@/utils/post-statistics";
import style from "./index.module.scss";

const PostConsumer = DataConsumer<PostDataType>;

export function TagList() {
    return (
        <PostConsumer>
            {({ posts }) => {
                const tags = tagList(posts);
                return (
                    <Card class={style.card}>
                        <ul>
                            {[...tags.entries()].map((tag) => (
                                <li key={tag[0]}>
                                    <Link
                                        href={`/post/?tag=${encodeURIComponent(tag[0])}`}
                                        title="通过此标签检索文章"
                                    >
                                        {tag[0]}({tag[1]})
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Card>
                );
            }}
        </PostConsumer>
    );
}
