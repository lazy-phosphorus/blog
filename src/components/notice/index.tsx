import { useSignal } from "@preact/signals";
import type { ComponentChildren, JSX } from "preact";
import { useCallback, useEffect } from "preact/hooks";
import {
    registerExceptionEventHandler,
    unregisterExceptionEventHandler,
} from "@/events/exception";
import type { ExceptionEventHandler } from "@/events/exception";
import style from "./index.module.scss";

type EventType = {
    level: "success" | "info" | "warning" | "error";
    mini: ComponentChildren;
    full: ComponentChildren;
    timestamp: number;
};

export function Notice() {
    const events = useSignal<EventType[]>([]);

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
                    timestamp: event.timestamp.getTime(),
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
            event.currentTarget.parentElement!.classList.add(style.exit!),
        [events],
    );

    // TODO

    const handleRemoveNotice = useCallback(
        (event: JSX.TargetedTransitionEvent<HTMLDivElement>, key: number) => {
            console.log(event);

            // (events.value = events.peek().filter((v) => v.timestamp !== key)),
        },
        [events],
    );

    return (
        <ul class={style.notice}>
            {events.value.map(({ mini, timestamp, level }) => {
                return (
                    <li key={timestamp} class={style[level]}>
                        {mini}
                        <div
                            class={style.counter}
                            onAnimationEnd={handleStartTransition}
                            onTransitionEnd={(e) =>
                                handleRemoveNotice(e, timestamp)
                            }
                        />
                    </li>
                );
            })}
        </ul>
    );
}
