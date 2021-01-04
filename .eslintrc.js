module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'standard-react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first'
      }
    ]
  }
}