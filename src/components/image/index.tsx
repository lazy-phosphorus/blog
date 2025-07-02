import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { PlaceHolder } from "@/components/placeholder";
import style from "./index.module.scss";

type PropsType = Readonly<
    Omit<JSX.IntrinsicElements["div"], "children"> & {
        src: string;
        title: string;
        alt: string;
    }
>;

export function Image({ src, title, alt, ...props }: PropsType) {
    const isLoaded = useSignal(false);

    function handleOnLoad() {
        isLoaded.value = true;
    }

    function handleImgMounted(element: HTMLImageElement | null) {
        if (element === null) return;
        if (element.complete) isLoaded.value = true;
    }

    return (
        <div
            {...props}
            class={
                props.class !== void 0
                    ? `${style.image} ${props.class}`
                    : style.image
            }
        >
            <img
                ref={handleImgMounted}
                class={isLoaded.value ? void 0 : style.hidden}
                src={src}
                onLoad={handleOnLoad}
                title={title}
                alt={alt}
                loading="lazy"
            />
            <PlaceHolder
                class={
                    isLoaded.value
                        ? `${style.hidden} ${style.placeholder}`
                        : style.placeholder
                }
            />
        </div>
    );
}
