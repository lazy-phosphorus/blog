import { useSignal } from "@preact/signals";
import type { JSX, RefCallback } from "preact";
import { useCallback } from "preact/hooks";
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

    const handleOnLoad = useCallback(() => (isLoaded.value = true), [isLoaded]);

    const handleImgMounted = useCallback<RefCallback<HTMLImageElement>>(
        (element) => {
            if (element === null) return;
            if (element.complete) isLoaded.value = true;
        },
        [isLoaded],
    );

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
