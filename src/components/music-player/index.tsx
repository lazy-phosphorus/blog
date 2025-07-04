import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { Image } from "@/components/image";
import { IconNext } from "@svg/next";
import { IconPause } from "@svg/pause";
import { IconPlay } from "@svg/play";
import { IconPrevious } from "@svg/previous";
import { musicList } from "./config";
import style from "./index.module.scss";

export function MusicPlayer() {
    const index = useSignal(0);
    const isPaused = useSignal(true);

    const cover = useRef<HTMLButtonElement | null>(null);
    const audio = useRef<HTMLAudioElement | null>(null);
    const progress = useRef<HTMLDivElement | null>(null);
    const angle = useRef(0);
    const startTimestamp = useRef(-1);

    useEffect(() => {
        audio.current!.volume = 0.2;
    }, [audio]);

    /* onTimeUpdate 也可以实现，但是帧率很低 */
    function rotateAnime(timestamp: DOMHighResTimeStamp) {
        if (audio.current!.paused) {
            startTimestamp.current = -1;
            return;
        } else if (startTimestamp.current !== -1) {
            angle.current += (timestamp - startTimestamp.current) * 0.005;
            if (angle.current > 360) angle.current -= 360;
            cover.current!.style.setProperty("--angle", `${angle.current}deg`);
        }
        startTimestamp.current = timestamp;
        requestAnimationFrame(rotateAnime);
    }

    function handleCanPlay() {
        audio.current!.play();
    }

    function handlePrevious() {
        index.value = (index.peek() + musicList.length - 1) % musicList.length;
    }

    function handleTogglePlay() {
        if (audio.current!.paused) audio.current!.play();
        else audio.current!.pause();
        audio.current!.play();
    }

    function handleNext() {
        index.value = (index.peek() + 1) % musicList.length;
    }

    function handleOnPlay() {
        isPaused.value = false;
        requestAnimationFrame(rotateAnime);
    }

    function handleOnPause() {
        isPaused.value = true;
    }

    function handleOnEnd() {
        handleNext();
    }

    function handleOnTimeUpdate() {
        let ratio =
            (audio.current!.currentTime / audio.current!.duration) * 100;
        if (isNaN(ratio)) ratio = 0;
        progress.current!.style.setProperty("--ratio", `${ratio.toFixed(2)}%`);
    }

    function handleTimeAdjust(event: MouseEvent) {
        const self = event.currentTarget as HTMLButtonElement;
        audio.current!.currentTime =
            (audio.current!.duration * event.offsetX) / self.offsetWidth;
    }

    return (
        <div class={style.music}>
            <audio
                ref={audio}
                loop={false}
                preload="metadata"
                src={musicList[index.value]!.src}
                onPlay={handleOnPlay}
                onPause={handleOnPause}
                onEnded={handleOnEnd}
                onCanPlay={handleCanPlay}
                onTimeUpdate={handleOnTimeUpdate}
            />
            <div class={style.info}>
                <div class={style.metadata}>
                    <div class={style.title}>
                        {musicList[index.value]!.title}
                    </div>
                    <div class={style.author}>
                        {musicList[index.value]!.author}
                    </div>
                </div>
                <div class={style.controls}>
                    <button
                        type="button"
                        title="上一首"
                        onClick={handlePrevious}
                    >
                        <IconPrevious />
                    </button>
                    <button
                        type="button"
                        title={isPaused.value ? "播放" : "暂停"}
                        onClick={handleTogglePlay}
                    >
                        {isPaused.value ? <IconPlay /> : <IconPause />}
                    </button>
                    <button type="button" title="下一首" onClick={handleNext}>
                        <IconNext />
                    </button>
                </div>

                <button
                    type="button"
                    title="调整进度"
                    onClick={handleTimeAdjust}
                >
                    <div ref={progress} />
                </button>
            </div>
            <button
                ref={cover}
                type="button"
                title={isPaused.value ? "播放" : "暂停"}
                onClick={handleTogglePlay}
            >
                <Image
                    class={style.cover}
                    src={musicList[index.value]!.cover}
                    alt="专辑封面"
                    title={musicList[index.value]!.title}
                />
            </button>
        </div>
    );
}
