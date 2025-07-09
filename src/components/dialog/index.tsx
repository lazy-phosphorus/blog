import type { ComponentChildren, JSX } from "preact";
import { forwardRef } from "preact/compat";
import { useCallback } from "preact/hooks";
import style from "./index.module.scss";

export const Dialog = forwardRef<
    HTMLDialogElement,
    JSX.IntrinsicElements["dialog"] & { closeText: ComponentChildren }
>(({ children, closeText, ...props }, ref) => {
    const handleClose = useCallback<JSX.MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            const dialog = event.currentTarget
                .parentElement as HTMLDialogElement;
            dialog.close();
        },
        [],
    );

    return (
        <dialog
            {...props}
            ref={ref}
            class={`${style.dialog}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            {children}
            <button type="button" title="关闭对话框" onClick={handleClose}>
                {closeText}
            </button>
        </dialog>
    );
});
