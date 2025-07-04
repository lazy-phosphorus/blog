import type { CategoryType } from "@/types/category";
import type { PostDataType } from "@/types/post-data";

export function categoryCount(posts: PostDataType["posts"]) {
    const temp = new Set<string>();
    for (const post of posts) {
        for (const category of post.frontmatter.categories) {
            temp.add(category);
        }
    }
    return temp.size;
}

export function tagCount(posts: PostDataType["posts"]) {
    const temp = new Set<string>();
    for (const post of posts) {
        for (const tag of post.frontmatter.tags) {
            temp.add(tag);
        }
    }
    return temp.size;
}

export function wordCount(posts: PostDataType["posts"]) {
    return posts.reduce(
        (acc, { frontmatter }) => acc + frontmatter.readingTime.words,
        0,
    );
}

export function categoryTree(posts: PostDataType["posts"]) {
    const tree = new Array<CategoryType>();
    const counter = new Map<string, number>();

    for (const post of posts) {
        let current = tree;
        for (const category of post.frontmatter.categories) {
            const quantity = counter.get(category);
            if (quantity !== void 0) counter.set(category, quantity + 1);
            else counter.set(category, 1);

            const temp = current.find((value) => value.name === category);
            if (temp === void 0) {
                current.push({ name: category, children: [] });
                current = current[current.length - 1]!.children;
            } else current = temp.children;
        }
    }

    return { tree, counter };
}

export function tagList(posts: PostDataType["posts"]) {
    const result = new Map<string, number>();

    for (const post of posts) {
        for (const tag of post.frontmatter.tags) {
            const temp = result.get(tag);
            if (temp === void 0) result.set(tag, 1);
            else result.set(tag, temp + 1);
        }
    }
    return result;
}
