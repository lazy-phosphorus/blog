import type { ComponentChildren } from "preact";
import { Frontmatter } from "@/components/frontmatter";
import { MdxProvider } from "@/components/mdx-provider";
import { Toc } from "@/components/toc";
import { PageContextConsumer } from "@/hooks/use-page-context";
import { Paper } from "@/layouts/paper";
import type { PostDataType } from "@/types/post-data";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function Layout({ children }: PropsType) {
    return (
        <MdxProvider>
            <Paper>
                <PageContextConsumer>
                    {({ data, urlPathname }) => {
                        const { posts } = data as PostDataType;
                        const i = posts.findIndex((v) =>
                            urlPathname.includes(v.dirname),
                        );
                        return (
                            <Frontmatter frontmatter={posts[i]!.frontmatter} />
                        );
                    }}
                </PageContextConsumer>
                {children}
            </Paper>
            <Toc />
        </MdxProvider>
    );
}
