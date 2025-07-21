import { useSignal } from "@preact/signals";
import type { ComponentChildren, JSX } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import style from "./index.module.scss";
import { Label } from "./label";

type PropsType = Readonly<{
    buttons: string;
    children: ComponentChildren;
}>;
type Labels = Array<{ label: string; language: string }>;

export function CodeTab({ children, buttons }: PropsType) {
    const index = useSignal(0);

    const labels = useMemo(() => JSON.parse(buttons) as Labels, [buttons]);

    const handleTabsShift = useCallback(
        (event: JSX.TargetedMouseEvent<HTMLButtonElement>, i: number) => {
            const self = event.currentTarget;
            const container = self.parentElement!.nextElementSibling!;
            container.children[index.peek()]!.classList.remove(style.block!);
            container.children[i]!.classList.add(style.block!);
            index.value = i;
        },
        [index],
    );

    return (
        <div class={style.codetab}>
            <div>
                {labels.map(({ label, language }, i) => (
                    <button
                        key={label}
                        disabled={index.value === i}
                        type="button"
                        title={`点击切换至“${label}”代码块`}
                        onClick={(e) => handleTabsShift(e, i)}
                    >
                        <Label language={language} />
                        {label}
                    </button>
                ))}
            </div>
            <div>{children}</div>
        </div>
    );
}
