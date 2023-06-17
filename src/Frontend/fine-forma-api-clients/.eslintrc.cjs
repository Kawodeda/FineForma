module.exports = {
    overrides: [
        {
            files: [
                "*.ts"
            ],
            extends: [
                '../base.eslintrc.cjs'
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: "./tsconfig.json"
            },
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/consistent-type-definitions': 'off'
            }
        }
    ]
};