import { Badge } from "@/components/badge";
import { IconFilter } from "@svg/filter";
import style from "./index.module.scss";

export function Status() {
    // TODO
    return (
        <div class={style.status}>
            <Badge icon={IconFilter}>114514</Badge>
        </div>
    );
}
