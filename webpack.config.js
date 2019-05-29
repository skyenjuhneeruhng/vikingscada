
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outputPath = path.resolve(__dirname, './', 'public');

const DOMAIN = process.env.DOMAIN || 'http://127.0.0.1:3377/api/v1';
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const cssConfig = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/public'
});

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    hash: false,
    template: './views/index.html'
  }),
  new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'isProd': isProd,
    }
  }),
  new webpack.HotModuleReplacementPlugin()
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  );
}

const defaultRules = [
  {
    test: /\.scss$/,
    use: cssConfig
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0', 'stage-2'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
      }
    }]
  },
  {
    test: /\.(jpg|jpeg|gif|png|ico|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './img/',
          outputPath: 'img/'
        }
      }
    ]
  },
  {
    test: /\.(eot|ttf|woff|otf|woff2)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './fonts',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  {
    test: /\.(pdf)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: './uploads/',
          outputPath: 'uploads/'
        }
      }
    ]
  }
];

module.exports = (env) => ({
  devtool: isProd ? 'nosources-source-map' : 'source-map',
  entry: {
    app: [
      path.resolve(__dirname, './app/index.js')
    ]
  },
  output: {
    path: outputPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      ...defaultRules,
      ...(
        env && env.lint ? [
          {
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loaders: ['eslint-loader']
          }
        ] : []
      )
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    compress: true,
    open: false,
    hot: true,
    host: '0.0.0.0',
    inline: true,
    port: 8080,
    historyApiFallback: true
  },
  plugins
});
