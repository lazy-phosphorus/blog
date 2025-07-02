import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { Header } from "./header";
import style from "./index.module.scss";

type PropsType = Readonly<{ children: ComponentChildren }>;

export function EuropaUniversalis({ children }: PropsType) {
    useEffect(() => {
        console.log("layout rendered");
    }, []);
    // TODO
    return (
        <div class={style.eu4}>
            <header>
                <Header />
            </header>
            <div class={style.main}>
                <main>{children}</main>
            </div>
        </div>
    );
}
