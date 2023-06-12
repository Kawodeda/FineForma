module.exports = {
    extends: [
      '../base.eslintrc.cjs'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: "./tsconfig.eslint.json"
    },
    plugins: ['@typescript-eslint']
};