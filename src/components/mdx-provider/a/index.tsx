import type { ComponentChildren } from "preact";
import { Link } from "@/components/link";
import style from "./index.module.scss";

type PropsType = Readonly<{
    title: string;
    href: string;
    children: ComponentChildren;
}>;

export function a({ title, href, children }: PropsType) {
    return (
        <Link href={href} title={title} class={style.a}>
            {children}
        </Link>
    );
}
