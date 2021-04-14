const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const pagesDir = path.resolve(__dirname, 'src/pug/pages');
const pages = fs.readdirSync(pagesDir).filter((fileName) => fileName.endsWith('.pug'));

/**
 * Возвращает конфигурацию оптимизатора
 * в зависимости от режима разработки
 */
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

/**
 * Возвращает патерн имени файла
 * в зависимости от режима разработки
 */
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);
const filenameAsset = () => (isDev ? `[path][name].[ext]` : `[path][contenthash].[ext]`);

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

/**
 * Устанавливает плагины
 */
const plugins = () => {
  const base = [
    ...pages.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: `${pagesDir}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
    new CleanWebpackPlugin(),

    /**
     * Перемещает статичные файлы
     */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/static'),
          to: path.resolve(__dirname, 'dist/static'),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),

    new StylelintPlugin({
      configFile: 'stylelint.config.js',
      context: 'styles',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      fix: isProd,
    }),
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.png', '.jpeg', '.jpg'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@img': path.resolve(__dirname, 'src/assets/images'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
    },
  },
  optimization: optimization(),
  devServer: {
    hot: isDev,
    port: 4200,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        loader: 'file-loader',
        options: {
          name: filenameAsset(),
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: filenameAsset(),
        },
      },
      {
        test: /\.xml$/,
        loader: 'file-loader',
        options: {
          name: filenameAsset(),
        },
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          name: filenameAsset(),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
    ],
  },
};
