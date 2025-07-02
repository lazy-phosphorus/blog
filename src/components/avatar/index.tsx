import image from "@/assets/image/icon.webp";
import { Image } from "@/components/image";
import style from "./index.module.scss";

export function Avatar() {
    return (
        <div class={style.avatar}>
            <Image
                class={style.img}
                src={image}
                title="切换控制面板"
                alt="作者头像"
            />
        </div>
    );
}
