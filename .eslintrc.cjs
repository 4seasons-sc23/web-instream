module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off', // import React from "react" 누락되어도 오류로 취급 X
        'import/order': [
            'error',
            {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'unknown',
                ],
                'pathGroups': [
                    {
                        pattern: 'react*',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'components/*',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: 'pages/*',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: 'utils/*',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: './**/*.scss',
                        group: 'unknown',
                    },
                ],
                'newlines-between': 'always',
                'alphabetize': {
                    order: 'asc',
                },
            },
        ],
    },
};
