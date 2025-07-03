import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { Image } from "@/components/image";
import { Mask } from "@/components/mask";
import style from "./index.module.scss";

type PropsType = {
    src: string;
    title: string;
    alt: string;
};

export function img({ src, title, alt }: PropsType) {
    const isExpand = useSignal(false);
    const isMouseDown = useRef(false);
    const prevPoint = useRef<{ x: number; y: number } | null>(null);

    function handleImageZoomIn() {
        isExpand.value = true;
    }

    function handleImageZoomOut(event: MouseEvent) {
        if (event.target !== event.currentTarget) return;
        isExpand.value = false;
    }

    function handleImageMagnify(event: WheelEvent) {
        const self = event.target as HTMLDivElement;
        const width = self.offsetWidth;
        if (width <= 200 && event.deltaY < 0) return;
        self.style.width = `${width + event.deltaY}px`;
    }

    function handleImageMouseDown() {
        isMouseDown.current = true;
    }

    function handleImageMouseUp() {
        isMouseDown.current = false;
        prevPoint.current = null;
    }

    function handleMouseMove(event: MouseEvent) {
        const self = event.currentTarget as HTMLDivElement;
        console.log(event);
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
    }

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
