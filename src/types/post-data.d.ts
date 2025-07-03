import type { FrontmatterType } from "./frontmatter";

export type PostDataType = {
    posts: { dirname: string; frontmatter: FrontmatterType }[];
};
