import { useComputed, useSignal } from "@preact/signals";
import { useCallback, useEffect, useRef } from "preact/hooks";
import {
    registerLoadingEventHandler,
    unregisterLoadingEventHandler,
} from "@/events/loading";
import type { LoadingEventHandler } from "@/events/loading";
import style from "./index.module.scss";

export function LoadingBar() {
    const width = useSignal(0);
    const startTimestampRef = useRef(-1);

    const divClass = useComputed(
        () =>
            `${style.loading}${width.value === 100 ? ` ${style.finish}` : ""}`,
    );
    const divStyle = useComputed(() => ({ "--width": `${width.value}%` }));

    const animation = useCallback(
        (timestamp: DOMHighResTimeStamp) => {
            if (startTimestampRef.current === -2) return;
            if (startTimestampRef.current === -1) {
                startTimestampRef.current = timestamp;
                requestAnimationFrame(animation);
                return;
            }

            width.value =
                (Math.atan((timestamp - startTimestampRef.current) / 2000) *
                    200) /
                Math.PI;
            requestAnimationFrame(animation);
        },
        [width, startTimestampRef],
    );

    const loadingEventHandler = useCallback<LoadingEventHandler>(
        (event) => {
            if (event.type === "start") requestAnimationFrame(animation);
            else {
                startTimestampRef.current = -2;
                width.value = 100;
            }
        },
        [animation, startTimestampRef, width],
    );

    useEffect(() => {
        registerLoadingEventHandler(loadingEventHandler);

        return () => {
            unregisterLoadingEventHandler(loadingEventHandler);
            startTimestampRef.current = -2;
        };
    }, [startTimestampRef, loadingEventHandler]);

    const handleHidden = useCallback(() => {
        startTimestampRef.current = -1;
        width.value = 0;
    }, [startTimestampRef, width]);

    return (
        <div class={divClass} onTransitionEnd={handleHidden}>
            <div style={divStyle} />
        </div>
    );
}
