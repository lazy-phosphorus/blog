import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { Tooltip } from "@/components/tooltip";
import { Waterfall } from "@/layouts/waterfall";
import type { FrontmatterType } from "@/types/frontmatter";
import { date2string } from "@/utils/date2string";
import { IconTag } from "@svg/tag";
import { IconTimer } from "@svg/timer";
import { IconUpdate } from "@svg/update";
import { IconUpload } from "@svg/upload";
import { IconWord } from "@svg/word";
import { IconFilter } from "../svg/filter";
import style from "./index.module.scss";

type PropsType = Readonly<{ frontmatter: FrontmatterType; href?: string }>;

export function Frontmatter({ frontmatter, href }: PropsType) {
    return (
        <div class={style.frontmatter}>
            <h1>
                {href !== void 0 ? (
                    <Link class={style.link} href={href} title="阅读文章">
                        {frontmatter.title}
                    </Link>
                ) : (
                    frontmatter.title
                )}
            </h1>
            <Waterfall class={style.waterfall}>
                <Tooltip class={style.metadata} tip="发布日期" place="top">
                    <IconUpload />
                    <time datetime={date2string(frontmatter.date.publish)}>
                        {date2string(frontmatter.date.publish)}
                    </time>
                </Tooltip>
                <Tooltip class={style.metadata} tip="更新日期" place="top">
                    <IconUpdate />
                    <time datetime={date2string(frontmatter.date.modify)}>
                        {date2string(frontmatter.date.modify)}
                    </time>
                </Tooltip>
                <Tooltip class={style.metadata} tip="文本数量" place="top">
                    <IconWord />
                    <span>
                        {(frontmatter.readingTime.words / 1000).toFixed(2)} K
                    </span>
                </Tooltip>
                <Tooltip class={style.metadata} tip="阅读时长" place="top">
                    <IconTimer />
                    <span>
                        {frontmatter.readingTime.minutes.toFixed(2)} min
                    </span>
                </Tooltip>
                <Tooltip class={style.metadata} tip="分类" place="top">
                    <IconFilter />
                    <ul>
                        {frontmatter.categories.map((category) => (
                            <li key={category}>
                                <Link
                                    href={`/category/${encodeURIComponent(category)}/`}
                                    title="查看此分类"
                                >
                                    {category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Tooltip>
                <Tooltip class={style.metadata} tip="标签" place="top">
                    <IconTag />
                    <ul>
                        {frontmatter.tags.map((tag) => (
                            <li key={tag}>
                                <Link
                                    href={`/tag/${encodeURIComponent(tag)}/`}
                                    title="查看此标签"
                                >
                                    {tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Tooltip>
            </Waterfall>
            {href !== void 0 ? (
                <>
                    <Link class={style.imglink} href={href} title="阅读文章">
                        <Image
                            class={style.image}
                            src={frontmatter.cover}
                            alt="文章封面"
                            title="阅读文章"
                        />
                    </Link>
                    <p>{frontmatter.description}</p>
                </>
            ) : (
                <Image
                    class={style.image}
                    src={frontmatter.cover}
                    alt="文章封面"
                    title="阅读文章"
                />
            )}
        </div>
    );
}
