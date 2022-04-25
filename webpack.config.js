const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWepbackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv').config()

const envs = Object.entries(dotenv.parsed).reduce((obj, [key, val]) => {
  obj[`process.env.${key}`] = JSON.stringify(val)
  return obj
}, {})

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  devServer: {
    port: 4300,
    historyApiFallback: true
  },
  plugins: [
    new HTMLWepbackPlugin({ template: './public/index.html' }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(envs)
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
              // modules: {
              //   exportGlobals: true,
              //   localIdentName: '[local]-[hash:base64:5]',
              // }
              modules: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: "[local]-[hash:base64:5]",
                // localIdentHashSalt: "my-custom-hash",
                // namedExport: true,
                // exportLocalsConvention: "camelCase",
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