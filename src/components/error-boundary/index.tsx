import { Link } from "@/components/link";
import { Card } from "@/layouts/card";
import { IconFault } from "@svg/fault";
import style from "./index.module.scss";

export function ErrorBoundary() {
    return (
        <Card class={style.card}>
            <IconFault class={style.svg} />
            <p>出错了</p>
            <Link class={style.link} href="/" title="返回首页">
                返回首页
            </Link>
        </Card>
    );
}
