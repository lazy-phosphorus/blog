import { useSignal } from "@preact/signals";
import type { ComponentChildren, JSX } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { Dialog } from "@/components/dialog";
import {
    registerExceptionEventHandler,
    unregisterExceptionEventHandler,
} from "@/events/exception";
import type { ExceptionEventHandler } from "@/events/exception";
import { IconClose } from "@svg/close";
import style from "./index.module.scss";

type EventType = {
    level: "success" | "info" | "warning" | "error";
    mini: ComponentChildren;
    full: ComponentChildren;
    timestamp: Date;
    key: symbol;
};

export function Notice() {
    const events = useSignal<EventType[]>([]);
    const dialogContent = useSignal<ComponentChildren>(void 0);
    const closeText = useSignal<ComponentChildren>(void 0);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const exceptionHandler = useCallback<ExceptionEventHandler>(
        (event) => {
            events.value = [
                ...events.peek(),
                {
                    level: "error",
                    mini: event.exception.Title,
                    full: (
                        <div>
                            {event.exception.Title}
                            {event.exception.Message}
                        </div>
                    ),
                    timestamp: event.timestamp,
                    key: Symbol(),
                },
            ];
        },
        [events],
    );

    useEffect(() => {
        registerExceptionEventHandler(exceptionHandler);
        return () => {
            unregisterExceptionEventHandler(exceptionHandler);
        };
    }, [exceptionHandler]);

    const handleStartTransition = useCallback<
        JSX.AnimationEventHandler<HTMLDivElement>
    >(
        (event) =>
            event.currentTarget.parentElement!.parentElement!.classList.add(
                style.exit!,
            ),
        [],
    );

    const handleRemoveNotice = useCallback(
        (event: Event, key: symbol) => {
            events.value = events.peek().filter((v) => v.key !== key);
            event.stopPropagation();
        },
        [events],
    );

    const handleEventExited = useCallback(
        (event: JSX.TargetedTransitionEvent<HTMLLIElement>, key: symbol) => {
            if (event.propertyName !== "height") return;
            handleRemoveNotice(event, key);
        },
        [handleRemoveNotice],
    );

    const handleOpenDialog = useCallback(
        (
            event: JSX.TargetedEvent<HTMLDivElement>,
            content: ComponentChildren,
            level: "success" | "info" | "warning" | "error",
            key: symbol,
        ) => {
            dialogContent.value = content;
            switch (level) {
                case "success": {
                    closeText.value = "やったぜ！";
                    break;
                }
                case "info": {
                    closeText.value = "我已了解此信息";
                    break;
                }
                case "warning": {
                    closeText.value = "嫌だも嫌だ、無理も無理";
                    break;
                }
                case "error": {
                    closeText.value = "你动了我的DOM树？或是万年不升级浏览器？";
                    break;
                }
            }
            dialogRef.current!.showModal();
            handleRemoveNotice(event, key);
        },
        [dialogRef],
    );

    return (
        <>
            <Dialog ref={dialogRef} closeText={closeText}>
                {dialogContent}
            </Dialog>
            <ul class={style.notice}>
                {events.value.map(({ mini, full, key, level }) => {
                    return (
                        <li
                            key={key}
                            class={style[level]}
                            onTransitionEnd={(e) => handleEventExited(e, key)}
                        >
                            <div
                                onClick={(e) =>
                                    handleOpenDialog(e, full, level, key)
                                }
                            >
                                {mini}
                                <div
                                    class={style.counter}
                                    onAnimationEnd={handleStartTransition}
                                />
                                <button
                                    class={style.closer}
                                    type="button"
                                    title="关闭"
                                    onClick={(e) => {
                                        handleRemoveNotice(e, key);
                                    }}
                                >
                                    <IconClose />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
