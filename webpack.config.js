const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({lightweightTags: true});
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
  src: path.join(__dirname, 'src'),
};

console.log('API URL:', process.env.API_URL);

console.log(JSON.stringify(gitRevisionPlugin.version()));

/** @returns {import('webpack').Configuration} */
module.exports = (env, argv) => ({
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  entry: {
    entry: './src/script/createApp.ts',
  },
  output: {
    publicPath: '/',
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name].[contenthash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$',
              ],
              happyPackMode: false,
            },
          },
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.vue$/i,
        use: 'vue-loader',
      },
      {
        test: /\.svg$/i,
        use: [
          'raw-loader',
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: 'index.html',
      templateParameters: {
        gitVersion: gitRevisionPlugin.version(),
        mode: argv.mode,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: 'index.html.tmpl',
      templateParameters: {
        gitVersion: gitRevisionPlugin.version(),
        mode: argv.mode,
      },
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[contenthash].css',
      filename: '[name].[contenthash].css',
    }),
    // new WebpackPwaManifest({
    //   name: 'Bvlgari cutter',
    //   short_name: 'Bvlgari cutter',
    //   description: 'Bvlgari cutter',
    //   background_color: '#ffffff',
    //   display: 'standalone',
    //   orientation: 'landscape',
    //   icons: [
    //     {
    //       src: path.resolve('src/asset/icon.jpg'),
    //       sizes: [96, 128, 192, 256, 384, 512],
    //     },
    //   ],
    // }),
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   // 100MB we don't care about size in this app, just work offline pls
    //   maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
    //   runtimeCaching: [
    //     {
    //       // api is network only
    //       urlPattern: /^(.*)\/api\/(.*)$/,
    //       handler: 'NetworkOnly',
    //     },
    //     {
    //       urlPattern: /(.*)/,
    //       handler: 'NetworkFirst',
    //     },
    //   ],
    // }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    // }),
    ...(argv.mode === 'production' ? [new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
      content: ['./public/**/*.html', './src/**/*.vue'],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/, /data-v-.*/,
        /^.[^.]*\.[^. "']*/,
      ],
    })] : []),
  ],
  devServer: {
    https: false,
    port: process.env.WEBPACK_PORT || 8080,
    contentBase: path.resolve(__dirname, './dist/'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.API_URL,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
