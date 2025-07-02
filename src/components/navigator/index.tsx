import { Link } from "@/components/link";
import { PageContextConsumer } from "@/hooks/use-page-context";
import { IconHome } from "@svg/home";
import style from "./index.module.scss";

export function Navigator() {
    return (
        <nav class={style.nav}>
            <ul>
                <li>
                    <Link href="/" title="返回首页">
                        <IconHome />
                    </Link>
                </li>
                <PageContextConsumer>
                    {(context) => {
                        let pathname = context.urlPathname;
                        while (pathname.endsWith("/")) {
                            pathname = pathname.substring(
                                0,
                                pathname.length - 1,
                            );
                        }
                        while (pathname.startsWith("/")) {
                            pathname = pathname.substring(1, pathname.length);
                        }
                        if (pathname === "") return [];
                        const paths = pathname.split("/");

                        return paths
                            .map((v, i) => ({
                                href: `/${paths.slice(0, i + 1).join("/")}/`,
                                name: v,
                            }))
                            .map(({ href, name }) => (
                                <li key={href}>
                                    <Link href={href} title="跳转至此">
                                        {name}
                                    </Link>
                                </li>
                            ));
                    }}
                </PageContextConsumer>
            </ul>
        </nav>
    );
}
