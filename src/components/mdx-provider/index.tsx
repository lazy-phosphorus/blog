import { MDXProvider } from "@mdx-js/preact";
import type { ComponentChildren } from "preact";
import { a } from "./a";
import { blockquote } from "./blockquote";
import { br } from "./br";
import { code } from "./code";
import { CodeTab } from "./code-tab";
import { del } from "./del";
import { em } from "./em";
import { h2 } from "./h2";
import { h3 } from "./h3";
import { h4 } from "./h4";
import { hr } from "./hr";
import { img } from "./img";
import { li } from "./li";
import { ol } from "./ol";
import { p } from "./p";
import { pre } from "./pre";
import { strong } from "./strong";
import { table, tbody, td, th, thead, tr } from "./table";
import { ul } from "./ul";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function MdxProvider({ children }: PropsType) {
    return (
        <MDXProvider
            components={{
                a,
                blockquote,
                br,
                code,
                del,
                em,
                h2,
                h3,
                h4,
                hr,
                img,
                li,
                ol,
                p,
                pre,
                strong,
                td,
                th,
                tr,
                thead,
                tbody,
                table,
                ul,
                CodeTab,
            }}
        >
            {children}
        </MDXProvider>
    );
}
