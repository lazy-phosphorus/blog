import type { ComponentChildren } from "preact";
import { useCallback, useEffect } from "preact/hooks";
import bg from "@/assets/image/background/00.webp";
import { Background } from "@/components/background";
import { Code } from "@/components/code";
import { ControlPanel } from "@/components/control-panel";
import { LoadingBar } from "@/components/loading-bar";
import { Notice } from "@/components/notice";
import { dispatchNoticeEvent } from "@/events/notice";
import { useGloablSignal } from "@/hooks/use-global-signal";
import { Header } from "./header";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

function handleError(this: Window, event: ErrorEvent) {
    event.preventDefault();
    event.stopPropagation();

    dispatchNoticeEvent({
        mini: "一般错误",
        level: "error",
        full: (
            <>
                <h1>意料之外的错误</h1>
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
        close: "你动了我的 DOM 树？",
    });
}

function handleRejection(this: Window, event: PromiseRejectionEvent) {
    event.preventDefault();
    event.stopPropagation();

    dispatchNoticeEvent({
        mini: "异步错误",
        level: "error",
        full: (
            <>
                <h1>未被处理的异步错误</h1>
                <p>
                    传递给<Code type="fun">reject()</Code>函数的值为{" "}
                    {String(event.reason)}
                </p>
            </>
        ),
        close: "大概是网络不稳定罢（心虚）",
    });
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
