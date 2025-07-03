import { Image } from "@/components/image";
import style from "./index.module.scss";

type PropsType = Readonly<{ src: string }>;

export function Background({ src }: PropsType) {
    return (
        <div class={style.background}>
            <Image
                class={style.image}
                src={src}
                alt="背景图片"
                title="segment fault (core dumped)"
            />
        </div>
    );
}
