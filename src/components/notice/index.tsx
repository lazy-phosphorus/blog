import { batch, useSignal } from "@preact/signals";
import type { ComponentChildren, JSX } from "preact";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { Dialog } from "@/components/dialog";
import {
    registerExceptionEventHandler,
    unregisterExceptionEventHandler,
} from "@/events/exception";
import type { ExceptionEventHandler } from "@/events/exception";
import {
    registerSuccessEventHandler,
    unregisterSuccessEventHandler,
} from "@/events/success";
import type { SuccessEventHandler } from "@/events/success";
import { IconClose } from "@svg/close";
import style from "./index.module.scss";

type EventType = {
    level: "success" | "info" | "warning" | "error";
    mini: ComponentChildren;
    full?: ComponentChildren;
    timestamp: Date;
    key: symbol;
    duration?: number;
};

export function Notice() {
    const events = useSignal<EventType[]>([]);
    const dialogContent = useSignal<ComponentChildren>(void 0);
    const closeText = useSignal<ComponentChildren>(void 0);
    const dialogRef = useRef<{ showModal: () => void } | null>(null);

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

    const successHandler = useCallback<SuccessEventHandler>(
        (event) => {
            events.value = [
                ...events.peek(),
                {
                    level: "success",
                    mini: event.text,
                    timestamp: event.timestamp,
                    key: Symbol(),
                    duration: 5,
                },
            ];
        },
        [events],
    );

    useEffect(() => {
        registerExceptionEventHandler(exceptionHandler);
        registerSuccessEventHandler(successHandler);
        return () => {
            unregisterExceptionEventHandler(exceptionHandler);
            unregisterSuccessEventHandler(successHandler);
        };
    }, [exceptionHandler]);

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
        (
            event: JSX.TargetedEvent<HTMLDivElement>,
            content: ComponentChildren,
            level: "success" | "info" | "warning" | "error",
        ) => {
            batch(() => {
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
                        closeText.value =
                            "你动了我的DOM树？或是万年不升级浏览器？";
                        break;
                    }
                }
            });
            dialogRef.current!.showModal();
            event.currentTarget!.parentElement!.classList.add(style.exit!);
        },
        [dialogRef],
    );

    return (
        <>
            <Dialog dialogRef={dialogRef} closeText={closeText}>
                {dialogContent}
            </Dialog>
            <ul class={style.notice}>
                {events.value.map(({ mini, full, key, level, duration }) => (
                    <li
                        key={key}
                        class={style[level]}
                        onTransitionEnd={(e) => handleExited(e, key)}
                    >
                        <div
                            class={full === void 0 ? style.plain : void 0}
                            onClick={
                                full === void 0
                                    ? void 0
                                    : (e) => handleOpenDialog(e, full, level)
                            }
                        >
                            {mini}
                            <div
                                class={`${style.counter}${duration === void 0 ? ` ${style.infinite}` : ""}`}
                                style={
                                    duration === void 0
                                        ? void 0
                                        : { "--duration": `${duration}s` }
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
                ))}
            </ul>
        </>
    );
}
