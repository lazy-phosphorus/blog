import { Image } from "@/components/image";
import style from "./index.module.scss";

type PropsType = {
    src: string;
    title: string;
    alt: string;
};

export function img({ src, title, alt }: PropsType) {
    const isCover = title === alt && title === "文章封面";
    return (
        <>
            {isCover ? (
                <Image src={src} alt={alt} title={title} class={style.img} />
            ) : (
                <figure class={style.figure}>
                    <Image
                        src={src}
                        alt={alt}
                        title={title}
                        class={style.img}
                    />
                    <figcaption>{title}</figcaption>
                </figure>
            )}
        </>
    );
}
