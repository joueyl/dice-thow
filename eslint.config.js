import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    prettierOptions: {},
  },
  vue: true,
}, {
  rules: {
    'no-console': ['warn'],
    'no-new': ['warn'],
  },
})
