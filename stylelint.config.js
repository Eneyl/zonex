module.exports = {
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-prettier',
  ],
  extends: [
    'stylelint-config-idiomatic-sass',
    'stylelint-config-idiomatic-order',
    'stylelint-config-airbnb',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'prettier/prettier': [true, { singleQuote: true, tabWidth: 2, endOfLine: 'auto' }],
    'scss/dollar-variable-pattern': '[a-zA-z]',
    'max-nesting-depth': 10,
  },
};
