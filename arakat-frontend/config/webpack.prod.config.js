const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../", "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    devServer: {
        inline: true,
        port: 8080,
        contentBase: path.join(__dirname, "../", "public"),
        open: true,
        // shows when an error occurrs on page.
        overlay: true,
        progress: true,
        // when true, the source under public file changes will force browser to be refreshed
        watchContentBase: true,
        // redirects all fallbacks to index.html
        historyApiFallback: true
    },
    devtool: "eval",
    module: {
        rules: [{
                test: /\.tsx$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    emitErrors: true,
                    failOnHint: true,
                    typeCheck: true,
                    configFile: "config/tslint.json",
                    tsConfigFile: "config/tsconfig.json",
                    fix: true
                }
            },
            {
                test: /\.tsx?$/,
                use: [{
                        // convert es6 to es5
                        loader: "babel-loader"
                    },
                    {
                        // converts type-script code to es6
                        loader: "ts-loader",
                        options: {
                            configFile: 'config/tsconfig.json'
                        }
                    }
                ]
            }, {
                test: /\.(jsx?)$/,
                loaders: ['babel'],
                exclude: [/node_modules/]
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
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: "./config/.env"
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            hash: true,
            title: "ASTARUS",
            template: "./config/index.ejs"
        }),
        new CopyWebpackPlugin([{
            from:"./assets",
            to: "assets"
        }], {
            debug: 'warning'
        })
    ]
}