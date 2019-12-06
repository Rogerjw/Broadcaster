module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    //"semi": ["error", "always"],
    "no-console" : "off",
    "no-shadow" : 0,
    "linebreak-style": 0,
    "class-methods-use-this":0,
    "no-undef":0,
    "import/no-mutable-exports":0
  },
};
