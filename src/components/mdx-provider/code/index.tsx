import { useComputed, useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import type { JSX } from "preact";
import { useCallback } from "preact/hooks";
import { Code } from "@/components/code";
import { IconCheck } from "@/components/svg/check";
import { GrammarException } from "@/exception/grammar-exception";
import { IconCopy } from "@svg/copy";
import style from "./index.module.scss";

function Button() {
    const isPending = useSignal(false);

    const icon = useComputed(() =>
        isPending.value ? <IconCheck /> : <IconCopy />,
    );

    const handleCopyCode = useCallback<
        JSX.MouseEventHandler<HTMLButtonElement>
    >(
        (event) => {
            navigator.clipboard.writeText(
                event.currentTarget.parentElement!.innerText,
            );
            isPending.value = true;
            setTimeout(() => (isPending.value = false), 3000);
        },
        [isPending],
    );

    return (
        <button
            disabled={isPending}
            class={style.button}
            type="button"
            title="复制代码"
            onClick={handleCopyCode}
        >
            {icon}
        </button>
    );
}

const regex = /^(.+?):((fun)|(var)|(typ)|(str)|(kwd))$/;

function calculateText(children: string) {
    const result = regex.exec(children);
    return result === null ? children : result[1];
}

function calculateType(children: string) {
    const result = regex.exec(children);
    const type = result === null ? null : result[2];
    if (type === void 0)
        throw new GrammarException(
            "行内代码块",
            (
                <p>
                    正则表达式与字符串不匹配。字符串为
                    <Code type="str">{children}</Code>,匹配结果为
                    <Code type="default">{type}</Code>。
                </p>
            ),
        );
    return type === null ? "default" : (type as "str");
}

type PropsType = Readonly<{ children: ComponentChildren }>;

export function code({ children }: PropsType) {
    if (typeof children !== "string")
        return (
            <>
                <Button />
                <code class={style.block}>{children}</code>
            </>
        );

    const text = calculateText(children);
    const type = calculateType(children);

    return <Code type={type}>{text}</Code>;
}
