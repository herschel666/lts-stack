const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ASSETS = path.join(__dirname, 'assets');

const dev = process.env.NODE_ENV !== 'production';
const nodeEnv = process.env.NODE_ENV || 'development';
const assetsOptimization = dev
  ? undefined
  : {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    };

module.exports = {
  mode: nodeEnv,
  cache: true,
  stats: 'minimal',
  context: ASSETS,
  entry: [
    path.join(ASSETS, 'javascript', 'main.ts'),
    path.join(ASSETS, 'css', 'main.css'),
  ],
  output: {
    path: __dirname,
    filename: path.join('dist', '[name].js'),
    publicPath: '/',
  },
  module: {
    noParse: [/\/\.test\.js$/],
    rules: [
      {
        test: /\.css$/i,
        include: ASSETS,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        include: ASSETS,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              sourceType: 'unambiguous',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    targets: { browsers: '> 5% and last 2 major versions' },
                    corejs: 3,
                  },
                ],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                sourceMap: true,
                module: 'esnext',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('dist', '[name].css'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join('images', '*.{jpg,png,gif,svg}'),
          to: path.join('dist', 'images', '[name].[ext]'),
        },
      ],
    }),
  ],
  optimization: assetsOptimization,
};
