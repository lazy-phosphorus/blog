import { dispatchLoadingEvent } from "@/events/loading";

export async function onPageTransitionStart() {
    document.body.classList.add("loading");
    dispatchLoadingEvent("start");
}
