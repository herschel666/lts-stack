module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./server/**/*.tsx'],
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {},
  variants: {},
  plugins: [],
};
