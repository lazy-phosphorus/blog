import type { ComponentChildren } from "preact";
import bg from "@/assets/image/background/00.webp";
import { Background } from "@/components/background";
import { Header } from "./header";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function EuropaUniversalis({ children }: PropsType) {
    // TODO
    return (
        <div class={style.eu4}>
            <Background src={bg} />
            <header>
                <Header />
            </header>
            <div id="scroller" class={style.main}>
                <main>{children}</main>
            </div>
        </div>
    );
}
