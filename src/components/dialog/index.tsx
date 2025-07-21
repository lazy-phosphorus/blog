import type { ComponentChildren, JSX } from "preact";
import type { Ref } from "preact";
import { useCallback, useImperativeHandle, useRef } from "preact/hooks";
import style from "./index.module.scss";

type AdditionalPropsType = {
    closeText: JSX.Signalish<ComponentChildren>;
    dialogRef: Ref<{ showModal: () => void } | null>;
};

export function Dialog({
    children,
    closeText,
    dialogRef,
    ...props
}: JSX.IntrinsicElements["dialog"] & AdditionalPropsType) {
    // TODO 退出动画
    const dialog = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(dialogRef, () => {
        return dialog.current === null
            ? null
            : { showModal: dialog.current.showModal.bind(dialog.current) };
    }, [dialog]);

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
            ref={dialog}
            class={`${style.dialog}${props.class !== void 0 ? ` ${props.class}` : ""}`}
        >
            {children}
            <button type="button" title="关闭对话框" onClick={handleClose}>
                {closeText}
            </button>
        </dialog>
    );
}
