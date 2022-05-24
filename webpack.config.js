const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWepbackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const dotenv = require('dotenv').config()
const Dotenv = require('dotenv-webpack');

// const envs = Object.entries(dotenv?.parsed || {}).reduce((obj, [key, val]) => {
//   obj[`process.env.${key}`] = JSON.stringify(val)
//   return obj
// }, {})


module.exports = (env, argv) => {

  const isDevServer = env.WEBPACK_SERVE
  const mode = argv.mode || (isDevServer ? 'development' : 'production')
  const isDev = mode !== 'production'

  const result = {
    mode,
    entry: ['@babel/polyfill', './src/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: isDevServer ? '/' : 'auto',
      filename: '[name].[hash].js'
    },
    devServer: {
      port: 4300,
      historyApiFallback: true
    },
    plugins: [
      new HTMLWepbackPlugin({ 
        template: './public/index.html',
        minify: isDev
          ? false
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              collapseBooleanAttributes: true,
              removeScriptTypeAttributes: true,
            },
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ 
          from: path.resolve(__dirname, 'public/assets'), 
          to: path.resolve(__dirname, 'build/assets')
        }]
      }),
      new Dotenv({ systemvars: true })
      // new webpack.DefinePlugin(envs)
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader', 
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: "local",
                  auto: true,
                  exportGlobals: true,
                  localIdentName: "[local]-[hash:base64:5]",
                  exportOnlyLocals: false,
                },
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "vars";',
                sassOptions: {
                  includePaths: [path.resolve(__dirname, "src/styles")],
                }
              }
            } 
          ],
        },
        {
          test: /\.(jpg|jpeg|png|svg|gif|mp4)$/,
          use: [{
            loader: 'file-loader'
          }]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          }
        },
      ]
    }
  }

  return result
}