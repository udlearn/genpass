const pluginJs = require("@eslint/js");
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    pluginJs.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.dev.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module'
            }
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
);
