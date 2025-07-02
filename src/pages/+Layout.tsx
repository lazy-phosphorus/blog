import type { ComponentChildren } from "preact";
import "@/assets/scss/main.scss";
import { EuropaUniversalis } from "@/layouts/europa-universalis";

if (import.meta.env.DEV) {
    import("preact/debug");
}

type PropsType = Readonly<{ children: ComponentChildren }>;

export function Layout({ children }: PropsType) {
    return <EuropaUniversalis>{children}</EuropaUniversalis>;
}
