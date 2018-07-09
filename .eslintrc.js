module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for Vuex
      ]
    }],
    'no-shadow': ['error', {
      allow: [
        'state', // for Vuex
      ]
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}