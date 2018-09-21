module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true
  },
  plugins: [
    "lodash",
    "promise"
  ],
  extends: [
    "plugin:vue/recommended",
    "@vue/airbnb",
    "plugin:lodash/recommended",
    "plugin:promise/recommended",
  ],
  rules: {
    "no-console": "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-param-reassign": ["error", { "props": false }],
    "import/extensions": ["always", {"ignorePackages": true}],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
    "no-underscore-dangle": [2,{"allow": ["_id"]}],
    "prefer-promise-reject-errors": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": ["error", {"html": {"void": "never"}}],
    "lodash/prefer-lodash-method": "off",
    "promise/no-callback-in-promise": "off",
    "promise/no-nesting": "off"
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
