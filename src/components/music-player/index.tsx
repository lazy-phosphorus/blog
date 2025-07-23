import { useComputed, useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { Image } from "@/components/image";
import { IconNext } from "@svg/next";
import { IconPause } from "@svg/pause";
import { IconPlay } from "@svg/play";
import { IconPrevious } from "@svg/previous";
import { musicList } from "./config";
import style from "./index.module.scss";

function handleCanPlay(event: JSX.TargetedEvent<HTMLAudioElement>) {
    event.currentTarget.play();
}

export function MusicPlayer() {
    const index = useSignal(0);
    const isPaused = useSignal(true);

    const audioSrc = useComputed(() => musicList[index.value]!.src);
    const musicTitle = useComputed(() => musicList[index.value]!.title);
    const musicAuthor = useComputed(() => musicList[index.value]!.author);
    const coverSrc = useComputed(() => musicList[index.value]!.cover);
    const playTitle = useComputed(() => (isPaused.value ? "播放" : "暂停"));
    const playIcon = useComputed(() =>
        isPaused.value ? <IconPlay /> : <IconPause />,
    );

    const cover = useRef<HTMLButtonElement | null>(null);
    const audio = useRef<HTMLAudioElement | null>(null);
    const progress = useRef<HTMLDivElement | null>(null);
    const angle = useRef(0);
    const startTimestamp = useRef(-1);

    useEffect(() => {
        audio.current!.volume = 0.2;
        audio.current!.play();
    }, [audio]);

    /* onTimeUpdate 也可以实现，但是帧率很低 */
    const rotateAnime = useCallback<FrameRequestCallback>(
        (timestamp) => {
            if (audio.current!.paused) {
                startTimestamp.current = -1;
                return;
            } else if (startTimestamp.current !== -1) {
                angle.current += (timestamp - startTimestamp.current) * 0.005;
                if (angle.current > 360) angle.current -= 360;
                cover.current!.style.setProperty(
                    "--angle",
                    `${angle.current}deg`,
                );
            }
            startTimestamp.current = timestamp;
            requestAnimationFrame(rotateAnime);
        },
        [audio, startTimestamp, angle, cover],
    );

    const handlePrevious = useCallback(
        () =>
            (index.value =
                (index.peek() + musicList.length - 1) % musicList.length),
        [index, musicList],
    );

    const handleTogglePlay = useCallback(() => {
        if (audio.current!.paused) audio.current!.play();
        else audio.current!.pause();
    }, [audio]);

    const handleNext = useCallback(
        () => (index.value = (index.peek() + 1) % musicList.length),
        [index, musicList],
    );

    const handleOnPlay = useCallback(() => {
        isPaused.value = false;
        requestAnimationFrame(rotateAnime);
    }, [isPaused, rotateAnime]);

    const handleOnPause = useCallback(
        () => (isPaused.value = true),
        [isPaused],
    );

    const handleOnTimeUpdate = useCallback<
        JSX.GenericEventHandler<HTMLAudioElement>
    >(
        (event) => {
            const self = event.currentTarget;
            let ratio = (self.currentTime / self.duration) * 100;
            if (isNaN(ratio)) ratio = 0;
            progress.current!.style.setProperty(
                "--ratio",
                `${ratio.toFixed(2)}%`,
            );
        },
        [progress],
    );

    const handleTimeAdjust = useCallback<
        JSX.MouseEventHandler<HTMLButtonElement>
    >(
        (event) =>
            (audio.current!.currentTime =
                (audio.current!.duration * event.offsetX) /
                event.currentTarget.offsetWidth),
        [audio],
    );

    return (
        <div class={style.music}>
            <audio
                ref={audio}
                loop={false}
                preload="metadata"
                src={audioSrc}
                onPlay={handleOnPlay}
                onPause={handleOnPause}
                onEnded={handleNext}
                onCanPlay={handleCanPlay}
                onTimeUpdate={handleOnTimeUpdate}
            />
            <div class={style.info}>
                <div class={style.metadata}>
                    <div class={style.title}>{musicTitle}</div>
                    <div class={style.author}>{musicAuthor}</div>
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
                        title={playTitle}
                        onClick={handleTogglePlay}
                    >
                        {playIcon}
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
                title={playTitle}
                onClick={handleTogglePlay}
            >
                <Image
                    class={style.cover}
                    src={coverSrc}
                    alt="专辑封面"
                    title={musicTitle}
                />
            </button>
        </div>
    );
}
