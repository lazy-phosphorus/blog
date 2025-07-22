import { batch, useComputed, useSignal } from "@preact/signals";
import type { ComponentChildren, JSX } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { Dialog } from "@/components/dialog";
import {
    registerNoticeEventHandler,
    unregisterNoticeEventHandler,
} from "@/events/notice";
import type { NoticeEventHandler, NoticeEventType } from "@/events/notice";
import { IconClose } from "@svg/close";
import style from "./index.module.scss";

export function Notice() {
    const events = useSignal<NoticeEventType[]>([]);
    const dialogContent = useSignal<ComponentChildren>(void 0);
    const closeText = useSignal<ComponentChildren>(void 0);
    const dialogRef = useRef<{ showModal: () => void } | null>(null);

    const eventHandler = useCallback<NoticeEventHandler>(
        (event) => (events.value = [...events.peek(), event]),
        [events],
    );

    useEffect(() => {
        registerNoticeEventHandler(eventHandler);

        return () => {
            unregisterNoticeEventHandler(eventHandler);
        };
    }, [eventHandler]);

    const handleStartExit = useCallback(
        (event: JSX.TargetedEvent<HTMLDivElement | HTMLButtonElement>) => {
            event.stopPropagation();

            event.currentTarget.parentElement!.parentElement!.classList.add(
                style.exit!,
            );
        },
        [],
    );

    const handleExited = useCallback(
        (event: JSX.TargetedTransitionEvent<HTMLLIElement>, key: symbol) => {
            if (event.propertyName !== "height") return;

            event.stopPropagation();

            events.value = events.peek().filter((v) => v.key !== key);
        },
        [events],
    );

    const handleOpenDialog = useCallback(
        (e: JSX.TargetedEvent<HTMLDivElement>, event: NoticeEventType) => {
            batch(() => {
                dialogContent.value = event.full;
                closeText.value = event.close;
            });
            dialogRef.current!.showModal();
            e.currentTarget!.parentElement!.classList.add(style.exit!);
        },
        [dialogRef],
    );

    const eventLi = useComputed(() =>
        events.value.map((event) => (
            <li
                key={event.key}
                class={style[event.level]}
                onTransitionEnd={(e) => handleExited(e, event.key)}
            >
                <div
                    class={event.full === void 0 ? style.plain : void 0}
                    onClick={
                        event.full === void 0
                            ? void 0
                            : (e) => handleOpenDialog(e, event)
                    }
                >
                    {event.mini}
                    <div
                        class={`${style.counter}${event.duration === void 0 ? ` ${style.infinite}` : ""}`}
                        style={
                            event.duration === void 0
                                ? void 0
                                : { "--duration": `${event.duration}s` }
                        }
                        onAnimationEnd={handleStartExit}
                    />
                    <button
                        class={style.closer}
                        type="button"
                        title="关闭"
                        onClick={handleStartExit}
                    >
                        <IconClose />
                    </button>
                </div>
            </li>
        )),
    );

    return (
        <>
            <Dialog dialogRef={dialogRef} closeText={closeText}>
                {dialogContent}
            </Dialog>
            <ul class={style.notice}>{eventLi}</ul>
        </>
    );
}
