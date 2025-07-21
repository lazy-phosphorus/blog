import type { ComponentChildren } from "preact";
import { useCallback, useEffect } from "preact/hooks";
import bg from "@/assets/image/background/00.webp";
import { Background } from "@/components/background";
import { Code } from "@/components/code";
import { ControlPanel } from "@/components/control-panel";
import { LoadingBar } from "@/components/loading-bar";
import { Notice } from "@/components/notice";
import { dispatchExceptionEvent } from "@/events/exception";
import { AsyncException } from "@/exception/async-exception";
import { RuntimeException } from "@/exception/runtime-exception";
import { useGloablSignal } from "@/hooks/useGlobalSignal";
import { Header } from "./header";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

function handleError(this: Window, event: ErrorEvent) {
    event.preventDefault();
    event.stopPropagation();

    dispatchExceptionEvent(
        new RuntimeException(
            (
                <>
                    <p>错误发生于：</p>
                    <p>
                        <Code type="default">{event.filename}</Code>的第{" "}
                        {event.lineno} 行第 {event.colno} 列
                    </p>
                    <p>
                        错误信息为：<Code type="str">"{event.message}"</Code>
                    </p>
                </>
            ),
        ),
    );
}

function handleRejection(this: Window, event: PromiseRejectionEvent) {
    event.preventDefault();
    event.stopPropagation();

    dispatchExceptionEvent(
        new AsyncException(
            (
                <p>
                    传递给<Code type="fun">reject()</Code>函数的值为{" "}
                    {String(event.reason)}
                </p>
            ),
        ),
    );
}

export function EuropaUniversalis({ children }: PropsType) {
    const { isControlPanelVisible } = useGloablSignal();

    useEffect(() => {
        addEventListener("error", handleError);
        addEventListener("unhandledrejection", handleRejection);

        return () => {
            removeEventListener("error", handleError);
            removeEventListener("unhandledrejection", handleRejection);
        };
    }, []);

    const handleAvatarClick = useCallback(() => {
        isControlPanelVisible.value = !isControlPanelVisible.peek();
    }, [isControlPanelVisible]);

    // TODO footer
    return (
        <div class={style.eu4}>
            <Background src={bg} />
            <LoadingBar />
            <Notice />
            <header>
                <Header onAvatarClick={handleAvatarClick} />
            </header>
            <div id="scroller" class={style.main}>
                <main>{children}</main>
            </div>
            <ControlPanel />
            <footer> </footer>
        </div>
    );
}
