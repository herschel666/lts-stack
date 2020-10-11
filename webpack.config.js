/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const globby = require('globby');

/** @typedef {import('webpack').Configuration} Configuration */

const SERVER = path.join(__dirname, 'server');
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
const urlLoader = {
  test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
  loader: 'url-loader',
  options: {
    limit: 8192,
  },
};
/** @type Configuration */
const baseConfig = { mode: nodeEnv, cache: true, stats: 'errors-only' };
/** @type Configuration */
const assetsConfig = {
  ...baseConfig,
  name: 'assets',
  context: ASSETS,
  entry: [
    path.join(ASSETS, 'javascript', 'main.ts'),
    path.join(ASSETS, 'css', 'main.css'),
  ],
  output: {
    path: __dirname,
    filename: path.join('dist', `[name].${dev ? '' : '[contenthash].'}js`),
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
      urlLoader,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ASSETS, 'html', 'template.ejs'),
      templateParameters: {
        siteTitle: 'LTSstack',
      },
      filename: path.join('src', 'views', 'page.js'),
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: path.join('dist', `[name].${dev ? '' : '[contenthash].'}css`),
    }),
  ],
  optimization: assetsOptimization,
};

const getServerFileConfig = (filepath) => {
  const fileDir = path.dirname(filepath);
  const name = path.basename(fileDir);
  const destinationPath = fileDir.replace('/server/', '/src/');
  /** @type Configuration */
  const serverFileConfig = {
    ...baseConfig,
    name,
    context: __dirname,
    devtool: false,
    target: 'node',
    entry: filepath,
    output: {
      path: destinationPath,
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: SERVER,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        urlLoader,
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
      '@architect/functions': 'commonjs2 @architect/functions',
      '@architect/views/page': 'commonjs2 @architect/views/page',
    },
    optimization: {
      sideEffects: false,
      nodeEnv,
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join('src', 'http', '**', '*.{jpg,png,gif,svg}'),
            to: 'dist/[hash].[ext]',
            context: __dirname,
            flatten: true,
            noErrorOnMissing: true,
            transformPath(targetPath) {
              return path.join('..', '..', '..', targetPath);
            },
          },
        ],
      }),
    ],
  };

  return serverFileConfig;
};

module.exports = async () => {
  const serverFiles = await globby(path.join(SERVER, '**/index.{ts,tsx}'));
  return [assetsConfig].concat(serverFiles.map(getServerFileConfig));
};
