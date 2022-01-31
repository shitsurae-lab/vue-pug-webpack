const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
  //npx webpackのモード指定。デフォルトは'production'
  mode: 'development',
  //{{message}}が表示されないようにする
  // resolve: {
  //   alias: {
  //     vue$: 'vue/dist/vue.esm.js',
  //   },
  // },
  //JSのコンパイルは下記 "devtool: 'source-map',"
  devtool: 'source-map',
  entry: './src/js/main.js', //エントリーポイント => ./src/js/内に変更 + main.jsに変更
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name]-[contenthash].js',
    publicPath: '/', //Section17 80「CSSスタイルの調整」
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/, //testはファイル名(.css)を検知
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            //SCSSのソースマップはかなり重くなるので開発時に必要なときだけtrueにするとよいらしい
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
      {
        //Asset Modulesを使う際の記述
        test: /\.(png|jpg|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[contenthash][ext]', //[name]の代わりに[name]-[contenthash]とすることでファイル名を強制的にキャッシュすることができる。
        },
        use: [
          {
            //画像ファイルの圧縮
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              //prettyをつけることでHTMLが整形される
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    // new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      //srcと同じ名前のCSSファイルがdistに出力される(src内のmy.cssにあわせる=> main.css)
      filename: './css/[name]-[contenthash].css', //[name]の代わりに[name]-[contenthash].jsとすることでファイル名を強制的にキャッシュすることができる。
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  //webpack-dev-server ポート番号変更 https://bit.ly/3Caxfbp
  devServer: {
    port: 8870, // ポート番号
  },
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/,
  },
};
