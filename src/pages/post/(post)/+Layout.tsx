import type { ComponentChildren } from "preact";
import { MdxProvider } from "@/components/mdx-provider";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function Layout({ children }: PropsType) {
    return <MdxProvider>{children}</MdxProvider>;
}
