import * as mdx from "eslint-plugin-mdx";
import react from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import dom from "eslint-plugin-react-dom";
import hooks from "eslint-plugin-react-hooks-extra";
import naming from "eslint-plugin-react-naming-convention";
import webapi from "eslint-plugin-react-web-api";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/*", "**/*.ts.build-*.mjs", "*.js", "*.cjs", "*.mjs"],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            dom.configs.recommended,
            webapi.configs.recommended,
            hooks.configs.recommended,
            naming.configs.recommended,
            react.configs["recommended-typescript"],
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Put rules you want to override here
            "react-dom/no-dangerously-set-innerhtml": "warn",
        },
    },
    {
        languageOptions: {
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: "module",
                ecmaVersion: "latest",
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                1,
                {
                    argsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-namespace": 0,
        },
    },
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            parser: tseslint.parser,
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
        },
    },
    prettier,
    {
        files: ["**/*.{mdx}"],
        ...mdx.flat,
        processor: mdx.createRemarkProcessor({
            lintCodeBlocks: true,
        }),
    },
    {
        files: ["**/*.{mdx}"],
        ...mdx.flatCodeBlocks,
        rules: {
            ...mdx.flatCodeBlocks.rules,
            "no-var": "error",
            "prefer-const": "error",
        },
    },
);
