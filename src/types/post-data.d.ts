import type { FrontmatterType } from "./frontmatter";
import type { TocType } from "./toc";

export type PostDataType = {
    posts: {
        dirname: string;
        frontmatter: FrontmatterType;
        toc: TocType[];
    }[];
};
