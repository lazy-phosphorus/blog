import { Link } from "@/components/link";
import { DataConsumer } from "@/hooks/use-data";
import type { DataType } from "./types";

const PostConsumer = DataConsumer<DataType>;

export function Page() {
    // TODO
    return (
        <>
            <div>post page</div>
            <a href="/">home page</a>
            <ul>
                <PostConsumer>
                    {({ posts }) =>
                        posts.map((post) => (
                            <li key={post}>
                                <Link title="阅读文章" href={`/post/${post}/`}>
                                    {post}
                                </Link>
                            </li>
                        ))
                    }
                </PostConsumer>
            </ul>
        </>
    );
}
