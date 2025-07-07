export type LoadingEventType = Readonly<{ type: "start" | "end" }>;

export type LoadingEventHandler = (event: LoadingEventType) => void;

const callbacks = new Set<LoadingEventHandler>();

export function registerLoadingEventHandler(callback: LoadingEventHandler) {
    callbacks.add(callback);
}

export function unregisterLoadingEventHandler(callback: LoadingEventHandler) {
    callbacks.delete(callback);
}

export function dispatchLoadingEvent(type: "start" | "end") {
    const event = { type };
    callbacks.forEach((callback) => callback(event));
}
