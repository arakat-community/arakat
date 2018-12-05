const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: "production",
    entry: [path.resolve(__dirname, "../", "src/index.tsx")],
    output: {
        path: path.resolve(__dirname, "../", "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(tsx|js)?$/,
                include: path.resolve(__dirname, "../", 'src'),
                exclude: /node_modules/,
                use: [{
                    // convert es6 to es5
                    loader: "babel-loader",
                    // options: {
                    //     cacheDirectory: true
                    // }
                },
                {
                    // converts type-script code to es6
                    loader: "ts-loader",
                    options: {
                        configFile: 'config/tsconfig.json',
                        transpileOnly: true
                    }
                }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192',
                options: {
                    fallback: 'responsive-loader',
                    quality: 85
                }
            },
            {
                test: /\.(jsx?)$/,
                include: path.resolve(__dirname, "../", 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }],
                exclude: [/node_modules/],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_AUTHENTICATION': JSON.stringify(process.env.API_AUTHENTICATION),
            'process.env.API_MOCK': JSON.stringify(process.env.API_MOCK)
        }),
        new HardSourceWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new CaseSensitivePathsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            tsconfig: './config/tsconfig.json',
            // tslint: './config/tslint.prod.json',
            watch: "src",
            workers: 2
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            hash: true,
            title: "ASTARBI",
            template: "./config/index.ejs",
        }),
        new CopyWebpackPlugin([{
            from: "./assets",
            to: "assets"
        }], {
                debug: 'warning'
            }),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}