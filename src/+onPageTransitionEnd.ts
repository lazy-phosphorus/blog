export async function onPageTransitionEnd() {
    const scroller = document.querySelector("#scroller");
    if (scroller !== null) scroller.scrollTop = 0;
}
