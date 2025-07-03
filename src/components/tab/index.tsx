import { useSignal } from "@preact/signals";
import type { ComponentChild, ComponentChildren, JSX, VNode } from "preact";
import { node2string } from "@/utils/node2string";
import style from "./index.module.scss";

type TabPropsType = Readonly<{
    children: ComponentChildren;

    title: ComponentChildren;
}>;

export function Tab({ children }: TabPropsType) {
    return <div>{children}</div>;
}

type TabsPropsType = Readonly<{
    children: ComponentChild[];
}>;

export function Tabs({ children }: TabsPropsType) {
    const index = useSignal(0);

    function handleTabShift(
        event: JSX.TargetedMouseEvent<HTMLButtonElement>,
        i: number,
    ) {
        const self = event.currentTarget;
        self.parentElement!.nextElementSibling!.children[
            index.peek()
        ]!.classList.remove(style.block!);
        self.parentElement!.nextElementSibling!.children[i]!.classList.add(
            style.block!,
        );
        index.value = i;
    }

    return (
        <div class={style.tab}>
            <div>
                {children.map((v, i) => {
                    const title = (v as VNode<TabPropsType>).props.title;
                    return (
                        <button
                            key={node2string(v)}
                            disabled={index.value === i}
                            type="button"
                            title={node2string(title)}
                            onClick={(e) => handleTabShift(e, i)}
                        >
                            {title}
                        </button>
                    );
                })}
            </div>
            <div>{children}</div>
        </div>
    );
}
