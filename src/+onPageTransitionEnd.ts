import type { PageContextClient } from "vike/types";
import { title } from "@/config";
import { dispatchLoadingEvent } from "@/events/loading";

export async function onPageTransitionEnd(context: PageContextClient) {
    const { title: t } = context.config;
    const scroller = document.querySelector("#scroller");
    if (scroller !== null) scroller.scrollTop = 0;
    document.title =
        t === void 0
            ? title
            : `${typeof t === "string" ? t : t(context)} | ${title}`;

    dispatchLoadingEvent("end");
    document.body.classList.remove("loading");
}
