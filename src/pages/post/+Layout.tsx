import type { ComponentChildren } from "preact";
import { Waterfall } from "@/layouts/waterfall";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function Layout({ children }: PropsType) {
    return <Waterfall>{children}</Waterfall>;
}
