import { useComputed } from "@preact/signals";
import type { Signal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { useCallback } from "preact/hooks";
import { Mask } from "@/components/mask";
import style from "./index.module.scss";

type PropsType = Readonly<{
    children: ComponentChildren;
    position: "left" | "right";
    isOpen: Signal<boolean>;
    class?: string;
}>;

export function Drawer({ children, position, isOpen, ...props }: PropsType) {
    const handleCloseDrawer = useCallback(
        () => (isOpen.value = false),
        [isOpen],
    );

    const maskClass = useComputed(() => (isOpen.value ? void 0 : style.hidden));

    return (
        <>
            <Mask class={maskClass} onClick={handleCloseDrawer} />
            <aside
                class={`${style.drawer} ${style[position]}${isOpen.value ? "" : ` ${style.closed}`}${props.class === void 0 ? "" : ` ${props.class}`}`}
            >
                {children}
            </aside>
        </>
    );
}
