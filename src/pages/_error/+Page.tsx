import { usePageContext } from "@/hooks/use-page-context";

export function Page() {
    // TODO
    const pageContext = usePageContext();

    const { abortReason, abortStatusCode } = pageContext;
    return (
        <p>
            {String(abortReason)}, {abortStatusCode}
        </p>
    );
}
