import { PostBrowser } from "@/components/post-browser";
import { usePageContext } from "@/hooks/use-page-context";

export function Page() {
    const context = usePageContext();
    return <PostBrowser tag={decodeURIComponent(context.routeParams.tag!)} />;
}
