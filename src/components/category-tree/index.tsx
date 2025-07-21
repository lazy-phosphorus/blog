import { useComputed, useSignal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import { useCallback, useMemo } from "preact/hooks";
import { Link } from "@/components/link";
import { useData } from "@/hooks/use-data";
import { Card } from "@/layouts/card";
import type { CategoryType } from "@/types/category";
import type { PostDataType } from "@/types/post-data";
import { draftFilter } from "@/utils/draft-filter";
import { categoryTree } from "@/utils/post-statistics";
import style from "./index.module.scss";

type PropsType = Readonly<{
    categories: CategoryType[];
    counter: Map<string, number>;
    indexes: Signal<number[]>;
    depth: number;
}>;

function CategoryList({ categories, counter, indexes, depth }: PropsType) {
    const handleExpand = useCallback(
        (index: number) =>
            (indexes.value = [...indexes.peek().slice(0, depth), index]),
        [indexes],
    );

    return (
        <ul class={style.ul}>
            {categories.map((v, index) => (
                <li key={v.name}>
                    {v.children.length !== 0 ? (
                        <button
                            type="button"
                            title="展开分类"
                            onClick={() => handleExpand(index)}
                            disabled={indexes.value[depth] === index}
                        >
                            {v.name}({counter.get(v.name)})
                        </button>
                    ) : (
                        <Link
                            href={`/post/?category=${encodeURIComponent(v.name)}`}
                            title="通过此分类检索文章"
                        >
                            {v.name}({counter.get(v.name)})
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
}

export function CategoryTree() {
    const { posts } = useData<PostDataType>();
    const { tree, counter } = useMemo(
        () => categoryTree(draftFilter(posts)),
        [posts],
    );

    const indexes = useSignal<number[]>([]);
    const lists = useComputed(() =>
        indexes.value.map((v, i) => (
            <CategoryList
                depth={i + 1}
                key={tree[v]!.name}
                indexes={indexes}
                categories={tree[v]!.children}
                counter={counter}
            />
        )),
    );

    return (
        <Card class={style.card}>
            <CategoryList
                depth={0}
                indexes={indexes}
                categories={tree}
                counter={counter}
            />
            {lists}
        </Card>
    );
}
