module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/http/*/index.js', './src/views/components/*.js'],
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    screens: {
      sm: '320px',
      md: '480',
      lg: '640px',
      xl: '768px',
    },
  },
  variants: {},
  plugins: [],
};
