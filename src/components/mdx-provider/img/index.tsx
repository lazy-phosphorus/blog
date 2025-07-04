import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { Image } from "@/components/image";
import { Mask } from "@/components/mask";
import style from "./index.module.scss";

type PropsType = {
    src: string;
    title: string;
    alt: string;
};

function handleImageMagnify(event: JSX.TargetedWheelEvent<HTMLDivElement>) {
    const self = event.currentTarget;
    const width = self.offsetWidth;
    if (width <= 200 && event.deltaY < 0) return;
    self.style.width = `${width + event.deltaY}px`;
}

export function img({ src, title, alt }: PropsType) {
    const isExpand = useSignal(false);
    const isMouseDown = useRef(false);
    const prevPoint = useRef<{ x: number; y: number } | null>(null);

    const handleImageZoomIn = useCallback(
        () => (isExpand.value = true),
        [isExpand],
    );

    const handleImageZoomOut = useCallback<
        JSX.MouseEventHandler<HTMLDivElement>
    >(
        (event) => {
            if (event.target !== event.currentTarget) return;
            isExpand.value = false;
        },
        [isExpand],
    );

    const handleImageMouseDown = useCallback(
        () => (isMouseDown.current = true),
        [isMouseDown],
    );

    const handleImageMouseUp = useCallback(() => {
        isMouseDown.current = false;
        prevPoint.current = null;
    }, [isMouseDown, prevPoint]);

    const handleMouseMove = useCallback<JSX.MouseEventHandler<HTMLDivElement>>(
        (event) => {
            const self = event.currentTarget;
            if (isMouseDown.current === false) return;
            if (prevPoint.current === null) {
                prevPoint.current = {
                    x: event.clientX,
                    y: event.clientY,
                };
                return;
            }
            const left = self.offsetLeft;
            const top = self.offsetTop;
            self.style.left = `${left + event.clientX - prevPoint.current.x}px`;
            self.style.top = `${top + event.clientY - prevPoint.current.y}px`;
            prevPoint.current = {
                x: event.clientX,
                y: event.clientY,
            };
        },
        [isMouseDown, prevPoint],
    );

    return (
        <>
            <figure class={style.figure}>
                <button type="button" onClick={handleImageZoomIn}>
                    <Image
                        src={src}
                        alt={alt}
                        title={title}
                        class={style.img}
                    />
                </button>
                <figcaption>{title}</figcaption>
            </figure>
            <Mask
                class={`${style.mask}${isExpand.value ? "" : ` ${style.hidden}`}`}
                onClick={handleImageZoomOut}
            >
                <Image
                    src={src}
                    alt={alt}
                    title={title}
                    class={style.img}
                    onWheel={handleImageMagnify}
                    onMouseDown={handleImageMouseDown}
                    onMouseUp={handleImageMouseUp}
                    onMouseOut={handleImageMouseUp}
                    onMouseMove={handleMouseMove}
                />
            </Mask>
        </>
    );
}
