import type { FrontmatterType } from "@/types/frontmatter";

export interface DataType {
    posts: {
        dirname: string;
        frontmatter: FrontmatterType;
    }[];
}
