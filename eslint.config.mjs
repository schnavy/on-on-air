// @ts-check
import path from "node:path";
import {fileURLToPath} from "node:url";
import {FlatCompat} from "@eslint/eslintrc";
import js from "@eslint/js";
import {fixupConfigRules} from "@eslint/compat";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

const patchedConfig = fixupConfigRules([
    ...compat.extends("next/core-web-vitals"),
]);

const config = [
    ...patchedConfig,
    {
        ignores: [".next/*"], // Ignore the Next.js build folder
    },
    {
        files: ["*.ts", "*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": [
                "warn",
                {"ts-ignore": "allow-with-description"},
            ],
        },
    },
];

export default config;
