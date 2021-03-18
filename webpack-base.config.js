const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const optimization = () => {
        const config = {
          splitChunks: {
            chunks: 'all'
        }
    };
      if (isProd) {
        config.minimizer = [
           new OptimizeCssAssetsWebpackPlugin({
            cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
     }
        }),
        new TerserWebpackPlugin()
 ]
    }
        return config;
    };

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
            options: {
            publicPath: ''
        }},
            'css-loader'
        ];

        if (extra) {
            loaders.push(extra);
            }

 return loaders

};

const pluginsSet = () => {
    const plugins = [
        new HTMLWebpackPlugin({ template: './index.html' }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
            from: path.resolve(__dirname, 'src/favicon.png'),
            to: path.resolve(__dirname, 'dist'),
        }]
    }),

    new MiniCssExtractPlugin({ filename: filename('css') })
    ]

    if (isDev) { plugins.push(new HotModuleReplacementPlugin()); }

    if (isProd) { plugins.push(new WebpackBundleAnalyzer()); }

    return plugins
};

const babelOptions = (preset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      } 

      if (preset) {
        options.presets.push(preset);
        }

    return options
};

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }
        return loaders;
    };
   
     
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV:', isDev);
console.log('IS PROD:', isProd);

module.exports = {
    path,
    isDev,
    isProd,
    optimization,
    filename,
    cssLoaders,
    pluginsSet,
    babelOptions,
    jsLoaders
}