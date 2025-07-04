import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import bg from "@/assets/image/background/00.webp";
import { Background } from "@/components/background";
import { Code } from "@/components/code";
import { Notice } from "@/components/notice";
import { dispatchExceptionEvent } from "@/events/exception";
import { RuntimeException } from "@/exception/runtime-exception";
import { Header } from "./header";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

function handleError(this: Window, event: ErrorEvent) {
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
    event.preventDefault();
}

function handleRejection(this: Window, event: PromiseRejectionEvent) {
    console.log(event);
    event.preventDefault();
}

export function EuropaUniversalis({ children }: PropsType) {
    useEffect(() => {
        addEventListener("error", handleError);
        addEventListener("unhandledrejection", handleRejection);

        return () => {
            removeEventListener("error", handleError);
            removeEventListener("unhandledrejection", handleRejection);
        };
    }, []);

    return (
        <div class={style.eu4}>
            <Background src={bg} />
            <Notice />
            <header>
                <Header />
            </header>
            <div id="scroller" class={style.main}>
                <main>{children}</main>
            </div>
        </div>
    );
}
