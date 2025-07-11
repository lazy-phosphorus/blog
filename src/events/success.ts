export type SuccessEventType = Readonly<{
    text: string;
    timestamp: Date;
}>;

export type SuccessEventHandler = (event: SuccessEventType) => void;

const callbacks = new Set<SuccessEventHandler>();

export function registerSuccessEventHandler(callback: SuccessEventHandler) {
    callbacks.add(callback);
}

export function unregisterSuccessEventHandler(callback: SuccessEventHandler) {
    callbacks.delete(callback);
}

export function dispatchSuccessEvent(title: string) {
    const event = { text: title, timestamp: new Date() };
    callbacks.forEach((callback) => callback(event));
}
