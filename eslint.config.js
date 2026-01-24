import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        ignores: ["build/", "node_modules/", ".vscode/", "webpack/"],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "no-undef": "error",
        },
    },
    {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",
                fetch: "readonly",
                Response: "readonly",
                URLSearchParams: "readonly",
                DOMParser: "readonly",
                HTMLInputElement: "readonly",
                HTMLSelectElement: "readonly",
                process: "readonly",
                console: "readonly",
            },
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "@typescript-eslint": tseslint,
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            ...reactHooksPlugin.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "@typescript-eslint/no-unused-expressions": [
                "error",
                { allowShortCircuit: true },
            ],
        },
        settings: {
            react: {
                version: "19",
            },
        },
    },
    {
        files: ["vitest.setup.ts"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                process: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    prettierConfig,
];
