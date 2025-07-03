import type { ComponentChildren, VNode } from "preact";
import { Code } from "@/components/code";
import { TypeException } from "@/exception/type-exception";

export function node2string(node: ComponentChildren): string {
    if (node === void 0 || node === null) return "";
    if (typeof node !== "object") return node.toString();
    if (node instanceof Array) return node.map((v) => node2string(v)).join("");
    if (typeof node === "object")
        return node2string((node as VNode).props.children);
    else
        throw new TypeException(
            "结点",
            (
                <>
                    应为<Code type="typ">JSX.Element</Code>类型。实际类型为
                    <Code type="typ">{typeof node}</Code>，值为
                    <Code type="default">{String(node)}</Code> 。
                </>
            ),
        );
}
