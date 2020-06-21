module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./server/**/*.tsx'],
  },
  theme: {},
  variants: {},
  plugins: [],
};
