import { signal } from "@preact/signals";

const isRedSide = signal(true);
const isDeductiveMode = signal(true);
const isAiEnabled = signal(false);
const isAiTakeOverRed = signal(false);

export function useSettings() {
    return {
        isRedSide,
        isDeductiveMode,
        isAiEnabled,
        isAiTakeOverRed,
    };
}
