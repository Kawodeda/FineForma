module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@typescript-eslint/strict'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: "./tsconfig.eslint.json"
    },
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: ['build', '*.cjs', 'index.ts'],
    rules: {
      "@typescript-eslint/class-literal-property-style": ["error", "getters"],
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      // Formatting
      "@typescript-eslint/type-annotation-spacing": "warn",
      "@typescript-eslint/member-delimiter-style": "warn",
      "brace-style": "off",
      "@typescript-eslint/brace-style": ["warn", "stroustrup", { "allowSingleLine": false }],
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "warn",
      "func-call-spacing": "off",
      "@typescript-eslint/func-call-spacing": ["warn", "never"],
      "comma-spacing": "off",
      "@typescript-eslint/comma-spacing": ["warn", { "before": false, "after": true }],
      "key-spacing": "off",
      "@typescript-eslint/key-spacing": [
        "warn", 
        { 
          "beforeColon": false, 
          "afterColon": true, 
          "mode": "strict" 
        }
      ],
      "object-curly-spacing": "off",
      "@typescript-eslint/object-curly-spacing": ["warn","always"],
      "quotes": "off",
      "@typescript-eslint/quotes": ["warn", "single"],
      "space-before-blocks": "off",
      "@typescript-eslint/space-before-blocks": ["warn", "always"],
      "keyword-spacing": "off",
      "@typescript-eslint/keyword-spacing": ["warn", { "before": true, "after": true }],
      "space-before-function-paren": "off",
      "@typescript-eslint/space-before-function-paren": ["warn", "never"],
      "space-infix-ops": "off",
      "@typescript-eslint/space-infix-ops": "warn",

      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { "allowExpressions": true }
      ],
      "@typescript-eslint/method-signature-style": ["error", "method"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "memberLike",
          "modifiers": ["private"],
          "format": ["strictCamelCase"],
          "leadingUnderscore": "require"
        },
        {
          "selector": "variable",
          "modifiers": ["const", "global"],
          "format": ["UPPER_CASE"],
        },
        {
          "selector": ["class"],
          "format": ["StrictPascalCase"]
        },
        {
          "selector": ["interface"],
          "format": ["StrictPascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": ["typeAlias"],
          "format": ["StrictPascalCase"]
        },
        {
          "selector": "default",
          "format": ["strictCamelCase"]
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": [
            "signature",
            "call-signature",

            "public-static-readonly-field",
            "public-static-field",
            "protected-static-readonly-field",
            "protected-static-field",
            "private-static-readonly-field",
            "private-static-field",
            "#private-static-readonly-field",
            "#private-static-field",

            "public-decorated-readonly-field",
            "public-decorated-field",
            "protected-decorated-readonly-field",
            "protected-decorated-field",
            "private-decorated-readonly-field",
            "private-decorated-field",

            "public-instance-readonly-field",
            "public-instance-field",
            "protected-instance-readonly-field",
            "protected-instance-field",
            "private-instance-readonly-field",
            "private-instance-field",
            "#private-instance-readonly-field",
            "#private-instance-field",

            "public-abstract-readonly-field",
            "public-abstract-field",
            "protected-abstract-readonly-field",
            "protected-abstract-field",

            "public-readonly-field",
            "public-field",
            "protected-readonly-field",
            "protected-field",
            "private-readonly-field",
            "private-field",
            "#private-readonly-field",
            "#private-field",

            "static-readonly-field",
            "static-field",
            "instance-readonly-field",
            "instance-field",
            "abstract-readonly-field",
            "abstract-field",

            "decorated-readonly-field",
            "decorated-field",

            "readonly-field",
            "field",

            "static-initialization",

            "public-constructor",
            "protected-constructor",
            "private-constructor",

            "constructor",

            "public-static-get",
            "protected-static-get",
            "private-static-get",
            "#private-static-get",

            "public-decorated-get",
            "protected-decorated-get",
            "private-decorated-get",

            "public-instance-get",
            "protected-instance-get",
            "private-instance-get",
            "#private-instance-get",

            "public-abstract-get",
            "protected-abstract-get",

            "public-get",
            "protected-get",
            "private-get",
            "#private-get",

            "static-get",
            "instance-get",
            "abstract-get",

            "decorated-get",

            "get",

            "public-static-set",
            "protected-static-set",
            "private-static-set",
            "#private-static-set",

            "public-decorated-set",
            "protected-decorated-set",
            "private-decorated-set",

            "public-instance-set",
            "protected-instance-set",
            "private-instance-set",
            "#private-instance-set",

            "public-abstract-set",
            "protected-abstract-set",

            "public-set",
            "protected-set",
            "private-set",

            "static-set",
            "instance-set",
            "abstract-set",

            "decorated-set",

            "set",

            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "#private-static-method",
            "public-decorated-method",
            "protected-decorated-method",
            "private-decorated-method",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
            "#private-instance-method",
            "public-abstract-method",
            "protected-abstract-method"
          ]
        }
      ]
    }
  };