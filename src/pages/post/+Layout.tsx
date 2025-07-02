import type { ComponentChildren } from "preact";
import { Paper } from "@/layouts/paper";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function Layout({ children }: PropsType) {
    return <Paper>{children}</Paper>;
}
