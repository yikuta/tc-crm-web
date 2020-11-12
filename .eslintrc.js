module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: { // 全局对象
    AMapUI: true,
    AMap: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'space-before-function-paren': ['warn', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'never'
    }],
    "indent": ["off", 2],
    "prefer-const": ["off"],
    "dot-notation": ["off"],
    'padded-blocks': 0,
    'no-callback-literal': 0,
    'standard/no-callback-literal': 0,
    'space-before-blocks': ['warn', {
      "functions": "always",
      "keywords": "always",
      "classes": "always"
    }],
    "vue/no-use-v-if-with-v-for": ["off", {
      "allowUsingIterationVar": false
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
