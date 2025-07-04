import type { BaseException } from "@/exception/base-exception";

export type ExceptionEventType = Readonly<{
    exception: BaseException;
    timestamp: Date;
}>;

export type ExceptionEventHandler = (event: ExceptionEventType) => void;

const callbacks = new Set<ExceptionEventHandler>();

export function registerExceptionEventHandler(callback: ExceptionEventHandler) {
    callbacks.add(callback);
}

export function unregisterExceptionEventHandler(
    callback: ExceptionEventHandler,
) {
    callbacks.delete(callback);
}

export function dispatchExceptionEvent(exception: BaseException) {
    const event = { exception, timestamp: new Date() };
    callbacks.forEach((callback) => callback(event));
}
