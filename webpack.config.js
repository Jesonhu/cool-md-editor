const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */
// 把less css scss less 文件分离：要使用mini-css-extract-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    library: 'CMdEditor',
    libraryTarget: 'umd',
    filename: 'cMdEditor.js',
    path: path.resolve(__dirname, 'dist')     
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },

  plugins: [
    // 删除 dist 中旧文件
    new CleanWebpackPlugin(['dist']),
    // 生成 .html 文件
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // 压缩生成后的 .css
    new OptimizeCss({
      cssProcessor: require('cssnano')
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),
      // filename: "[name].[chunkhash:8].css",
      filename: "cMdEditor.css",
      chunkFilename: "[id].css"
    })
  ],

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          // 如果使用 `MiniCssExtractPlugin.loader` 这里就不要使用了
          // 使用后会报错 `webpack ReferenceError: window is not defined`
          // {
          //   loader: 'style-loader',
          //   options: {
          //     sourceMap: true
          //   }
          // },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // Notice: css 添加浏览器前缀
                require('autoprefixer')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          // "style-loader",
          {loader: 'css-loader',options: {importLoaders: 2}},  //2代表css-loader后还需要几个loader
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({browsers:['last 2 versions']})
              ]
            }
          },
          'less-loader'
        ]
      }
    ]
  },


}