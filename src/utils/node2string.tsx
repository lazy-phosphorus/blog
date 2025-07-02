import type { ComponentChildren, VNode } from "preact";
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
                    应为 JSX.Element 类型。实际类型为 {typeof node} ，值为{" "}
                    {node} 。
                </>
            ),
        );
}
