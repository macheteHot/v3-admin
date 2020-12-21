module.exports = {
  root : true,
  env  : {
    node: true
  },
  globals: {
    globalLog   : true,
    globalWarn  : true,
    globalError : true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars' : 'off',
    'no-var'         : 'error',
    eqeqeq           : 'error',
    'key-spacing'    : ['error', {
      multiLine: {
        beforeColon : false,
        afterColon  : true
      },
      align: {
        beforeColon : true,
        afterColon  : true,
        on          : 'colon'
      }
    }],
    'vue/eqeqeq'                                 : 'error',
    'vue/multiline-html-element-content-newline' : ['error', {
      ignoreWhenEmpty : false,
      ignores         : ['pre', 'textarea'],
      allowEmptyLines : false
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline : 3,
      multiline  : {
        max            : 1,
        allowFirstLine : false
      }
    }],
    'vue/singleline-html-element-content-newline': ['off', {
      ignoreWhenNoAttributes : true,
      ignoreWhenEmpty        : true,
      ignores                : ['pre', 'textarea', 'p']
    }]
  }
}
