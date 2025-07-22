import type { ComponentChildren } from "preact";

export type NoticeEventType = {
    level: "success" | "info" | "warning" | "error";
    mini: ComponentChildren;
    full?: ComponentChildren;
    close?: ComponentChildren;
    timestamp: Date;
    key: symbol;
    duration?: number;
};

export type NoticeEventHandler = (event: NoticeEventType) => void;

const callbacks = new Set<NoticeEventHandler>();

export function registerNoticeEventHandler(callback: NoticeEventHandler) {
    callbacks.add(callback);
}

export function unregisterNoticeEventHandler(callback: NoticeEventHandler) {
    callbacks.delete(callback);
}

export function dispatchNoticeEvent(
    event: Omit<NoticeEventType, "timestamp" | "key">,
) {
    callbacks.forEach((callback) =>
        callback({ ...event, timestamp: new Date(), key: Symbol() }),
    );
}
