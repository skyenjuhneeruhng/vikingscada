module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true,
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module",
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-dangle": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "arrow-parens": [2, "always"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-named-as-default": 0,
    "react/no-unused-state": 0,
    "react/prefer-stateless-function": 0,
    "function-paren-newline": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "class-methods-use-this": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "import/prefer-default-export": 1,
    "no-bitwise": 0,
    "max-len": 0,
    "jsx-a11y/label-has-for": 0,
    "no-underscore-dangle": 0,
    "camelcase": 0,
    "react/jsx-no-bind": 1,
    "react/no-unescaped-entities": 0,
    "no-unneeded-ternary": 0,
    "no-unused-expressions": 0,
    "array-callback-return": 0,
    "no-control-regex": 0,
    "no-useless-escape": 0,
    "no-mixed-operators": [
      "error",
      {
        "allowSamePrecedence": true
      }
    ],
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }]
  }
};
