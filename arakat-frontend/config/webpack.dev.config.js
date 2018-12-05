const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    mode: "development",
    entry: [path.resolve(__dirname, "../", "src/index.tsx")],
    output: {
        path: path.resolve(__dirname, "../", "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    devServer: {
        inline: true,
        hot: true,
        port: 8080,
        contentBase: path.join(__dirname, "../", "dist"),
        open: true,
        overlay: true, // shows when an error occurrs on page.
        progress: false,
        watchContentBase: true, // when true, the source under dist file changes will force browser to be refreshed
        // redirects all fallbacks to index.html
        historyApiFallback: true,
        watchOptions: {
            poll: true,
            ignored: [/config/,"package.json", /node_modules/] 
        }
    },
    watchOptions: {
        poll: true,
        ignored: [/config/,"package.json", /node_modules/] 
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(tsx|js)?$/,
                include: path.resolve(__dirname, "../", 'src'),
                exclude: /node_modules/,
                use: [{
                        // convert es6 to es5
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
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
        new Dotenv({
            path: path.resolve(__dirname, './.env')
        }),
        // new StatsPlugin('stats.json', {
        //     chunkModules: true,
        //     exclude: [/node_modules[\\\/]react/]
        //   }),      
        // new HardSourceWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            tsconfig: './config/tsconfig.json',
            watch: "src",
            workers: 2
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            hash: true,
            title: "ASTARBI - DEVELOPMENT",
            template: "./config/index.ejs",
        }),
        new CopyWebpackPlugin([{
            from: "./assets",
            to: "assets"
        }], {
            debug: 'warning'
        }),
        // new BundleAnalyzerPlugin()
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    performance: {
        hints: false
    },
    stats: 'errors-only'
}