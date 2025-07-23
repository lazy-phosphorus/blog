import { useComputed, useSignal } from "@preact/signals";
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
    const isExiting = useSignal(false);

    const dialog = useRef<HTMLDialogElement | null>(null);

    const dialogClass = useComputed(
        () =>
            `${style.dialog}${props.class !== void 0 ? ` ${props.class}` : ""}${isExiting.value ? ` ${style.exiting}` : ""}`,
    );

    useImperativeHandle(dialogRef, () => {
        return dialog.current === null
            ? null
            : { showModal: dialog.current.showModal.bind(dialog.current) };
    }, [dialog]);

    const handleClose = useCallback(
        () => (isExiting.value = true),
        [isExiting],
    );

    const handleExited = useCallback<
        JSX.TransitionEventHandler<HTMLDialogElement>
    >(
        (event) => {
            if (event.propertyName !== "opacity") return;
            event.currentTarget.close();
            isExiting.value = false;
        },
        [isExiting],
    );

    return (
        <dialog
            {...props}
            ref={dialog}
            class={dialogClass}
            onTransitionEnd={handleExited}
        >
            {children}
            <button type="button" title="关闭对话框" onClick={handleClose}>
                {closeText}
            </button>
        </dialog>
    );
}
