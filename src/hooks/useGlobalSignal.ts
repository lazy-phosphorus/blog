import { signal } from "@preact/signals";

const isControlPanelVisible = signal(false);

export function useGloablSignal() {
    return { isControlPanelVisible };
}
