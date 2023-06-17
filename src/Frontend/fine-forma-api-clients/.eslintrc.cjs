module.exports = {
    extends: [
      '../base.eslintrc.cjs'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: "./tsconfig.json"
    },
    plugins: ['@typescript-eslint']
};