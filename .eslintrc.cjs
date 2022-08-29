module.exports = {
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    ignorePatterns: ['dist/', '.eslintrc.cjs'],
    env: {
        es2020: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
    rules: {
        'prettier/prettier': 'warn',
        'no-unreachable': 'error',
        'no-warning-comments': 'warn',
        'array-callback-return': 'error',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn'
    }
};
