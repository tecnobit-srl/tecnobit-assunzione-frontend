import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
  },

  typescript: true,
  react: true,

  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
});
