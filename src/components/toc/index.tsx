import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { Link } from "@/components/link";
import { usePageContext } from "@/hooks/use-page-context";
import type { PostDataType } from "@/types/post-data";
import type { TocType } from "@/types/toc";
import { IconForward } from "@svg/forward";
import style from "./index.module.scss";

type PropsType = Readonly<{ toc: TocType[] }>;

function Tree({ toc }: PropsType) {
    return (
        <ul>
            {toc.map((toc) => {
                const value = toc.value.replaceAll(
                    /:((fun)|(var)|(typ)|(str)|(kwd))/g,
                    "",
                );
                return (
                    <li key={toc.value}>
                        <Link href={`#${value}`} title="点击跳转">
                            {value}
                        </Link>
                        {toc.children.length > 0 ? (
                            <Tree toc={toc.children} />
                        ) : (
                            void 0
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export function Toc() {
    const isClosed = useSignal(false);
    const { data, urlPathname } = usePageContext<PostDataType>();
    const toc = data.posts.find((v) => urlPathname.includes(v.dirname))!.toc;

    const handleToggleToc = useCallback(
        () => (isClosed.value = !isClosed.peek()),
        [isClosed],
    );

    const handleResize = useCallback(() => {
        if (innerWidth < 1200) isClosed.value = true;
    }, [isClosed]);

    useEffect(() => {
        handleResize();
        addEventListener("resize", handleResize);

        return () => {
            removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return (
        <aside
            class={`${style.toc}${isClosed.value ? ` ${style.closed}` : ""}`}
        >
            <button
                type="button"
                title={isClosed.value ? "展开目录" : "关闭目录"}
                onClick={handleToggleToc}
            >
                <IconForward class={style.svg} />
            </button>
            <div>
                <h1>目录</h1>
                <Tree toc={toc} />
            </div>
        </aside>
    );
}
