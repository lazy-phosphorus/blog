import type { ComponentChildren, JSX } from "preact";
import { forwardRef, useCallback } from "preact/compat";
import type { ForwardedRef } from "preact/compat";
import style from "./index.module.scss";

export const Dialog = forwardRef(
    (
        {
            children,
            closeText,
            ...props
        }: JSX.IntrinsicElements["dialog"] & { closeText: ComponentChildren },
        ref: ForwardedRef<HTMLDialogElement>,
    ) => {
        const handleClose = useCallback<
            JSX.MouseEventHandler<HTMLButtonElement>
        >((event) => {
            const dialog = event.currentTarget
                .parentElement as HTMLDialogElement;
            dialog.close();
        }, []);

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
    },
);
