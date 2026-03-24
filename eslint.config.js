import { defineConfig } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import ts from 'typescript-eslint'

import js from '@eslint/js'

export default defineConfig(
    {
        ignores: ['**/dist/**', 'packages/cli/templates/**']
    },
    js.configs.recommended,
    ts.configs.recommended,
    {
        files: ['**/*.{ts,tsx,js}'],
        rules: {
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            'no-undef': 'warn',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\w'],
                        ['^@\\w'], // packages
                        ['^@/'], // alias from custom
                        ['^\\u0000'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
                    ]
                }
            ],
            'simple-import-sort/exports': 'error'
        },
        languageOptions: {
            globals: {
                ...globals.node
            },
            parser: ts.parser,
            parserOptions: {
                // 使用 typescript-eslint 的 projectService 功能，不用自己指定 tsconfig.json 檔案
                projectService: {
                    // 允許使用預設的 tsconfig.json 檔案
                    allowDefaultProject: ['eslint.config.js', 'commitlint.config.js']
                },
                tsconfigRootDir: import.meta.dirname
            }
        },
        plugins: {
            'simple-import-sort': simpleImportSort
        }
    }
)
