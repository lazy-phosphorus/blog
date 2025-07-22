import type { ComponentChildren, VNode } from "preact";

export function node2string(node: ComponentChildren): string {
    if (node === void 0 || node === null) return "";
    if (typeof node !== "object") return node.toString();
    if (node instanceof Array) return node.map((v) => node2string(v)).join("");
    if (typeof node === "object")
        return node2string((node as VNode).props.children);
    else
        throw new Error(
            `结点序列化：结点应为 JSX.Element 类型，实际类型为 ${typeof node}，值为 ${String(node)}`,
        );
}
