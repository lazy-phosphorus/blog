import * as mdx from "eslint-plugin-mdx";
import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/*"],
        files: ["**/*.ts", "**/*.tsx"],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            prettier,
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: "module",
                ecmaVersion: "latest",
            },
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                1,
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-namespace": 0,
        },
    },
    {
        files: ["**/*.{mdx}"],
        ...mdx.flat,
        processor: mdx.createRemarkProcessor({
            lintCodeBlocks: true,
        }),
        rules: {
            ...mdx.flatCodeBlocks.rules,
            "no-var": "error",
            "prefer-const": "error",
        },
    },
);
