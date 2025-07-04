import * as mdx from "eslint-plugin-mdx";
import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/*", "**/*.ts.build-*.mjs", "*.js", "*.cjs", "*.mjs"],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [eslint.configs.recommended, tseslint.configs.recommended],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
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
        languageOptions: {
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: "module",
                ecmaVersion: "latest",
            },
        },
    },
    {},
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
