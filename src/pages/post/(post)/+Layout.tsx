import type { ComponentChildren } from "preact";
import { Frontmatter } from "@/components/frontmatter";
import { MdxProvider } from "@/components/mdx-provider";
import { DataConsumer } from "@/hooks/use-data";
import { Paper } from "@/layouts/paper";
import type { FrontmatterType } from "@/types/frontmatter";

type PropsType = Readonly<{ children: ComponentChildren }>;

const PostConsumer = DataConsumer<FrontmatterType>;

export function Layout({ children }: PropsType) {
    return (
        <MdxProvider>
            <Paper>
                <PostConsumer>
                    {(frontmatter) => <Frontmatter frontmatter={frontmatter} />}
                </PostConsumer>
                {children}
            </Paper>
        </MdxProvider>
    );
}
