import type { JSX } from "preact";
import image from "@/assets/image/icon.webp";
import { Image } from "@/components/image";
import style from "./index.module.scss";

export function Avatar(props: Omit<JSX.IntrinsicElements["div"], "children">) {
    return (
        <div
            {...props}
            class={`${style.avatar}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            <Image
                class={style.img}
                src={image}
                title="惰性磷"
                alt="作者头像"
            />
        </div>
    );
}
