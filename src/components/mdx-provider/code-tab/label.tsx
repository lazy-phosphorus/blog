import { IconBash } from "@svg/bash";
import { IconC } from "@svg/c";
import { IconCmake } from "@svg/cmake";
import { IconConsole } from "@svg/console";
import { IconCpp } from "@svg/cpp";
import { IconCsharp } from "@svg/csharp";
import { IconCss } from "@svg/css";
import { IconDocker } from "@svg/docker";
import { IconGlsl } from "@svg/glsl";
import { IconGo } from "@svg/go";
import { IconHtml } from "@svg/html";
import { IconIni } from "@svg/ini";
import { IconJava } from "@svg/java";
import { IconJavaScript } from "@svg/javascript";
import { IconJson } from "@svg/json";
import { IconJsx } from "@svg/jsx";
import { IconKotlin } from "@svg/kotlin";
import { IconLatex } from "@svg/latex";
import { IconLua } from "@svg/lua";
import { IconMake } from "@svg/make";
import { IconMarkdown } from "@svg/markdown";
import { IconMdx } from "@svg/mdx";
import { IconPowershell } from "@svg/powershell";
import { IconPython } from "@svg/python";
import { IconRust } from "@svg/rust";
import { IconScss } from "@svg/scss";
import { IconSql } from "@svg/sql";
import { IconToml } from "@svg/toml";
import { IconTsx } from "@svg/tsx";
import { IconVue } from "@svg/vue";
import { IconXml } from "@svg/xml";
import { IconYaml } from "@svg/yaml";

type PropsType = Readonly<{ language: string }>;

export function Label({ language }: PropsType) {
    return (
        <>
            {language === "c" ? <IconC /> : void 0}
            {language === "cmake" ? <IconCmake /> : void 0}
            {language === "console" || language === "shellsession" ? (
                <IconConsole />
            ) : (
                void 0
            )}
            {language === "cpp" || language === "c++" ? <IconCpp /> : void 0}
            {language === "csharp" || language === "c#" || language === "cs" ? (
                <IconCsharp />
            ) : (
                void 0
            )}
            {language === "css" ? <IconCss /> : void 0}
            {language === "docker" || language === "dockerfile" ? (
                <IconDocker />
            ) : (
                void 0
            )}
            {language === "glsl" ? <IconGlsl /> : void 0}
            {language === "go" ? <IconGo /> : void 0}
            {language === "html" ? <IconHtml /> : void 0}
            {language === "ini" || language === "properties" ? (
                <IconIni />
            ) : (
                void 0
            )}
            {language === "java" ? <IconJava /> : void 0}
            {language === "javascript" || language === "js" ? (
                <IconJavaScript />
            ) : (
                void 0
            )}
            {language === "json" ||
            language === "json5" ||
            language === "jsonc" ? (
                <IconJson />
            ) : (
                void 0
            )}
            {language === "jsx" ? <IconJsx /> : void 0}
            {language === "kotlin" ||
            language === "kt" ||
            language === "kts" ? (
                <IconKotlin />
            ) : (
                void 0
            )}
            {language === "latex" ? <IconLatex /> : void 0}
            {language === "lua" ? <IconLua /> : void 0}
            {language === "make" || language === "makefile" ? (
                <IconMake />
            ) : (
                void 0
            )}
            {language === "markdown" || language === "md" ? (
                <IconMarkdown />
            ) : (
                void 0
            )}
            {language === "mdx" ? <IconMdx /> : void 0}
            {language === "powershell" ||
            language === "ps" ||
            language === "ps1" ? (
                <IconPowershell />
            ) : (
                void 0
            )}
            {language === "python" || language === "py" ? (
                <IconPython />
            ) : (
                void 0
            )}
            {language === "rust" || language === "rs" ? <IconRust /> : void 0}
            {language === "scss" ? <IconScss /> : void 0}
            {language === "shellscript" ||
            language === "bash" ||
            language === "sh" ||
            language === "shell" ||
            language === "zsh" ? (
                <IconBash />
            ) : (
                void 0
            )}
            {language === "sql" ? <IconSql /> : void 0}
            {language === "toml" ? <IconToml /> : void 0}
            {language === "tsx" ? <IconTsx /> : void 0}
            {language === "typescript" || language === "ts" ? (
                <IconTsx />
            ) : (
                void 0
            )}
            {language === "vue" ? <IconVue /> : void 0}
            {language === "yaml" ? <IconYaml /> : void 0}
            {language === "xml" ? <IconXml /> : void 0}
        </>
    );
}
