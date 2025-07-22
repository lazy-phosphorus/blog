import { Avatar } from "@/components/avatar";
import { Code } from "@/components/code";
import { Link } from "@/components/link";
import { Card } from "@/layouts/card";
import { IconAcg } from "@svg/acg";
import { IconBash } from "@svg/bash";
import { IconC } from "@svg/c";
import { IconCmake } from "@svg/cmake";
import { IconCode } from "@svg/code";
import { IconCpp } from "@svg/cpp";
import { IconCsharp } from "@svg/csharp";
import { IconGo } from "@svg/go";
import { IconJava } from "@svg/java";
import { IconJavaScript } from "@svg/javascript";
import { IconKotlin } from "@svg/kotlin";
import { IconLanguage } from "@svg/language";
import { IconLua } from "@svg/lua";
import { IconMdx } from "@svg/mdx";
import { IconNoSmoking } from "@svg/no-smoking";
import { IconNoWine } from "@svg/no-wine";
import { IconOtaku } from "@svg/otaku";
import { IconPixi } from "@svg/pixi";
import { IconPowershell } from "@svg/powershell";
import { IconPreact } from "@svg/preact";
import { IconProtest } from "@svg/protest";
import { IconPython } from "@svg/python";
import { IconRust } from "@svg/rust";
import { IconScss } from "@svg/scss";
import { IconTsx } from "@svg/tsx";
import { IconTypeScript } from "@svg/typescript";
import { IconVite } from "@svg/vite";
import { IconVue } from "@svg/vue";
import style from "./index.module.scss";

export function Profile() {
    return (
        <div class={style.profile}>
            <Card class={style.card}>
                <div class={style.avatar}>
                    <Avatar />
                </div>
                <h1>惰性磷</h1>
                <q>兼容性的事情为什么总是那么糟糕？</q>
                <hr />
                <p>技能树：</p>
                <ul class={style.icons}>
                    <li>
                        <IconBash />
                    </li>
                    <li>
                        <IconC />
                    </li>
                    <li>
                        <IconCpp />
                    </li>
                    <li>
                        <IconCmake />
                    </li>
                    <li>
                        <IconLua />
                    </li>
                    <li>
                        <IconRust />
                    </li>
                    <li>
                        <IconTypeScript />
                    </li>
                    <li>
                        <IconJavaScript />
                    </li>
                    <li>
                        <IconPowershell />
                    </li>
                    <li>
                        <IconVue />
                    </li>
                    <li>
                        <IconTsx />
                    </li>
                </ul>
                <p>已经很久没碰过的：</p>
                <ul class={style.icons}>
                    <li>
                        <IconCsharp />
                    </li>
                    <li>
                        <IconJava />
                    </li>
                    <li>
                        <IconKotlin />
                    </li>
                    <li>
                        <IconGo />
                    </li>
                    <li>
                        <IconPython />
                    </li>
                </ul>
                <p>快速简介：</p>
                <ul class={style.tags}>
                    <li>
                        <IconAcg />
                        <span>蒸汽骑士(迫真)</span>
                    </li>
                    <li>
                        <IconCode />
                        <span>脚本小子</span>
                    </li>
                    <li>
                        <IconLanguage />
                        <span>多语言许可(中/あ/Eng)</span>
                    </li>
                    <li>
                        <IconProtest />
                        <span>社科趣味</span>
                    </li>
                    <li>
                        <IconOtaku />
                        <span>肥宅</span>
                    </li>
                    <li>
                        <IconNoSmoking />
                        <span>烟草禁运</span>
                    </li>
                    <li>
                        <IconNoWine />
                        <span>沃尔斯特法案</span>
                    </li>
                </ul>
                <hr />
                <p>
                    此网站编译时不考虑兼容性。TypeScript 编译目标为
                    <Code type="default">esnext</Code>，CSS 使用了部分 Safari
                    不兼容属性。如果出现问题，请升级您的浏览器/放弃使用
                    Safari。一般而言，Firefox 不会出现大问题。
                </p>
                <hr />
                <div class={style.powered}>
                    <span>Powered by</span>
                    <IconPreact />
                    <span>+</span>
                    <IconScss />
                    <span>+</span>
                    <IconVite />
                    <span>+</span>
                    <IconMdx />
                    <span>+</span>
                    <IconPixi />
                </div>
            </Card>
            <Link class={style.link} href="/post/" title="点击跳转">
                浏览文章
            </Link>
            <Link
                class={style.link}
                href="/game/chinese-chess/"
                title="点击跳转"
            >
                下盘象棋
            </Link>
        </div>
    );
}
