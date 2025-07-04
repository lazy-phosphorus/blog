import { Link } from "@/components/link";

export function Page() {
    return (
        <>
            <Link href="/post/" title="测试">
                post
            </Link>
            <button
                type="button"
                onClick={() => {
                    Promise.reject("test");
                    throw new Error("test");
                }}
            >
                测试
            </button>
        </>
    );
}
